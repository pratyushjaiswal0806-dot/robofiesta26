# RoboFiesta ’26

RoboFiesta ’26 is a Next.js 14 App Router site for RVITM’s student robotics festival. The visual system lives in `app/globals.css`; editable event, sponsor, prize, FAQ, and roster-slot content lives in `lib/data.ts`.

## Local development

```bash
npm install
npm run dev
```

Before handoff, run `npm run lint` and `npm run build`.

## Contact delivery

The contact form posts to `/api/contact` and sends through Resend. Copy `.env.example` to `.env.local` and provide `RESEND_API_KEY`, a verified `CONTACT_FROM_EMAIL`, and the destination `CONTACT_TO_EMAIL`. Without those values the form shows a visible comms-gateway error instead of claiming that a message was delivered.

Set `NEXT_PUBLIC_SITE_URL` to the production origin so canonical URLs, the sitemap, and social previews point to the live site.

Team names/photos/socials, sponsor logos, prize amounts, and final rulebook specifications are intentionally marked as pending in the data layer and should be replaced when approved content is available.
