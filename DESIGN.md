# Visual identity — blog.franciscapt.dev

The blog should read as the writing room of the same person who owns
franciscapt.dev. Same paper, same type, same orange signal, same restraint —
but a different job: a portfolio introduces, a blog asks you to sit down and
read.

This document is the review of the current blog against the portfolio identity,
followed by the plan for closing the gap.

**Scope note:** v1 ships without an About page or an RSS feed. Both were
removed deliberately. The review below records the earlier state; the plan,
page list, and acceptance criteria describe the shipped site.

**Implementation note:** component styling is Tailwind utilities. `app/app.css`
contains only `@import "tailwindcss"` and the `@theme` tokens; shared recipes,
the Markdown prose variants, and syntax-token variants live in
`app/lib/styles.ts`. Names like `t-label` below describe type roles, not CSS
classes.

---

## 1. What makes the portfolio recognizable

Five things, in order of impact:

1. **Warm paper, never white.** `#faf8f5` ground, `#1a1816` ink, soft hairlines.
2. **Archivo + Clash Display.** Clash Display gives headings their editorial
   shape; Archivo keeps the body quiet and readable.
3. **One orange, used sparingly.** `#f25c2a` appears as a period, a selection,
   a focus ring, a hover state — never as wallpaper.
4. **The label voice.** Tiny uppercase mono labels, generous tracking, and a
   hairline under everything.
5. **Pills and feedback.** Fully rounded actions, `active:scale-[0.97]`,
   underline reveals on hover, `cubic-bezier(0.16, 1, 0.3, 1)`.

The portfolio is also deliberately **light-only**. It sets `color-scheme: light`
and a paper `theme-color`. That is part of the brand, not an oversight.

---

## 2. Review of the blog today

### 2.1 Identity and color

| Before | After | Why |
| --- | --- | --- |
| Muted burnt orange `#a8520c` for every accent use | `#f25c2a` for decoration and large type; `#b4470f` for small text and links | The portfolio's orange is the signal. The darker variant keeps links at AA contrast on paper. |
| `prefers-color-scheme: dark` flips the whole site to `#0b0b0c` / `#e9a06a` | Light-only warm paper, `color-scheme: light`, `theme-color: #faf8f5` | Automatic dark mode currently reads as a different brand. The portfolio makes the opposite choice. |
| `Inter` body + `JetBrains Mono` labels | `Archivo` body, `Clash Display` headings, `JetBrains Mono` labels and code | The type pairing is the strongest identifier. JetBrains Mono keeps code and metadata consistent across platforms. |
| Generic `favicon.ico`; no wordmark | Orange-square `logo.svg` and an `

` mark in Clash Display | Recognition in the tab, the header, and shared screenshots. |
| Cold `#17171a` code blocks with an unrelated syntax palette | Warm `#1a1816` block, paper text, tokens derived from the same palette | Code is content; it should not look pasted in from another site. |
| Selection is `accent` at 24% | Solid accent with ink text | A deliberate brand moment that still passes contrast. |
| No accent period | Orange period on page and section headings | The portfolio's smallest signature detail, repeated at every scale. |
| Tiny uppercase name in a static header; plain footer | Fixed blurred header with `f.pt` and mono labels; hairline footer with "Have a great day! :D" | The shell is where the identity is most recognizable. |

### 2.2 Typography and hierarchy

| Before | After | Why |
| --- | --- | --- |
| Home opens with a 15px paragraph | Display hero (`clamp(3rem, 8vw, 5.5rem)`) + `t-body` statement + pills | The homepage should introduce the writing instead of starting as an archive. |
| Writing page `h1` is `text-2xl` | `t-display`, `clamp(2.5rem, 6vw, 4.5rem)`, accent period | Page titles need the same weight as portfolio section titles. |
| Post `h1` is `2rem / 2.5rem` in Inter 500 | Clash Display 600, `clamp(2.25rem, 6vw, 4rem)`, line-height 0.98 | Long titles become editorial rather than app-like. |
| Prose is 16px / 1.75 | 18px / 1.75 at a 44rem measure | Long-form reading comfort; roughly 65–75 characters per line. |
| Prose `h2` is 1.4rem Inter; `h3` is 1.15rem | `h2` 1.75rem Clash Display; `h3` 1.35rem | Clear structural rhythm and a family shift between body and headings. |
| Arbitrary `text-[17px]`, `text-[11px]`, `text-[10px]` | `t-display`, `t-body`, `t-label` scale | One type system instead of per-component sizes. |
| Dates and tags are tiny arbitrary mono | `t-label` with `·` separators | Scannable metadata in the portfolio's label voice. |
| Summaries are `text-sm text-muted` | `t-body` at 0.95–1rem, muted | Summaries should be readable, not footnotes. |

