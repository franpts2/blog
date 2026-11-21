# Writing

Essays about building small products: the constraints, the rewrites, and the parts of shipping nobody blogs about.

<p align="left">
  <a href="LICENSE"><img src="https://img.shields.io/badge/MIT-green?style=flat-square" alt="MIT license"></a>
</p>

<p align="left">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white" alt="Cloudflare">
</p>

## About

Personal blog for essays about building small products: the constraints, the rewrites, and the parts of shipping nobody blogs about. Markdown is the source of truth; every published page is prerendered to static HTML and served from Cloudflare Workers.

**Live:** [blog.franciscapt.dev](https://blog.franciscapt.dev)

## Features

- Markdown-driven publishing with YAML frontmatter
- Build-time Markdown to HTML pipeline with GFM and syntax highlighting
- Prerendered pages with Open Graph, canonical, and article metadata
- Sticky table of contents with active-section tracking
- Reading time, tags, and draft support
- Sitemap generated from the same post manifest
- Responsive typography and accessible, print-friendly layouts
- Fast static delivery through Cloudflare Workers

## How It Works

Markdown files under `content/posts/` are the source of truth. At build time the app parses
the frontmatter, renders GitHub-flavoured Markdown with syntax highlighting, and prerenders
each page. The result is served as static assets by a Cloudflare Worker, with a small Worker
entry point for routing and metadata.

**Folder Structure**

```
blog/
├── app/
│   ├── components/
│   │   ├── layout/      ← Header, footer, skip link
│   │   ├── post/        ← Post list, header, metadata, table of contents
│   │   └── ui/          ← Reusable primitives
│   ├── hooks/           ← Client-side behaviour
│   ├── lib/
│   │   ├── config/      ← Site metadata
│   │   ├── content/     ← Frontmatter, Markdown pipeline, post repository
│   │   ├── seo/         ← Metadata and sitemap helpers
│   │   └── styles/      ← Tailwind class recipes
│   ├── routes/          ← Route modules
│   ├── root.tsx
│   ├── routes.ts
│   └── app.css
├── content/
│   └── posts/           ← Markdown essays (source of truth)
├── docs/                ← Architecture and roadmap
├── public/
├── workers/             ← Cloudflare Worker entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Development

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck  # wrangler types + route typegen + tsc
npm run build      # prerender every page
npm run preview    # build + preview the Worker locally
npm run deploy     # build + wrangler deploy
```

## Writing a Post

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

2. Run `npm run dev` to preview. Drafts appear only in development.
3. Commit and push. The build prerenders the new page.

The filename becomes the URL: `/writing/<slug>`. See [PLAN.md](./docs/PLAN.md) for architecture and roadmap.

## License

[MIT](./LICENSE) © Francisca Portugal

---

_Writing — essays on building small things._
