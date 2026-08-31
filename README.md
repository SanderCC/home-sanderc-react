# sanderc.net

Personal site for Sander Constantin — CV, experience, education, skills and a
small portfolio, available in English, Dutch and French.

Built with [Next.js](https://nextjs.org) (App Router, static export) and
[React Aria Components](https://react-spectrum.adobe.com/react-aria/react-aria-components.html).
Statically exported to plain HTML/CSS/JS for real per-page SEO (proper
`<title>`/`<meta>` per route, no client-only routing).

## Available scripts

- `npm run dev` (alias `npm start`) — start the Next.js dev server.
- `npm run build` — type-check and statically export the site to `out/`.
- `npm run preview` — serve the exported `out/` folder locally.

## Project structure

- `src/app/` — one folder per route (Next App Router); each `page.tsx` is a
  thin server component exporting page metadata, rendering the matching
  client component from `src/pages/`.
- `src/components/` — small, reusable UI components, one folder per component.
- `src/pages/` — the actual page content/UI per route (client components).
- `src/data/` — CV content (experience, education, skills, portfolio), per language.
- `src/i18n/` — language context and translations (EN/NL/FR).
- `src/theme/` — light/dark theme context.

<!-- Security scan triggered at 2025-09-02 02:05:39 -->

<!-- Security scan triggered at 2025-09-09 05:33:33 -->

<!-- Security scan triggered at 2025-09-28 15:36:36 -->


<!-- Security scan triggered at 2026-08-31 16:53:41 -->

<!-- Security scan triggered at 2026-08-31 16:42:12 -->