### 2.3 Layout, interaction, accessibility

| Before | After | Why |
| --- | --- | --- |
| `max-w-2xl` for header, main, and footer | 72rem shell + 44rem prose container | Wide shell for navigation and lists; narrow measure for reading. |
| Static header | Fixed, blurred, hairline header with `f.pt` and `t-label` nav | Matches the portfolio shell and keeps navigation available while reading. |
| Post rows use `divide-y`; only the title is a link | 12-column rows with index, date, title, summary, arrow; the whole row is a link | More scannable and a much larger touch target. |
| Active nav is a generic ink underline | `aria-current` + orange hairline under the active link | Orientation without relying on color alone. |
| No explicit focus style and no skip link | `:focus-visible` 2px accent outline; skip link | Keyboard users get the same care as pointer users. |
| Hover styles run on touch devices | Hover styles gated behind `(hover: hover) and (pointer: fine)` | Prevents sticky hover after a tap. |
| No press feedback | `active:scale-[0.97]` on pills; a color response on row links; 150ms | Compact controls should feel pressed; a full-width row should not visibly shrink. |
| Hover underlines appear abruptly | `.link-underline` scaleX from right to left, 200ms expo ease | The portfolio's motion language, with no JS animation library. |
| No reduced-motion handling | Transitions reduced to near-zero; color and opacity survive | Vestibular safety without losing state changes. |
| Labels use `#a39b92` at 11px (≈2.6:1) | Darker text faint `#756e65` (≈4.75:1); `#a39b92` only for decoration | Keep the faint look and pass AA for metadata. |
| One accent token for text and decoration | Accent split into `accent` (large/decorative) and `accent-ink` (small text) | `#f25c2a` is 3.1:1 on paper: fine for dots and focus rings, not body links. |
| No `og:image`; no `twitter:card` | Static OG image and card metadata | Shared links should look like the site, not a bare URL. |
| No `viewport-fit=cover` or safe-area padding | Matching viewport meta and safe-area insets | The portfolio handles notches; the blog should too. |

### 2.4 Functional and metadata notes

| Before | After | Why |
| --- | --- | --- |
| `formatDate` uses a long month ("28 October 2026") | Short month ("28 Oct 2026") in `t-label` | Fits the metadata row and reads faster. |
| `home.tsx` does `[latest, ...rest].slice(0, 5)` | `posts.slice(0, 5)` | The list is already sorted; the rest spread is redundant. |
| Empty state is a bare paragraph | Styled empty state with a label and a short explanation | An empty blog should still feel composed. |
| Root error boundary is unstyled | Same display heading, body, and pill as the 404 | Errors are part of the identity too. |
| No `color-scheme` meta | Add `color-scheme: light` | Prevents the browser from rendering form controls in a dark scheme. |
| `rehype-highlight` is configured with `languages: {}`, so fenced code renders no token spans | Register the languages the blog writes (`ts`, `js`, `bash`, `json`, `css`, `html`, `sql`, `md`, `yaml`, `diff`) | The warm code palette only matters if the tokens exist. |

### 2.5 What already works

- The content pipeline is clean: `import.meta.glob`, hand-written frontmatter,
  remark/rehype, prerendering, and sitemap. **Do not touch it.**
- The warm paper base is already right; the gap is type, accent, hierarchy, and
  shell.
- The prose-first instinct is right. This plan amplifies typography; it does not
  add a component library.
- `formatDate` is timezone-stable and uses a plain day. Keep that property.

---

## 3. Decisions

