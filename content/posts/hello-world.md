---
title: 'Hello, world'
date: '2026-10-28'
summary: 'A test post for the whole pipeline: headings, prose, code, tables, task lists, and the table of contents.'
tags: ['meta', 'test']
draft: false
---

This is a placeholder with a job: it exercises the parts of the blog that are easy to forget until a real essay needs them. Delete it when the first real post is ready.

## A placeholder with a job

The first paragraph should be comfortable to read before anything clever happens. This one has **strong text**, *emphasis*, `inline code`, and a [link to the portfolio](https://franciscapt.dev). It also has a [relative link back to Writing](/writing) to check that internal links stay in the site.

> Write the thing that cost you an afternoon. Future you is the first reader.

## How a post gets published

### Frontmatter

Every post starts with a small YAML block. The filename becomes the URL.

| Field | Required | What it does |
| --- | --- | --- |
| `title` | Yes | The heading and document title |
| `date` | Yes | Used for ordering and the post metadata |
| `summary` | No | The list description and social preview |
| `tags` | No | Small metadata labels under the post |
| `draft` | No | Visible in development, skipped in production |

### The build pipeline

1. Add a Markdown file to `content/posts/`.
2. Fill in the frontmatter: `title`, `date`, `summary`, optional `tags`, optional `draft`.
3. Push. Cloudflare builds the site and prerenders every route.

The Markdown is parsed once at build time:

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

```bash
npm run dev    # preview at http://localhost:5173
npm run build  # prerender every page
```

## What the table of contents is doing

The rail on the right is generated from the `h2` and `h3` elements in this file. It is hidden on narrow screens, and the heading nearest the top of the viewport is marked as current.

### Scroll to a heading

Use the rail to jump around. The orange line follows the section you are reading.

### A heading with `inline code`

Headings can contain inline code, like this one, and the contents list strips the tags before showing it.

## A heading that is long enough to wrap onto several lines in the table of contents

Long headings are useful: they test the width of the rail, the line height, and the active border. This one should wrap without pushing the article off-center.

## Tables & task lists

Tables get horizontal scroll on narrow screens; task lists keep their checkboxes and drop the default marker.

- [x] Frontmatter renders
- [x] Syntax highlighting runs
- [ ] Replace this file with a real essay
- [ ] Publish the first three essays

| Element | What to look for |
| --- | --- |
| Links | Accent-ink text with an accent underline |
| Code | Warm block, paper text, accent tokens |
| Tables | Hairline rows and a scroll container |
| Images | Rounded corners and a hairline border |

## An image and a rule

![The blog's Open Graph card, with Writing in large type.](/og-image.png)

Images should respect the prose measure and never overflow.

---

## What this page is testing

- Heading hierarchy and anchor links
- The sticky table of contents and its active state
- Inline links, strong, emphasis, and inline code
- Ordered, unordered, and task lists
- Tables, blockquotes, images, and horizontal rules
- TypeScript and shell code blocks
- Short and long headings in the contents rail

If all of that still looks right, the next post can be about something real.
