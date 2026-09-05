# Repository Guidelines

## Project Structure & Module Organization

This is the RoboFiesta ’26 marketing site, built with Next.js App Router and TypeScript.

- `app/` contains routes and framework files: `page.tsx` is the landing page, while `events/page.tsx` and `contact/page.tsx` are standalone pages. Keep shared global styling in `app/globals.css`.
- `components/` contains reusable UI and interactive sections. Put one exported component per appropriately named PascalCase file, for example `components/SchedulePanel.tsx`.
- `components/ui/` is for lower-level reusable UI primitives.
- `lib/` holds shared data, site metadata, and utilities. Update `lib/data.ts` rather than duplicating event content in pages.
- `public/` contains static assets, including event artwork under `public/events/` and cursor assets under `public/cursors/`.

## Build, Test, and Development Commands

Use npm and the checked-in lockfile:

- `npm install` installs dependencies.
- `npm run dev` starts the local development server.
- `npm run lint` runs TypeScript type checking (`tsc --noEmit`); run it before every handoff.
- `npm run build` creates a production build and catches Next.js build-time issues.
- `npm run start` serves a completed production build.

There is currently no automated test framework. Validate relevant routes manually in the browser, then run `npm run lint` and `npm run build` for changes that affect application behavior.

## Coding Style & Naming Conventions

Use TypeScript with strict typing; avoid `any` and keep shared types close to their data or component. Follow the existing component style: PascalCase React components and filenames, camelCase variables and functions, and lowercase route directories. Use the `@/` import alias for repository-root imports, such as `@/lib/data`.

Prefer functional components, semantic HTML, accessible labels for controls, and Tailwind utility classes or existing CSS classes. Keep client-only state and browser APIs within files beginning with `'use client'`. No formatter or ESLint configuration is present, so preserve the surrounding file’s formatting and avoid unrelated reformatting.

## Commit & Pull Request Guidelines

Recent history uses Conventional Commit-style subjects, for example `feat: initialize SEO metadata` and `refactor: optimize animation performance`. Use concise, imperative subjects with prefixes such as `feat:`, `fix:`, `refactor:`, or `docs:`.

Keep pull requests focused. Describe the user-visible change, link related issues when available, state validation commands run, and include screenshots or a short recording for visual/layout changes. Flag new environment variables (for example `NEXT_PUBLIC_SITE_URL`) and asset licensing or attribution requirements in the PR description.