1. **Light-only in v1.** Match the portfolio exactly. Automatic dark mode is a
   separate identity today; a manual "dim" theme can be added later if readers
   ask. Do not ship the current `#0b0b0c` theme.
2. **Clash Display for structure, Archivo for reading.** Display type is for
   page titles, post titles, list titles, and the `f.pt` mark. Body copy stays
   Archivo.
3. **One accent, two jobs.** `accent` (`#f25c2a`) for periods, selection, focus,
   borders, and large type. `accent-ink` (`#b4470f`) for links and small text.
4. **Wide shell, narrow prose.** 72rem for header, footer, and lists; 44rem for
   article text. Do not stretch prose to the shell width.
5. **Feedback-only motion.** Hover underlines, color transitions, and press
   scale. No page transitions, scroll reveals, Lenis, or Motion dependency.
6. **Reuse the language, not the layout.** Hairlines, labels, pills, and the
   orange period transfer. The full-viewport pager and squishy portrait do not.
7. **Do not copy contrast mistakes.** The portfolio uses white on orange for
   small chat text and faint labels at 11px. The blog uses ink on orange and a
   darker faint for text.

---

## 4. The identity

### 4.1 Tokens

```css
@theme {
  --font-sans: "Archivo", "Helvetica Neue", Helvetica, Arial, sans-serif;
  --font-display: "Clash Display", "Helvetica Neue", Helvetica, Arial, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace;

  --color-paper: #faf8f5;
  --color-paper-soft: #f3efe8;
  --color-ink: #1a1816;
  --color-muted: #6b655e;
  --color-faint: #756e65;      /* text-safe; ≈4.75:1 */
  --color-faint-soft: #a39b92; /* decoration/icons only */
  --color-line: rgba(26, 24, 22, 0.1);
  --color-accent: #f25c2a;
  --color-accent-ink: #b4470f; /* text-safe; ≈5.1:1 */
  --color-accent-soft: #ffeee7;

  --color-code-bg: #1a1816;
  --color-code-ink: #f3efe8;

  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --spacing-section: clamp(4rem, 8vw, 7rem);
  --spacing-gap: clamp(1rem, 3vw, 2.5rem);
}
```

Token names keep the blog's current short vocabulary (`paper`, `muted`, `faint`)
so existing utilities like `bg-paper` and `text-muted` keep working. Values and
roles match the portfolio.

**Contrast budget**

| Pair | Ratio | Use |
| --- | --- | --- |
| `#f25c2a` on `#faf8f5` | ≈3.1:1 | Large text, dots, icons, borders, focus rings |
| `#b4470f` on `#faf8f5` | ≈5.1:1 | Links, small labels, hover text |
| `#1a1816` on `#f25c2a` | ≈5.2:1 | Text on accent surfaces |
| `#faf8f5` on `#f25c2a` | ≈3.3:1 | Avoid for small text |
| `#756e65` on `#faf8f5` | ≈4.75:1 | Metadata labels |
| `#f3efe8` on `#1a1816` | ≈14:1 | Code |

### 4.2 Type scale

| Role | Class | Family | Size | Line height | Tracking |
| --- | --- | --- | --- | --- | --- |
| Home hero | `.t-display` | Clash Display 600 | `clamp(3rem, 8vw, 5.5rem)` | 0.92 | −0.03em |
| Page title | `.t-display` | Clash Display 600 | `clamp(2.5rem, 6vw, 4.5rem)` | 0.95 | −0.03em |
| Article title | `.t-display` | Clash Display 600 | `clamp(2.25rem, 6vw, 4rem)` | 0.98 | −0.03em |
| Section head | `.t-headline` | Clash Display 600 | 1.75rem | 1.15 | −0.02em |
| List title | — | Clash Display 600 | 1.35–1.5rem | 1.2 | −0.02em |
| Body / prose | — | Archivo 400 | 1.125rem | 1.75 | 0 |
| Summary | `.t-body` | Archivo 400 | 1rem | 1.65 | 0 |
| UI / small | — | Archivo 400/500 | 0.95rem | 1.6 | 0 |
| Label | `.t-label` | Mono 500 | 0.7rem | 1.4 | 0.08em, uppercase |
| Code | — | Mono 400 | 0.875rem | 1.7 | 0 |

