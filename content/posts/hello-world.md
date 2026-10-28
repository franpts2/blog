---
title: 'Hello, world'
date: '2026-10-28'
summary: 'A placeholder post so the pipeline has something to render. Replace it with the first real essay.'
tags: ['meta']
draft: false
---

This is a placeholder. It exists so you can see the whole pipeline — frontmatter, Markdown, syntax highlighting, RSS, and prerendering — working end to end before writing anything real.

Delete this file when the first essay is ready.

## How a post gets published

1. Add a Markdown file to `content/posts/`.
2. Fill in the frontmatter: `title`, `date`, `summary`, optional `tags`, optional `draft`.
3. Push. Cloudflare builds the site and prerenders every route.

```ts
type Frontmatter = {
  title: string;
  date: string; // YYYY-MM-DD
  summary: string;
  tags?: string[];
  draft?: boolean;
};
```

That is the entire publishing workflow for v1.

> Write the thing that cost you an afternoon. Future you is the first reader.
