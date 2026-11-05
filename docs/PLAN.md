# Plan

A personal blog at **blog.franciscapt.dev**. Built to be understood, not just to
work: the point of v1 is to learn how a blog is actually assembled — content
files, a build-time pipeline, routes, and prerendering — before adding a
backend.

---

## Goals

1. Publish essays from Markdown files in the repo, with zero ceremony.
2. Own the whole pipeline: no generator, no CMS, no hidden magic.
3. Serve fast, static HTML with correct metadata (SEO, Open Graph).
4. Stay small enough that a future version can add browser editing without a rewrite.

## Non-goals (for v1)

- Comments, likes, newsletters, multi-author.
- A visual editor.
- i18n, theming toggles, reading progress bars.
- A design system. Typography is the design.

---

## Stack

| Piece | Choice | Why |
|---|---|---|
| Framework | **React Router (framework mode)** | Real routing, loaders, SSR/prerender, no magic. |
| Build | **Vite** | Fast, and its `import.meta.glob` is the content pipeline. |
| Styling | **Tailwind CSS v4** | Utility CSS with a small token layer; prose uses Tailwind arbitrary variants. |
| Markdown | **unified / remark / rehype** | Composable AST pipeline; the blog "engine" is ~30 lines. |
| Deploy | **Cloudflare Workers** (static assets + Worker) | Prerendered HTML served from the edge; one Worker for the sitemap/404s and future APIs. |

No database in v1. Posts are files.

---

## Architecture

```
content/posts/*.md
      │  import.meta.glob('?raw')   ← Vite inlines every file at build time
      ▼
app/lib/content/frontmatter.ts       ← split `---` YAML from body
app/lib/content/markdown.ts          ← remark-parse → gfm → rehype → highlight → HTML
      │
      ▼
app/lib/content/parsePost.ts         ← validate frontmatter, derive meta + reading time
app/lib/content/posts.ts             ← repository: list, filter, sort, load one post
      │
      ├── /                    list of essays
      ├── /writing             all essays
      ├── /writing/:slug       one essay (prerendered)
      └── /sitemap.xml         resource route (Worker)
      │
      ▼
react-router.config.ts prerender()   ← builds static HTML for every page
      │
      ▼
Cloudflare Worker + static assets
```

Why `import.meta.glob` instead of `fs`: the same code runs in Node during the
build and in a Worker at runtime. No filesystem access, no bundling step for
content, and adding a post is adding a file.

### Rendering model

- `ssr: true` — the app has a real server.
- All known pages are **prerendered** at build time to `build/client/.../index.html`.
- The Worker handles `/sitemap.xml`, 404s, and anything added later.
- `assets.html_handling: "drop-trailing-slash"` — canonical URLs have no trailing
  slash (`/writing/hello-world`), matching internal links, `<link rel="canonical">`,
  and the sitemap.

### Content model (v1)

```yaml
---
title: 'The constraint you find after you announce'
date: '2026-11-04'          # YYYY-MM-DD, used for ordering
summary: 'One sentence for the list and social previews.'
tags: ['shipping']
draft: false                # drafts are visible in dev, skipped in prod
---
```

The filename is the slug: `the-constraint-you-find-after-you-announce.md`.

---

## What v1 includes (shipped in the first commit)

- [x] React Router + Vite + TypeScript scaffold on Cloudflare Workers
- [x] Tailwind v4 with semantic color tokens and a light-only visual identity
- [x] Markdown pipeline: frontmatter, GFM, heading ids, syntax highlighting
- [x] Post list, post page, 404
- [x] Sitemap resource route
- [x] Prerendering of every published page
- [x] Reading time, drafts, canonical + Open Graph metadata
- [x] `blog.franciscapt.dev` custom domain configured in `wrangler.jsonc`

---

## Roadmap

### Phase 2 — Edit in the browser

**Goal:** write and publish from any device without touching git.

#### 2.0 Decide the source of truth

Two honest options:

| Approach | How | Trade-off |
|---|---|---|
| **A. Commit via GitHub API** | Editor posts to a Worker route that commits Markdown with a bot token; Cloudflare rebuilds | Almost no backend; keeps git as the only source of truth; ~1 min to publish; drafts need branches |
| **B. D1 + R2** | Posts live in the database; media in R2; the site reads from D1 | Real backend to learn; instant publish and previews; needs migrations, backups, and a fallback export to Markdown |

**Recommendation: B**, migrating from A only if the rebuild delay becomes
annoying. B is the point of this exercise: auth, a database, object storage, and
an API. Keep Markdown as the storage format in `posts.body_md` so content is
never trapped.

#### 2.1 Auth