Use `text-wrap: balance` on display headings and summaries. Add
`overflow-wrap: break-word` to prose.

Font loading:

- Archivo: Google Fonts, weights `400;500;600;700`, plus italic 400.
- JetBrains Mono: Google Fonts, weights `400;500`.
- Clash Display: Fontshare, weights `500;600`.
- Preconnect to `fonts.googleapis.com`, `fonts.gstatic.com`, and
  `api.fontshare.com`.
- `font-display: swap`; `font-synthesis: none` so Clash Display never fakes a
  weight it does not have.
- Later optimization: self-host and subset all three families. Do not block v1
  on it.

### 4.3 Layout

| Token | Value | Use |
| --- | --- | --- |
| `.container-wide` | `min(92vw, 72rem)` | Header, footer, home, writing list |
| `.container-prose` | `min(92vw, 44rem)` | Article header and prose |
| Header height | 4rem mobile / 5rem desktop | Fixed; includes safe-area top padding |
| `--spacing-section` | `clamp(4rem, 8vw, 7rem)` | Vertical rhythm between page sections |
| Post row grid | `2rem 7.5rem minmax(0, 1fr) 1.5rem` | Index, date, content, arrow |

Breakpoints: `40rem` for small changes and `48rem` for the post-row grid and
header height. The portfolio uses a 72rem paged breakpoint for its section
pager; the blog does not need it.

Global base:

```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: 5.5rem;
  -webkit-text-size-adjust: 100%;
}

body {
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-sans);
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection {
  background: var(--color-accent);
  color: var(--color-ink);
}

:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}
```

### 4.4 Components

**Header.** Fixed, `bg-paper/90`, `backdrop-blur`, `border-b border-line`,
safe-area top padding. `container-wide`. Left: `f.pt` in Clash Display 600,
18px, linked to `/`. Right: `Writing` in `t-label`, a 44px tap target. Active
link gets `aria-current` plus a 1.5px orange underline. No hamburger: the nav
fits at 320px.

**Footer.** Hairline top, `container-wide`, `padding-block: 2rem` plus
safe-area bottom. Left: `© 2026 Francisca Portugal`. Middle: `franciscapt.dev`,
`GitHub`. Right: `Have a great day! :D` in `t-label`. Stack on mobile.

**Pills.** `PillLink` component with `primary` (ink background, paper text,
hover accent background with ink text) and `outline` (hairline border, ink
text, hover accent border and `accent-ink` text). `min-height: 2.75rem`,
`border-radius: 999px`, `padding-inline: 1.25rem`, 0.875rem Archivo 500.
`transition: color, background-color, border-color, scale 150ms`;
`active:scale-[0.97]`.

**On this page.** At `xl` and above, a sticky table of contents sits in the
right gutter, 14rem wide and 2rem from the article edge. The article remains
centered. `On this page` uses the label style; the list has a hairline rail and
the active item gets a 2px accent border with `accent-ink` text. Hidden below
`xl`; the heading nearest the top of the viewport is current.

**Post rows.** Hairline between rows; whole row is a link. Desktop grid:
index `01` in `t-label`, date in `t-label`, content, arrow. Title in Clash
Display 600; summary in `t-body`; tags in `t-label` separated by `·`. Hover:
title to `accent-ink`, arrow translates 2px right and up. Mobile: index and
arrow hidden, date above title.

**Section heading.** `t-label` on the left (`Latest`, `Archive`), optional
action link on the right (`All writing →`), hairline underneath. Page titles use
the display scale and an accent period; section labels stay small.

**Hairlines.** 1px `--color-line`; top border for sections, bottom border for
rows. No shadows, no cards. The page is paper; rules are ink.

**Accent period.** `AccentDot` renders a `<span className="text-accent">.</span>`
after display headings. Use it on page titles and section heads that do not
already end in punctuation. Do not force it onto authored article titles.

### 4.5 Prose

