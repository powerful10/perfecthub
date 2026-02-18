# PerfectHub

PerfectHub is a scalable, content-driven Next.js platform for global tools, prompts, templates, guides, and code examples.

## Stack

- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- Static generation for SEO

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run lint
npm run build
npm run start
```

## Content System

All content lives in `/content` as JSON files:

- `content/tools/*.json`
- `content/prompts/*.json`
- `content/templates/*.json`
- `content/guides/*.json`
- `content/code/*.json`

Add a new file with `slug`, `title`, `description`, `category`, `seoTitle`, `seoDescription`, and `keywords` to auto-generate pages via dynamic routes.

## Key Routes

- `/tools`, `/tools/[slug]`
- `/calculators`, `/calculators/[slug]`
- `/prompts`, `/prompts/[slug]`
- `/templates`, `/templates/[slug]`
- `/guides`, `/guides/[slug]`
- `/code`, `/code/[slug]`
- `/build`, `/build/[slug]`
- `/cv-builder`
- `/writing-checker`
- `/ielts-writing-precheck`
- `/prompt-builder`
- `/build-prompt-composer`
- `/coming-soon`

## SEO

- Per-page metadata
- Dynamic sitemap at `/sitemap.xml`
- Robots rules at `/robots.txt`
- JSON-LD for tool pages

## Monetization Prep

`AdBanner` placeholders are included on the homepage, index pages, and detail pages for AdSense insertion.
