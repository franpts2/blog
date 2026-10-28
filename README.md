# blog.franciscapt.dev

Essays about building small products — the constraints you find after you announce,
the rewrites they force, and the parts of shipping nobody blogs about.

Built with React Router, Vite, Tailwind CSS, and Cloudflare Workers. No CMS: posts
are Markdown files in this repo, rendered at build time.

See [DESIGN.md](./DESIGN.md) for the visual identity and [PLAN.md](./PLAN.md) for
the architecture and roadmap (including the browser editor planned for Phase 2).

## Stack

- **React Router** (framework mode) — routing, loaders, prerendering
- **Vite** — build, and `import.meta.glob` for inlining Markdown
- **Tailwind CSS v4** — utilities, shared recipes, and arbitrary variants for Markdown prose
- **unified / remark / rehype** — Markdown → HTML with syntax highlighting
- **Cloudflare Workers** — static assets with a Worker for the sitemap and later APIs

## Development

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck  # wrangler types + route typegen + tsc
npm run build      # prerender every page
npm run preview    # build + preview the Worker locally
npm run deploy     # build + wrangler deploy
```

## Writing a post

1. Create `content/posts/<slug>.md`.

```md
---
title: 'The constraint you find after you announce'
date: '2026-11-04'
summary: 'One sentence for the list and social previews.'
tags: ['shipping']
draft: false
---

The body, in Markdown.
```

2. `npm run dev` to preview. Drafts show up in development, never in production.
3. Commit and push. The build prerenders the new page.

The filename becomes the URL: `/writing/<slug>`.

## Deploying

The Worker is configured in `wrangler.jsonc` with the custom domain
`blog.franciscapt.dev`.

```bash
npm run deploy
```

The first deploy creates the Worker and attaches the custom domain. `franciscapt.dev`
must be a zone on the same Cloudflare account.

For continuous deployment, connect the GitHub repo to a Workers/Pages project
with build command `npm run build`.

## Notes

- Canonical URLs have no trailing slash (`assets.html_handling: "drop-trailing-slash"`).
- Published pages are prerendered; `/sitemap.xml` is rendered by the Worker.
- The Markdown HTML is trusted local content, so it is injected with `dangerouslySetInnerHTML`.