- Base 1.125rem / 1.75, `color: var(--color-ink)`, 44rem.
- `> * + * { margin-top: 1.5em; }`.
- `h2` / `h3` in Clash Display 600, 1.75rem / 1.35rem, `scroll-margin-top: 6rem`.
- Links: `accent-ink`, underline offset 3px, decoration at 50% accent; hover
  decoration solid `accent-ink` and 1.5px.
- Lists: `padding-left: 1.3rem`; `li + li` 0.4em; `::marker` in accent.
- Blockquote: 2px accent left border, 1.25rem padding, `--color-muted`.
- `hr`: hairline, 3rem block margin.
- Images: 0.75rem radius, hairline border; `figcaption` in `t-label`.
- Inline code: `paper-soft` background, hairline border, 0.875em, 0.3rem radius.
- Code blocks: warm ink background, paper text, 1.25rem/1.5rem padding,
  0.75rem radius, horizontal scroll, 0.875rem mono, 1.7 line-height.
- Tables: full width, hairline row borders, 0.95rem, left-aligned headers.
- Task lists: `accent-color: var(--color-accent)`; remove the default marker.
- `mark`: `accent-soft` background, ink text.

Syntax palette on `#1a1816`: comments `#8f877d`, keywords `#ff9a75`, strings
`#b8d8a8`, numbers `#f2c879`, titles `#9ecbff`, built-ins `#ffd28a`, meta
`#8fd6c9`, attributes `#e6c98a`, plain text `#f3efe8`. Keep the palette small
and hand-written, like the current file.

### 4.6 Motion

- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` as `--ease-out-expo`.
- Link underline: `::after` 1.5px, `scaleX(0)`, origin right; hover
  `scaleX(1)`, origin left; 200ms.
- Pills: 150ms; `active:scale-[0.97]`. Row links and arrows get a color and
  translate response, not a scale.
- No entrance animations on article content. The LCP is the title; do not make
  readers wait for it.
- Gate hover behind `(hover: hover) and (pointer: fine)`.
- `@media (prefers-reduced-motion: reduce)`: set scroll behavior to auto and
  transition/animation durations to 0.01ms; keep color and opacity changes.

### 4.7 Accessibility

- Skip link to `#main-content`.
- Visible `:focus-visible` on every interactive element.
- `aria-current="page"` on the active nav link, paired with an underline.
- Minimum 44px tap targets for nav, pills, and footer links.
- Text contrast checked against the table above. Accent is never body text.
- `lang="en"`, `color-scheme: light`, `viewport-fit=cover`.
- Dates use `<time dateTime>`.
- Code blocks scroll horizontally; add `tabindex="0"` to `<pre>` via a small
  rehype plugin if keyboard-only scrolling is needed.
- Labels are metadata, not body copy. Do not use `t-label` for sentences.

### 4.8 Voice and microcopy

- Header mark: `f.pt`.
- Nav: `Writing`.
- Home eyebrow: `Writing`.
- Home headline: `Notes on building small things.`
- Home statement: "I'm Francisca, a frontend engineer. I write about the
  constraints you find after you announce, the rewrites they force, and the
  parts of shipping nobody blogs about."
- Home actions: `Read the latest`.
- Latest section: label `Latest`, action `All writing →`.
- Writing: label `Archive`, title `Writing.`, description "Essays and notes,
  newest first.", count `3 essays`.
- Post: title first; meta `date · reading time · tags`; an `On this page` rail
  at `xl`; footer "Thanks for reading." + `More writing` pill.
- 404: label `404`, title `This page went missing.`, body "The link may be old,
  or the essay moved.", pill `Back to writing`.
- Footer: `© 2026 Francisca Portugal` · links · `Have a great day! :D`.

---

## 5. Page-by-page

### Home

```
container-wide
├── hero (padding-top 2.5–4rem, padding-bottom --spacing-section)
│   ├── t-label: Writing
│   ├── display h1: Notes on building small things[orange .]
│   ├── t-body statement (max 38rem)
│   └── pill: Read the latest
└── latest (padding-bottom --spacing-section)
    ├── label row: Latest · All writing →
    └── PostList (5 most recent, no index)
```

The hero is not full viewport. The latest essay should be visible on a laptop
without scrolling past a pager.

### Writing

