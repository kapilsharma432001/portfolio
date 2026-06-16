# Kapil Sharma Portfolio

Static portfolio website for Kapil Sharma, positioned around backend engineering, event-driven cloud systems, and production AI/RAG workflows.

## Tech Stack

- Static HTML, CSS, and JavaScript
- Semantic, accessible single-page layout
- No frontend framework or build step
- Served locally with `serve`

## Local Run

```bash
npm start
```

For development:

```bash
npm run dev
```

Both commands serve the repository root. Open the local URL printed by `serve`.

## Deployment Notes

This site is static and can be deployed to GitHub Pages, Netlify, Vercel, Cloudflare Pages, or any static hosting provider. Deploy the repository root so `index.html`, `styles.css`, `script.js`, and the resume PDF are available at the same level.

## Updating Resume

The resume download links currently point to:

```text
Kapil-Sharma-Backend-Developer.pdf
```

Replace that file with a newer PDF or update the `href` values in `index.html` if the filename changes.

## Updating Projects

Featured project cards are in the `#projects` section of `index.html`. Keep descriptions aligned with the project README files and avoid adding unsupported metrics or production claims.