- **Auth.js (GitHub provider)** with a single allowed account (`login === "franpts2"`).
  Same library already used in Cadence, so the learning transfers.
- Session cookie, HTTP-only, `SameSite=Lax`, short expiry.
- All `/admin/*` and write APIs fail closed when there is no session.
- No public sign-up. Ever.

#### 2.2 Schema (D1)

```sql
posts (
  id TEXT PRIMARY KEY,            -- slug
  title TEXT NOT NULL,
  summary TEXT NOT NULL DEFAULT '',
  body_md TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',  -- draft | published
  published_at TEXT,              -- ISO date
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
)

post_tags (post_id TEXT, tag TEXT, PRIMARY KEY (post_id, tag))

post_revisions (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL,
  title TEXT NOT NULL,
  body_md TEXT NOT NULL,
  created_at TEXT NOT NULL
)

assets (
  key TEXT PRIMARY KEY,           -- R2 object key
  content_type TEXT NOT NULL,
  size INTEGER NOT NULL,
  created_at TEXT NOT NULL
)
```

Indexes: `posts(status, published_at DESC)`, `post_tags(tag)`.
Full-text search: an FTS5 virtual table over `title`/`summary`/`body_md`, kept in
sync with triggers or explicit writes.

#### 2.3 API (Worker routes)

| Route | Method | Purpose |
|---|---|---|
| `/api/posts` | `GET`, `POST` | list / create |
| `/api/posts/:id` | `GET`, `PATCH`, `DELETE` | read / update / delete |
| `/api/posts/:id/publish` | `POST` | draft → published |
| `/api/posts/:id/revisions` | `GET` | history |
| `/api/assets` | `POST` | upload to R2 (multipart) |

- `PATCH` writes a revision row first, then updates `posts`.
- Optimistic concurrency: send `updated_at`; reject with `409` if it changed.
- Validate every payload (Zod). Reject unknown fields.
- Rate-limit writes per session.
- Return `Cache-Control: no-store` on admin responses.

#### 2.4 Editor (`/admin`)

- List of posts with status, last edited.
- Textarea + live preview. Preview reuses the same `markdownToHtml` pipeline in
  the browser so what you see is what ships.
- Autosave to `localStorage` every few seconds; explicit **Save** to the API.
- Draft preview at `/writing/:slug?preview=<signed token>` (or session-gated on
  the Worker).
- Image upload → R2 → Markdown link inserted at the cursor.
- Keyboard: `Cmd/Ctrl+S` save, `Cmd/Ctrl+Enter` publish.

#### 2.5 Migration

A one-shot script reads `content/posts/*.md`, inserts rows into D1, and keeps the
files in the repo as an archive. Add an "Export to Markdown" button early — being
able to leave is what makes staying safe.

### Phase 3 — Discovery

- Search page backed by D1 FTS5 (or Pagefind while the site is static).
- Tag pages `/tags/:tag`.
- Related posts by shared tags.
- Previous/next links.

### Phase 4 — Distribution

- Newsletter (Cloudflare Email Routing or Resend + D1 subscribers).
- Per-post Open Graph images generated at the edge (SVG → PNG via Workers).
- Webmention support, if it still feels worth it.

### Phase 5 — Operations

- Analytics: Cloudflare Web Analytics (cookieless) before anything custom.
- Backups: nightly D1 export to R2, plus git.
- Uptime and error alerts.

---

## Writing guidelines

The blog is essays, not changelogs. A post should be one scene and one idea:

1. **Open in the scene.** The screenshot, the message, the moment it broke.
2. **The assumption.** What you believed that turned out to be wrong.
3. **The cost.** Time, plans, ego.
4. **The reframe.** The smaller, truer version of the lesson.
5. **The change.** One concrete habit that came out of it.

Keep one idea per post. If there are five lessons, that is five posts. End on a
specific change, not a moral.

Drafts are allowed to sit. Keep an `ideas.md` with raw scenes; publish when the
shape is visible, often weeks later.

---

## Risks

| Risk | Mitigation |
|---|---|
| Over-engineering before the first post | v1 is done; write before building Phase 2 |
| The editor becomes the project | Ship 3 posts with files first |
| Abandonment | No schedule. One post per solved problem. The ideas file is the backlog |
| Migrating to D1 loses content | Markdown stays the storage format; export button in Phase 2 |
| Scope creep into comments/newsletter | They are Phase 4 at the earliest |

---

## Done means

- [ ] Three real essays published.
- [ ] Sitemap validates.
- [ ] Lighthouse ≥ 95 on mobile for a post page.
- [ ] Writing a post takes one file and one push.
- [ ] Then, and only then, Phase 2.