```
container-wide
├── header (max 46rem)
│   ├── t-label: Archive
│   ├── display h1: Writing[orange .]
│   ├── t-body description
│   └── t-label: N essays
└── PostList (all posts, showIndex)
```

Rows are whole-row links. Date, title, summary, tags, arrow. Hairline above the
list and between rows.

### Post

```
relative wrapper
├── article (44rem, centered)
│   ├── header
│   │   ├── display h1: authored title
│   │   ├── t-body summary
│   │   └── hairline row: date · reading time · tags
│   ├── .prose
│   └── footer
│       ├── hairline
│       └── row: t-label Thanks for reading. · outline pill More writing
└── aside: On this page (xl+)
```

The title is the largest thing on the page. The summary is the second. The
metadata is quiet. The prose is 18px and never wider than 44rem.

### 404 and error

Same structure as a short page: label `404`, display title, t-body, pill back to
`/writing`. Reuse one `ErrorState` component for 404 and 500.

---

## 6. Implementation plan

### Phase 1 — Tokens, fonts, base

- Replace the `@theme` block and `:root` overrides in `app/app.css`.
- Remove the dark media query; set light-only tokens.
- Add font links and preconnects in `app/root.tsx`.
- Add base styles: body, selection, focus, scroll padding, safe areas.
- Update `meta` with `color-scheme: light`, paper `theme-color`, `og:image`,
  and `twitter:card`.
- Add `viewport-fit=cover` to the viewport meta.

**Done when:** the site is warm paper, Archivo/Clash Display, no dark flash,
and the type renders with the correct fallbacks.

### Phase 2 — Shell

- Add `public/logo.svg` (the portfolio square) and link it as the icon.
- Rewrite `SiteHeader.tsx`: fixed, blurred, hairline, `f.pt`, `t-label` nav,
  active state.
- Rewrite `SiteFooter.tsx`: hairline, links, sign-off, safe-area bottom.
- Add `SkipLink.tsx`.
- Add fixed-header offset and `#main-content` in `root.tsx`.

**Done when:** every page sits under the same shell as the portfolio, and
keyboard navigation works.

### Phase 3 — Home and writing list

- Add `PillLink.tsx`.
- Rewrite `PostList.tsx` as the 12-column row component with a whole-row link.
- Rewrite `home.tsx`: display hero, statement, pills, latest section.
- Rewrite `writing.tsx`: archive header, count, full list.

**Done when:** the homepage introduces the writing, and the archive is
scannable at a glance.

### Phase 4 — Post and prose

- Rewrite the post header and meta row.
- Rewrite `.prose` in `app.css`: type, links, lists, blockquotes, code, tables,
  figures, images.
- Replace the highlight palette with the warm palette.
- Add the article footer and "More writing" pill.
- Change `formatDate` to the short month.

**Done when:** a long essay is comfortable at 18px / 44rem, code blocks look
native, and the title has the right weight.

### Phase 5 — 404, error, and cleanup

- Add `ErrorState` and use it in the 404 and root error boundary.
- Style the empty state in `PostList`.
- Remove the About route and RSS route, their navigation links, and the `feed`
  dependency.

**Done when:** every route, including failures, feels like the same site.

### Phase 6 — Polish and QA

- Contrast audit against the table in §4.1.
- Hover/press/reduced-motion audit on desktop and touch.
- 320px, 768px, 1280px layout checks.
- Keyboard tab order and focus visibility.
- Lighthouse mobile ≥ 95 on a post page.
- `npm run typecheck`, `npm run build`, `npm run preview`.
- Check CLS from font loading; adjust fallback or self-host if needed.

### Later, not v1

- Manual "dim" theme (not automatic) with a derived warm dark palette.
- Static or per-post OG images.
- Table of contents for long essays.
- Previous/next post links.
- Tag pages.
- Self-hosted, subset fonts.

### Files

| File | Change |
| --- | --- |
| `app/app.css` | Only `@import "tailwindcss"` and `@theme` tokens |
| `app/lib/styles.ts` | Shared Tailwind recipes, prose variants, highlight tokens |
| `app/components/AccentDot.tsx` | Orange period used by display headings |
| `app/root.tsx` | Fonts, meta, skip link, fixed-header offset, shell |
| `app/components/SiteHeader.tsx` | Rewrite |
| `app/components/SiteFooter.tsx` | Rewrite |
| `app/components/PostList.tsx` | Rewrite |
| `app/components/SkipLink.tsx` | New |
| `app/components/TableOfContents.tsx` | Sticky right-rail contents and scroll spy |
| `app/components/PillLink.tsx` | New |
| `app/components/ErrorState.tsx` | New |
| `app/routes/home.tsx` | Rewrite |
| `app/routes/writing.tsx` | Rewrite |
| `app/routes/post.tsx` | Rewrite |
| `app/routes/about.tsx` | Removed in v1 |
| `app/routes/rss[.]xml.ts` | Removed in v1 |
| `app/routes.ts` | Remove About and RSS |
| `app/lib/posts.ts` | Short date format |
| `app/lib/markdown.ts` | Register the languages used in posts |
| `app/lib/site.ts` | Remove the unused contact link |
| `package.json` | Remove the `feed` dependency |
| `public/logo.svg` | Copy from portfolio |
| `public/og-image.png` | New static share image |
| `public/favicon.ico` | Replace or remove once SVG icon is linked |

`wrangler.jsonc` is unchanged. The sitemap and prerender lists lose their
`/about` entries; the placeholder post copy no longer mentions RSS.

### Acceptance criteria

- [ ] At a glance, the blog and franciscapt.dev read as the same person.
- [ ] Light-only; no dark flash; paper `theme-color`.
- [ ] Page titles use Clash Display; body uses Archivo; labels and code use JetBrains Mono.
- [ ] Post body is 18px / 1.75 at a 44rem measure.
- [ ] `#f25c2a` is never used for small text; `accent-ink` is.
- [ ] All text passes WCAG AA; focus is visible; skip link works.
- [ ] Active nav is marked with `aria-current` and a visible underline.
- [ ] Hover only on fine pointers; reduced motion respected.
- [ ] 320px layout has no horizontal overflow.
- [ ] Lighthouse mobile ≥ 95 on a post page.
- [ ] `og:title`, `og:description`, `og:image`, and `twitter:card` on every page.
- [ ] Syntax highlighting produces token spans for the registered languages.
- [ ] No bespoke CSS selectors remain; component styling is Tailwind utilities.
- [ ] The `On this page` rail appears at `xl`, stays sticky, and tracks the active heading.
- [ ] `npm run typecheck` and `npm run build` pass.

---

## 7. Risks and open decisions

| Risk | Mitigation |
| --- | --- |
| Light-only removes a feature some readers use at night | Decide explicitly. If it matters, add a manual dim toggle later with a warm dark palette derived from the same tokens; never ship the current `#0b0b0c` theme. |
| Clash Display comes from Fontshare, a third-party host | Keep the portfolio's working links for v1; self-host and subset later for reliability and privacy. |
| Bright orange fails contrast for text | Split `accent` and `accent-ink`; use ink on orange, never paper on orange at small sizes. |
| Long titles in Clash Display at 320px | Use `clamp`, `text-wrap: balance`, and test the longest real title. Do not reduce line-height below 0.95 for multi-line titles. |
| Three webfont families add weight | Subset and self-host later if needed. JetBrains Mono is shared by labels and code, so it earns its request. |
| Font CLS from two external families | Use `display=swap`, preconnect, and matching fallback stacks; measure CLS and self-host if it exceeds 0.1. |
| The plan becomes a component library | Keep it to tokens, prose, and four small components. The blog is still Markdown plus type. |

### What not to copy from the portfolio

- The full-viewport section pager and scroll snapping. A blog should scroll
  normally.
- Lenis smooth scrolling. Native scroll is better for long-form reading and
  accessibility.
- The squishy portrait and tulip easter egg. Charming on a portfolio; a
  distraction mid-essay.
- The Motion animation library. The blog's motion is feedback only, in CSS.
- 72rem prose. The shell is wide; the text is not.
- White-on-orange small text and 11px `#a39b92` labels. Keep the look, fix the
  contrast.
