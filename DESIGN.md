# RoboFiesta ’26 — Design System and Experience Specification

## 1. Purpose

This document is the visual, interaction, and content-design reference for the RoboFiesta ’26 website. It describes the product as it is implemented in this repository, so future work can extend it without replacing its identity with a generic event, SaaS, or portfolio aesthetic.

RoboFiesta is a student robotics festival website for RVITM, Bangalore. Its primary job is to help prospective participants:

1. understand the festival at a glance;
2. discover the available competition arenas;
3. inspect each event’s current mission brief;
4. find timing, location, and contact routes; and
5. open a registration or enquiry channel.

The site should feel like entering a playable 8-bit robotics world rather than reading a conventional college-fest brochure. Every major interaction is framed as navigation through an arena, console, transmission, level, or mission.

## 2. Design Thesis

### The central idea

**A student robotics festival presented as a bright, tactile pixel-console adventure.**

The experience blends:

- retro arcade language;
- friendly maker culture;
- physical hardware cues;
- high-energy festival colour;
- real event information; and
- intentionally explicit pending states for information that organisers have not yet approved.

This is not a dark cyberpunk interface, a sleek corporate technology site, or a nostalgic game emulator. It is optimistic, handmade, colourful, and mechanical: a campus arena built from circuit boards, painted signs, CRT consoles, printed posters, and small animated pixels.

### The emotional arc

The visitor should move through four feelings:

1. **Arrival:** the hero is celebratory and larger than life.
2. **Orientation:** console panels, labels, and clear navigation make the world legible.
3. **Challenge:** event cards and mission briefs make competition feel tangible.
4. **Belonging:** sponsors, makers, crew placeholders, contact channels, and the final call to action make the festival feel open and human.

### Non-negotiable design principles

- Keep the retro pixel / 8-bit visual system intact across every route.
- Use a light, festival-colour palette with deep-purple ink; do not convert the site into a black neon dashboard.
- Use hard edges, stepped corners, outlined artwork, and offset pixel shadows instead of soft cards, glassmorphism, or rounded SaaS components.
- Let animation feel stepped, mechanical, and occasional. Motion supports hierarchy; it never blocks access to content.
- Use real organiser facts where available. Mark unknown sponsors, prizes, people, social links, fees, and rulebook details as pending rather than inventing them.
- Preserve the content hierarchy: strong display typography for landmarks, readable sans-serif copy for details, and tiny pixel type only for labels and controls.
- Treat accessibility, keyboard operation, reduced motion, and direct routes as part of the visual system rather than a separate polish pass.

## 3. Product and Audience

### Primary audience

- School and college students deciding whether to attend or compete.
- Teams comparing competition arenas and team-size requirements.
- Parents, mentors, faculty, and visitors looking for schedule, venue, and contact information.
- Potential sponsors and community partners.

### Secondary audience

- Organising team members maintaining content.
- Designers and developers adding routes, event artwork, official rulebooks, roster information, or sponsor assets.

### Brand voice

The voice is energetic and direct, with a friendly maker sensibility.

Use vocabulary such as:

- arena;
- build;
- crew;
- mission;
- level;
- transmission;
- comms bay;
- console;
- rulebook;
- base camp;
- unlock; and
- makers.

Keep sentences short and useful. Decorative labels are acceptable when they communicate location or state in the world, for example `WORLD 03 · COMMS BAY` or `SIGNAL ONLINE`. Do not use the game metaphor to obscure important information such as contact details, accessibility, registration status, dates, or rulebook availability.

## 4. Information Architecture

### Route map

```text
/
├── Home — festival overview and primary discovery route
│   ├── #sponsors
│   ├── #mission
│   ├── #events
│   ├── #schedule
│   ├── #prizes
│   ├── #faq
│   └── #register
├── /events — poster-wall event directory
├── /events/[slug] — one static mission brief per event
│   ├── /events/bgmi
│   ├── /events/bug-squash
│   ├── /events/chess
│   ├── /events/clash-royale
│   ├── /events/code-battle
│   ├── /events/ctf
│   ├── /events/fifa
│   ├── /events/free-fire
│   ├── /events/ipl-auction
│   ├── /events/minecraft
│   ├── /events/moneyball
│   ├── /events/robo-race
│   ├── /events/robo-sumo
│   ├── /events/save-the-egg
│   ├── /events/tech-auction
│   ├── /events/treasure-hunt
│   └── /events/waste-drift
├── /contact — communications bay and enquiry form
├── /api/contact — contact-form delivery endpoint
├── /manifest.webmanifest
├── /opengraph-image
└── fallback — “Signal Lost” 404 world
```

### Navigation model

The fixed navigation exposes four primary routes:

| Label | Destination | Purpose |
| --- | --- | --- |
| Home | `/` | Return to the festival overview. |
| Events | `/events` | Browse event posters and mission briefs. |
| Schedule | `/#schedule` | Jump to the home-page schedule. |
| Contact | `/contact` | Open the communications bay. |

The persistent registration call to action links to the contact form with the `Registration support` subject already selected. Event-detail registration links also pass the event title, allowing the contact form to show the selected event channel.

Links intentionally opt out of Next.js prefetching in many navigation surfaces. This keeps navigation behaviour deliberate and works with the route-wipe transition system.

## 5. Visual Foundation

### 5.1 Colour system

The palette is deliberately high-key. Creams and pastels create an open festival atmosphere; deep purple creates a consistent ink, edge, and shadow language.

| Token | Value | Role |
| --- | --- | --- |
| `--color-ink` | `#2A0B4F` | Primary outline, shadow, text, and high-contrast edge. |
| `--color-purple` | `#6C2BD9` | Primary purple accent, section labels, inner shadows, and console details. |
| `--color-cream` | `#FFF9E6` | Main paper-like surface and base page field. |
| `--color-ivory` | `#FFFDF4` | Highest-elevation readable surface, inputs, and rule rows. |
| `--color-yellow` | `#F4C63F` | Main action colour, wordmark fill, buttons, and reward emphasis. |
| `--color-orange` | `#FF8B78` | Warm secondary accent, heading extrusion, and poster variation. |
| `--color-blue` | `#9BE7FF` | Cool contrast accent, facts, console panels, and active focus outline. |
| `--color-pink` | `#F4DFFF` | Supporting soft accent for chips, roster cards, and form surfaces. |
| `--color-green` | `#68C44A` | “Ready”, success, grass, and live-system indicators. |
| legacy coral accent | `#FF5F6D` | Alert/status red-pink, sky band, and warm wordmark detail. |
| deep shadow purple | `#1A062E` / `#18062F` | Extra-dark extrusion and physical-depth shadow. |

Use colour semantically and compositionally:

- Yellow means primary action, reward, and high-energy focus.
- Blue means information, facts, and console display contrast.
- Green means available, nominal, ready, or success.
- Warm coral/pink means alert, active signal, or decorative heat.
- Purple and ink carry structure. They should remain visible in every major section.

Avoid:

- muted grey UI chrome;
- gradients used only for fashionable depth;
- low-contrast pastel-on-pastel text;
- a single accent colour applied to every component; and
- semantic states that rely only on hue.

### 5.2 The world gradient

The persistent `SkyWorld` layer is the site’s environmental canvas. It progresses down the page from dark indigo through purple, magenta, coral, orange, yellow, pale cream, green, and sky blue. The background position tracks document scroll, so moving down the page reads as travelling through a single long pixel world.

The gradient is paired with:

- a low-opacity dither field;
- horizontal scanline texture;
- sparse four-point pixel sparks;
- floating pixel bulbs;
- oversized circuit glyphs; and
- foreground section surfaces where detail needs more contrast.

This continuous world is a defining behaviour. Do not replace each route with unrelated full-screen gradients or isolated card backgrounds.

### 5.3 Typography

Two type families create the hierarchy:

| Family | Source | Use |
| --- | --- | --- |
| Press Start 2P | Google Fonts | Headings, display lockups, labels, tabs, buttons, small console data, navigation, and pixel-state messages. |
| DM Sans | Google Fonts | Body copy, descriptions, facts, contact details, form fields, and readable long text. |

#### Display type

Press Start 2P is intentionally dense and difficult to scan in paragraphs. Use it for short, high-impact phrases only:

- `ROBOFIESTA ’26`;
- section headings;
- event titles;
- panel labels;
- states such as `SIGNAL ONLINE`;
- button labels; and
- short metadata.

Typical implementation scale:

- hero wordmark: `clamp(43px, 7.7vw, 100px)` before later responsive refinements;
- large page/event titles: roughly `48px–112px` depending on template;
- section headings: `clamp(25px, 3.5vw, 44px)`;
- compact labels: roughly `6px–10px`.

Use tight negative letter spacing only where the existing pixel typography needs it. Do not apply it to DM Sans body text.

#### Body type

DM Sans carries useful information at comfortable line height:

- normal body copy: approximately `14px–19px`;
- feature and contact descriptions: 1.5–1.6 line height;
- facts and data rows: bold, compact, and allowed to wrap;
- no long paragraph should depend on pixel type for readability.

### 5.4 Spacing and layout tokens

The spacing rhythm follows pixel-friendly increments:

| Token | Value |
| --- | --- |
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 24px |
| `--space-6` | 32px |
| `--space-7` | 48px |

The standard content zone uses a maximum visual width of `1140px` and responsive horizontal padding:

```css
padding-inline: max(24px, calc((100vw - 1140px) / 2));
```

The poster-wall directory expands its horizontal design field to `1240px` to accommodate four posters across on wide screens.

Treat `4px` as the smallest intentional visual unit. Keep borders, stepped cutouts, shadows, gaps, and icon offsets aligned to this rhythm whenever practical.

### 5.5 Shape, edge, and depth language

The website’s physicality comes from a repeated set of pixel-material rules:

- **Hard outlines:** typically 2px–5px in deep purple ink.
- **Offset shadows:** black/purple pixel shadows, most commonly `6px 6px` or `10px 10px`.
- **Stepped corners:** `clip-path` polygons remove tiny corner chunks from panels, resembling machined console casings.
- **No default rounded cards:** corners are square or stepped. The moon is circular because it is an illustrated object, not UI chrome.
- **Pressed action:** primary buttons translate into their shadow on hover/active, as if physically depressed.
- **Dither and scanlines:** used as surface texture, not as a substitute for content separation.
- **Crisp imagery:** event art uses `image-rendering: pixelated`.

When adding a new panel, begin with a cream/ivory/pastel surface, ink outline, pixel shadow, and only then decide whether a stepped corner is needed. Do not add radius, blur, translucent glass, or soft ambient shadows.

## 6. Brand Motifs and Illustration Language

### Friendly hardware

The visual system uses CSS-built pixel objects instead of generic stock imagery:

- friendly robot mascot with antenna, cyan face screen, and yellow body;
- three-piece pixel clouds;
- moon with crater marks and chunky outline;
- small stars and sparkle glyphs;
- bulbs, circuit glyphs, gears, boards, and drone shapes;
- a prize vault;
- a radio/communications console;
- pixel portraits used as roster placeholders; and
- console buttons, LEDs, readouts, tracks, and antenna-like dividers.

These illustrations should remain flat, outlined, colourful, and legible at small sizes. They should look constructed from a small set of CSS rectangles and pixels, not rendered in a realistic 3D style.

### Event artwork

Event posters are the main rich imagery. The current asset inventory includes:

| Asset | Size | Intended use |
| --- | ---: | --- |
| `bgmi.webp` | 794 × 1123 | BGMI card, carousel, and detail art. |
| `bug-squash.webp` | 794 × 1123 | Bug Squash card, carousel, and detail art. |
| `chess.webp` | 794 × 1123 | Chess card, carousel, and detail art. |
| `clash-royale.webp` | 794 × 1123 | Clash Royale card, carousel, and detail art. |
| `code-battle.webp` | 794 × 1123 | Code Battle card, carousel, and detail art. |
| `ctf.webp` | 794 × 1123 | CTF card, carousel, and detail art. |
| `fifa.webp` | 794 × 1123 | FIFA card, carousel, and detail art. |
| `free-fire.webp` | 794 × 1123 | Free Fire card, carousel, and detail art. |
| `ipl-auction.webp` | 794 × 1123 | IPL Auction card, carousel, and detail art. |
| `minecraft.webp` | 794 × 1123 | Minecraft card, carousel, and detail art. |
| `moneyball.webp` | 794 × 1123 | Moneyball card, carousel, and detail art. |
| `robo-race.webp` | 794 × 1123 | Robo Race card, carousel, and detail art. |
| `robo-sumo.webp` | 794 × 1123 | Robo Sumo card, carousel, and detail art. |
| `save-the-egg.webp` | 794 × 1123 | Save the Egg card, carousel, and detail art. |
| `tech-auction.webp` | 794 × 1123 | Tech Auction card, carousel, and detail art. |
| `treasure-hunt.webp` | 794 × 1123 | Treasure Hunt card, carousel, and detail art. |
| `waste-drift.webp` | 794 × 1123 | Waste Drift card, carousel, and detail art. |

The current catalogue uses these 17 optimized portrait WebP assets. Earlier source artwork may remain outside the live catalogue, but no live event route or card references it.

Poster-wall thumbnails sit in a `3:4` frame with `object-fit: cover`. Event-detail artwork keeps its native aspect ratio inside a framed presentation. When replacing or adding art:

- retain the true dimensions in the data record;
- provide specific alternative text;
- check square and tall compositions in both poster-wall and detail layouts;
- keep the pixelated rendering treatment; and
- do not crop a tall supplied poster into a square without a deliberate, reviewed layout decision.

### Icon language

The site mixes Lucide icons with simple typographic glyphs. Lucide icons are used where recognisability matters—mail, phone, map pin, trophy, calendar, navigation arrows, volume, and menu controls. Glyphs are used as game-world flavour—gears, sparks, arrows, and level markers.

Use Lucide icons at robust stroke widths in functional contexts. Use decorative glyphs only with `aria-hidden` or a nearby textual label.

## 7. Global Shell

### 7.1 First-visit loader

The first page view begins with the `PixelArcLoader`:

- full viewport, dark-to-light world gradient;
- subtle dither and scanlines;
- central layered `LOADING` wordmark with a deep pixel extrusion;
- staggered vertical wave across the letters;
- status semantics through `role="status"`, `aria-live="polite"`, and `aria-busy="true"`.

Behaviour:

- minimum display duration: 1.5 seconds;
- safety maximum wait: 6 seconds;
- waits for window load, fonts, and any future images marked `data-loader-critical="true"`;
- fades out over 500ms;
- stores a `robofiesta-pixel-arc-loader-seen` preference in local storage;
- skips the intro on return visits when that preference exists.

The loader is an arrival moment, not a loading-screen feature to copy into every interaction. Do not reintroduce it between internal routes.

### 7.2 Fixed navigation

The navigation is a cream physical console floating near the top of the viewport:

- fixed, centred, and limited to about `1120px`;
- deep ink border and hard shadow;
- mini-bot brand mark;
- primary links;
- sound toggle;
- persistent registration action on wide layouts;
- compact hamburger control on mobile.

On scroll it becomes slightly shorter, moves upward, narrows a little, and gains a soft external drop shadow while preserving the hard pixel panel shadow.

Route-active navigation links use purple text plus an underlined/animated signal bar. Avoid broad, filled active-tab treatments that would compete with the page title.

### 7.3 Scroll-progress HUD

`SkyWorld` adds a persistent page-exploration readout:

- vertical meter on larger screens;
- percentage readout;
- `PROGRESS` and `LVL` labels;
- a striped energy track;
- horizontal adaptation in compact layouts;
- omission from the full poster wall to keep its grid symmetrical;
- ARIA progressbar semantics with updated text values.

This is world chrome, not analytics. Do not use it to imply user progress through registration or form completion.

### 7.4 Route transitions

Internal route changes use a short pixel wipe:

1. twelve vertical bars cover the page in staggered stepped motion;
2. a yellow central label says `LOADING NEXT LEVEL…`;
3. the destination route loads;
4. bars reveal the page; and
5. the label becomes `LEVEL READY` as it leaves.

The interaction intentionally waits about 390ms before pushing the route. All browser-navigation modifiers, same-document anchors, downloads, external links, and links marked `data-no-transition` remain unaffected.

### 7.5 Ambient and click feedback

The global shell adds:

- slowly drifting pixel sparks;
- sparse decorative world motion;
- small six-pixel burst feedback on fine-pointer clicks;
- a waving mini-bot when the brand is hovered; and
- a slight pointer-based shift on selected console panels on fine-pointer devices.

Keep these effects sparse. They should read as environmental feedback, not as continuously competing UI.

### 7.6 Sound

The sound control plays a looping, browser-unlocked 8-bit arrangement of the public-domain Für Elise theme:

- square-wave melody with triangle-wave bass;
- starts only after user interaction required by browser audio policies;
- button label and icon expose the current on/off state;
- hover and press tones apply to buttons when sound is enabled;
- preference persists under `robofiesta-sound-enabled`;
- storage failures do not block the control.

Sound is optional. Never autoplay audible audio without a user gesture, and always leave the visible toggle reachable from the navigation.

## 8. Home Page: Visual Narrative

The home page is an ordered festival journey rather than a stack of generic sections.

### 8.1 Level 01: Hero

**Purpose:** establish the world, date, venue, and primary action in one screen.

The hero combines:

- oversized stepped `ROBOFIESTA ’26` wordmark;
- lavender letter face, yellow year, thick ink outline, and multi-layered pixel extrusion;
- friendly robot mascot;
- pixel moon, clouds, sparkles, and satellite;
- tagline: `Where Circuits Come Alive.`;
- festival date and venue;
- paired actions: `Register Your Team` and `Explore Events`;
- scroll invitation at the bottom.

Composition:

- centre-align all primary content;
- treat the wordmark as the main visual object;
- keep the mascot directly above it as a friendly guide;
- keep calls to action grouped under the date and venue;
- allow decorative pieces to float at the edges, away from text.

Do not add a photographic hero image behind the lockup. The CSS-built scene is intentionally the lead artwork.

### 8.2 Pit Crew: Sponsors

**Purpose:** make sponsorship visible without fabricating partnerships.

The sponsor area uses tier rows:

- Title Sponsor;
- Gold Partners;
- Community Partners; and
- Media Partners.

Empty sponsor records display explicit `LOGO SLOT` panels with their slot name. The visual treatment should make an empty slot look intentional and provisional, not broken.

The section closes with sponsorship actions:

- `Partner With Us`;
- `Request sponsor pack`.

Replace a slot with an approved logo and accurate alt text only after the partnership is confirmed.

### 8.3 Transmission: Festival proposition

**Purpose:** turn the festival overview into a central system broadcast.

This is the core cream console panel with:

- blinking status LED;
- circuit-arm decoration;
- `TRANSMISSION RECEIVED` label;
- `THE ARENA IS OPEN.` heading;
- festival description;
- four compact stats;
- registration countdown; and
- registration plus rulebook/event navigation.

The panel is the visual midpoint of the home page. Its large shadow, stepped corners, stat tiles, and countdown make it feel like a physical briefing terminal.

Use this location for only high-confidence top-level facts. Current unconfirmed values such as the prize pool are explicitly marked `TBA`.

### 8.4 Level Select: Event discovery

**Purpose:** make event discovery playful before users commit to the full directory.

The home-page event preview is a deferred 3D coverflow:

- it loads when its placeholder comes within 600px of the viewport;
- posters are arranged in a looping perspective stack;
- drag, arrow buttons, keyboard arrows, and diamond pagination select an event;
- every visible poster carries its event name, while clicking a poster opens its specific event route;
- the selected event reveals its one-line description, team size, difficulty, prize status, and a direct `View full challenge` link.

Default coverflow geometry:

| Property | Default |
| --- | ---: |
| Card width | `clamp(148px, 22vw, 260px)` |
| Event poster aspect ratio | `794 / 1123` |
| Y rotation | 44° |
| Depth | 0.6 × card width |
| Perspective | 3 × card width |
| Falloff | 0.56 |
| Opacity fade | 0.1 |
| Gap multiplier | 0.05 |
| Looping | enabled |

The component is a hero interaction within the middle of the home page, not a replacement for the poster-wall directory. Keep the poster imagery dominant and captions secondary.

### 8.5 Command Center: Schedule

**Purpose:** make a three-day program readable as an interactive terminal.

The schedule panel includes:

- tabs for `Day 1 — Ignite`, `Day 2 — Compete`, and `Day 3 — Celebrate`;
- a `LIVE STATUS` row;
- numbered agenda rows with time, activity, and arrow cue;
- secondary-looking buttons for `Add to Calendar` and `Download Full Schedule`.

Keyboard behaviour follows a tab pattern:

- Left/Up: previous day;
- Right/Down: next day;
- Home: first day;
- End: final day;
- selected tab receives focus after keyboard navigation.

The two schedule action buttons are currently presentational controls; they should not be described as working downloads or calendar integrations until those actions are implemented.

### 8.6 Level Reward: Prize vault

**Purpose:** frame prizes as an unlockable reward without promising amounts that are not confirmed.

The prize section uses:

- editorial prize copy on one side;
- a CSS-built vault with decorative sparks;
- three elevated category cards;
- Champion, Runner-Up, and Special Awards categories;
- explicit `Amount to be announced` or `Categories to be confirmed` details.

Do not replace pending prize information with speculative cash values.

### 8.7 XP Unlocked: Experience

**Purpose:** broaden the festival story beyond competition.

Four feature cards communicate:

- Build;
- Battle;
- Meet; and
- Launch.

The cards are useful as high-level value propositions. They should remain concise and should not be overloaded with testimonials, sponsor claims, or repeated event facts.

### 8.8 Help Desk: FAQ

**Purpose:** answer practical attendee questions without forcing a route change.

The FAQ is a numbered accordion:

- one answer opens at a time;
- the current trigger carries `aria-expanded`;
- answer content is tied to the trigger with `aria-controls`;
- disclosure chevron rotates when open.

Content covers eligibility, inter-college participation, team-size variability, registration fees, accommodation, and rulebooks. Keep answers factual and update them when organiser policy changes.

### 8.9 Credits Roll: Organising team

**Purpose:** make organiser presence visible while awaiting confirmed roster information.

The current design intentionally shows:

- an explanation that names, photos, and socials are being verified;
- a `TEAM REVEAL COMING SOON` signal panel;
- twelve pixel-avatar cards grouped by role;
- `REVEAL SOON` instead of invented names.

When real profiles arrive, retain the panel structure, spacing, and playful avatar scale. Replace placeholders carefully with approved images, names, roles, and social links. Do not expose incomplete personal details.

### 8.10 Final Level: Conversion

**Purpose:** end the long page with a clear commitment point.

The final section includes:

- a moving flyer/drone with `READY TO BUILD?` banner;
- `YOUR NEXT BUILD STARTS HERE.` lockup;
- registration and contact actions; and
- a grass/soil ground strip with buried maker objects.

The final call to action should be strong but not visually unrelated to the journey above it. It remains part of the pixel world, not a generic contrasting banner.

## 9. Events Directory: Poster Wall

### Purpose

`/events` is the gallery route. It converts the festival’s event catalogue into a poster-wall directory while preserving immediate scanning for team size, level, and prize status.

### Page structure

1. Fixed navigation and persistent world layer.
2. `WORLD 02 · POSTER WALL` label.
3. Large yellow `EVENTS` heading with warm extruded shadow.
4. One-sentence event-directory introduction.
5. Header search popover for event titles, slugs, and short descriptions.
6. Poster grid.
7. Registration-support and schedule links.
8. Footer console.

### Poster card anatomy

Each poster entry is one complete link so the whole card has a clear click target:

1. coloured outer frame;
2. 3:4 poster sheet;
3. event title;
4. `OPEN MISSION` call to action with arrow.

Each frame colour is selected from its poster artwork rather than assigned by card position. Treat it as a visual extension of the poster, not as a category taxonomy.

### Poster-wall layout

| Viewport | Grid |
| --- | --- |
| Wide desktop | 4 columns |
| Up to 980px | 3 columns |
| 701px–760px | 1 column |
| Up to 700px | 2 compact columns |

Cards retain a lifted poster hover on fine-pointer desktops. On compact touch layouts, remove the translate/rotate hover movement and preserve a stable shadow.

The one-column `701px–760px` state followed by the two-column `≤700px` state reflects the current CSS cascade. Preserve it when matching the existing presentation; change it only as a deliberate responsive redesign, with both widths reviewed together.

### Header search

The shared top-navigation Search control opens a compact input directly below the button. It accepts event titles, slugs, and short descriptions, then loads the filtered poster wall at `/events?search=...`. The normal poster wall has no embedded search console; keep the popover compact and aligned to its header control on every route.

### Accessibility

- Link labels name the event and indicate that the mission brief opens.
- Focus moves to the poster frame with a thick blue outline and visual lift.
- Event titles remain readable beneath each poster.
- The full card remains a single keyboard-focusable link.

## 10. Event Mission Brief Template

### Purpose

`/events/[slug]` turns one event into a focused, readable mission page while retaining the poster-world visual identity.

### Template anatomy

1. Back link to the poster wall.
2. `WORLD 02 · LEVEL NN` label.
3. Large outlined event title.
4. One-sentence event lede.
5. Two-column poster and facts layout.
6. Primary registration-support action.
7. `HOW TO PLAY` rule panel.
8. Rulebook-status note.
9. Footer console.

### Poster and facts layout

On wide viewports, the content uses an asymmetrical two-column ratio:

- art: about 0.86 fraction;
- facts: about 1.14 fraction.

The poster has a purple frame, stepped corners, an offset shadow, and a yellow icon badge. The facts panel uses:

- team-size and difficulty chips;
- Timing;
- Format;
- Team Size;
- Prize Info;
- registration-support call to action.

At `900px` and below, poster and facts stack. The poster stays limited to a readable maximum width rather than stretching across the page.

### Rules

The rules panel uses ordered, numbered rows so a visitor can scan the sequence. Each data record currently holds a short `rules` list; the adjacent rulebook note clearly explains that specifications, fees, judging, and safety checks are pending organiser release.

When final rulebooks are supplied:

- retain the summary list in the visual panel;
- add a clear official-download link only when the real file exists;
- preserve the `pending` state for anything not yet confirmed; and
- do not infer mechanical limits, fees, scoring, or safety requirements.

## 11. Contact: Communications Bay

### Purpose

`/contact` makes reaching organisers feel like opening a console channel, while keeping actual contact data and form controls straightforward.

### Hero composition

The contact hero uses a two-column layout:

- left: `WORLD 03 · COMMS BAY` label, large `CONTACT US` display type, and explanatory copy;
- right: a physical communications console with a radio icon, pixel robot, `CHANNEL ONLINE` status, frequency, and ready state.

The hero is a purple-to-coral scanline field. At `820px` and below, it stacks with centred copy and a contained console. A stepped, multi-colour ground transition hands the visitor into the peach contact zone below.

### Direct channels

The contact-details column lists:

- email;
- phone;
- full venue address; and
- office hours.

Email and phone are actionable `mailto:` and `tel:` links. Venue and hours are informational blocks. Cards use alternating cream, blue, yellow, and pink surfaces to create a physical contact-board rhythm.

### Contact form

The form is titled `NEW TRANSMISSION` with a recording indicator. It contains:

- name;
- email;
- college/team;
- subject selector;
- message;
- hidden honeypot field;
- submit action; and
- form-status area.

Client validation:

- name: 2–80 characters;
- valid email pattern;
- message: 10–4,000 characters;
- invalid field receives focus after submit;
- inline errors use both message text and visual styling.

The query string can prefill:

- `subject`, matched against existing subject choices; and
- `event`, displayed as the current event channel.

Delivery state:

| State | Visual treatment | Meaning |
| --- | --- | --- |
| Idle | Normal form | Ready to send. |
| Submitting | Disabled yellow action | Transmission in progress. |
| Success | Green status panel | API accepted the message. |
| Error | Warm red status panel | Validation, configuration, delivery, or network failure. |

The backend sends through Resend only when `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` are configured. When they are not, the interface must show the explicit gateway-offline error; it must never imply that a message was delivered.

## 12. Footer Console

The footer is a physical end-of-transmission console, not a minimal legal strip.

### Structure

- blue/yellow stepped background;
- large cream console shell;
- header line with `ROBOFIESTA NETWORK // RF-26` and `SIGNAL ONLINE`;
- brand, description, and footer navigation;
- open-channel control bay;
- maker badge, location, and copyright.

### Channel controls

The footer displays four social/contact controls:

- Instagram — pending;
- LinkedIn — pending;
- YouTube — pending;
- Mail — active contact route.

Pending social controls deliberately appear as non-links with clear accessible `coming soon` labels. Do not turn them into arbitrary URLs or empty `#` links.

### Responsive behaviour

On mobile:

- console header stacks;
- copy becomes centre aligned;
- channel bay remains a four-control grid;
- bottom metadata stacks in a deliberate maker-badge → location → copyright order.

## 13. Empty, Pending, and Error States

The project intentionally surfaces incomplete organiser content.

### Approved pending patterns

| Content type | Current design treatment |
| --- | --- |
| Sponsor | Named `LOGO SLOT` panel. |
| Prize amount | `TBA` / `Amount to be announced`. |
| Rulebook details | Rulebook-status note explaining the pending release. |
| Team member | Pixel avatar, role, and `REVEAL SOON`. |
| Social channel | Non-clickable control with `SOON` marker. |
| Contact configuration | Visible transmission-gateway error. |
| Missing page | `SIGNAL LOST` 404 world with recovery links. |

### 404: Signal Lost

The fallback page preserves the world:

- `ERROR WORLD · SIGNAL LOST` label;
- custom 404 composition with two numeral 4s and the robot mascot;
- concise explanation;
- home and events recovery actions;
- radar-like offline console with sector and status readouts.

The page is intentionally crawlable only as a fallback: metadata disables indexing but permits link following.

## 14. Interaction Specification

### Primary actions

Primary actions use the yellow `PixelButton`:

- ink border;
- 6px pixel shadow;
- short stepped transition;
- subtle shine sweep on hover;
- physical press translation on active;
- secondary variant uses ivory fill.

Keep primary-action wording specific:

- `Register Your Team`;
- `Explore Events`;
- `View full challenge`;
- `Partner With Us`;
- `Send Transmission`.

### Keyboard and pointer support

| Component | Pointer support | Keyboard support |
| --- | --- | --- |
| Navigation | Links, mobile menu button, sound toggle | Native link/button behaviour; menu uses `aria-expanded`. |
| Coverflow | Drag, slide tap/click, previous/next, pagination | Left/Right on carousel; Enter/Space selects focused card. |
| Schedule | Tab click | Arrow keys, Home, End, roving tab focus. |
| FAQ | Click/tap | Native button activation and `aria-expanded`. |
| Poster wall | Whole-card link | Standard link navigation and visible focus. |
| Contact form | Standard fields and submit | Validation focuses first invalid field; statuses use `status` / `alert`. |

### Feedback hierarchy

Use feedback in this order:

1. immediate physical movement or focus;
2. visible state label or status colour;
3. concise text explanation;
4. only then decorative sound or spark effects.

Never rely on hover, sound, colour alone, or animation alone to explain a result.

## 15. Motion System

### Motion character

Motion should feel like a game cartridge or mechanical console:

- stepped easing;
- short, clear shifts;
- occasional blinking LED;
- low-frequency environmental drift;
- no continuous parallax that obscures reading;
- no generic fade-up on every small element.

### Named motion patterns

| Pattern | Use | Notes |
| --- | --- | --- |
| Loader wave | First arrival | Letter-by-letter arc motion; disabled for reduced motion. |
| Route wipe | Internal route change | Twelve stepped bars and a temporary level label. |
| Intersection reveal | Major sections/cards | One-time opacity/translation reveal with staggered delays. |
| World drift | Decorative bulbs, clouds, sparks, moon | Low-amplitude environmental life. |
| Button press | Actions | Physical shadow compression. |
| Click burst | Fine-pointer feedback | Small, brief pixel cluster; nonessential. |
| Console power-up | Footer reveal | Short stepped clipping reveal. |
| Status blink | LEDs / recording / readiness | Use sparingly for live or pending system cues. |

### Reduced motion

At `prefers-reduced-motion: reduce`:

- route wipe, ambient pixels, and click bursts are hidden;
- intersection content is immediately visible;
- transforms and decorative panel translation are neutralised;
- loader letter wave stops;
- hover-based translations are removed where appropriate.

Any new motion must preserve an equivalent reduced-motion state.

## 16. Responsive Design Rules

### Breakpoints in use

| Range | Design intention |
| --- | --- |
| > 1200px | Wide, theatrical presentation with contained content zones and full poster density. |
| 761px–1200px | Tablet/small-desktop compression; navigation and content zones make room for the progress HUD. |
| ≤ 980px | Poster wall reduces to three columns. |
| ≤ 900px | Event mission brief stacks art and facts; rules note moves below the rules panel. |
| ≤ 820px | Contact hero and form zone stack into one column. |
| ≤ 760px | Mobile navigation, compact type, reduced decorative density, touch-stable motion, stacked form fields. |
| ≤ 700px | Poster wall uses two columns. |
| ≤ 420px | Roster reduces to two columns. |
| ≤ 370px | Footer console tightens its interior and channel controls. |

### Mobile rules

On mobile:

- preserve the fixed navigation with a menu control;
- maintain large-enough targets for sound, navigation, schedule, carousel, and form controls;
- keep the scroll HUD available on routes other than the full poster wall;
- stack form fields, event facts, and mission layouts;
- reduce decorative density before reducing information clarity;
- remove hover-only transform behaviour;
- keep display type legible through dedicated size/shadow adjustments;
- allow event facts and contact details to wrap;
- keep hard edges and pixel shadows, scaled proportionally rather than removed.

Do not simply shrink the desktop layout. Recompose it.

## 17. Accessibility Requirements

### Core requirements

- Keep the `lang="en-IN"` document language.
- Use semantic headings in sequence.
- Preserve visible `:focus-visible` outlines: 4px blue outline with offset.
- Use actual buttons for stateful controls and links for navigation.
- Keep controls labelled with text or accessible names.
- Use alt text that identifies the specific event artwork, not generic `image` wording.
- Mark decorative pixel art and glyphs `aria-hidden` where they are not content.
- Respect reduced-motion preferences.
- Keep form errors specific, next to the relevant field, and announced through status/alert roles.
- Maintain readable body text in DM Sans; do not place long prose in Press Start 2P.
- Preserve keyboard operation for schedule tabs and coverflow controls.

### Colour and contrast

The visual identity depends on pastels, so contrast must be checked whenever a new combination is introduced:

- ink text on cream, ivory, yellow, blue, pink, and peach is the default safe pattern;
- tiny pixel labels need particularly strong contrast;
- green/ready and coral/error states need textual labels in addition to hue;
- avoid text over the busy world gradient unless it receives strong shadow, containment, or a dedicated panel.

### Status semantics

Use appropriate live/status semantics:

- `role="progressbar"` for scroll progress;
- `role="status"` for the loader and successful form delivery;
- `role="alert"` for form failure;
- `aria-expanded` for menu and FAQ disclosure;
- `aria-selected`, `role="tablist"`, `role="tab"`, and `role="tabpanel"` for schedule tabs;
- `aria-live="polite"` for selected carousel captions.

## 18. Content Model and Governance

### Source of truth

Editable festival content belongs in `lib/data.ts`:

- `fest`;
- `events`;
- `schedule`;
- `faqs`;
- `sponsors`;
- `prizeCategories`; and
- `teamPlaceholders`.

Site metadata and official contact details belong in `lib/site.ts`.

Do not duplicate event facts inside page components. Event routes, poster cards, carousel slides, schema data, event metadata, and detail pages are all driven from the shared `events` catalogue.

### Event record contract

Each event currently supplies:

| Field | Used for |
| --- | --- |
| `slug` | Static route and links. |
| `level` | World/level label and event order. |
| `title` | Card, carousel, page title, metadata, structured data. |
| `description` | Carousel subtitle, event lede, metadata, structured data. |
| `teamSize` | Carousel facts, detail chip/spec. |
| `difficulty` | Carousel facts, detail chip. |
| `icon` | Detail-page poster badge. |
| `frameColor` | Poster-wall frame color selected from the poster palette. |
| `artwork` | Poster card, carousel, detail image, social metadata. |
| `artworkWidth` / `artworkHeight` | Correct Next.js image sizing and social image metadata. |
| `prizePool` | Cards, carousel, detail facts. |
| `timing` | Detail facts. |
| `duration` | Available content metadata for future use. |
| `format` | Detail facts. |
| `rules` | Ordered `HOW TO PLAY` list. |

### Content-quality rules

- Preserve real dates, names, venue data, team sizes, prize values, and rules exactly as approved.
- Use `TBA`, `Details TBA`, `coming soon`, or an equivalent explicit state if facts are not approved.
- Avoid fake sponsor logos, social URLs, team names, profile photos, payment confirmation, or accommodation guarantees.
- Do not silently harmonise conflicting data. Resolve it with the organising team, then update the source-of-truth data record.
- Event descriptions should be concise and action-oriented because they appear in the carousel and metadata.
- Rule lists should contain actionable, participant-facing statements rather than dense legal text. Link to an official rulebook when available.

### Current data note

The current 17 poster entries intentionally use compact `Details coming soon` values for team format, timing, prize pool, format, and rules. Replace those values only with organiser-approved information.

## 19. SEO, Discovery, and Share Surfaces

### Metadata

The app layout provides:

- canonical base URL from `NEXT_PUBLIC_SITE_URL`, with localhost fallback;
- page-title template;
- organisation, description, category, and keyword metadata;
- Open Graph and Twitter metadata;
- robots directives;
- `en_IN` Open Graph locale.

Each major route provides its own title, description, canonical URL, and social-preview text. Each event route derives metadata from its event record.

### Structured data

The global JSON-LD graph includes:

- `WebSite`;
- `Organization`;
- festival `Event`;
- `ItemList` for current competition arenas; and
- `FAQPage`.

When site data changes, update it through the shared data modules so metadata and structured data stay aligned.

### Manifest and social card

The web manifest uses:

- cream background;
- deep-purple theme colour;
- standalone display;
- RoboFiesta icon.

The generated `/opengraph-image` is a 1200 × 630 pixel-world card with:

- moon;
- sparkle;
- date/venue strip;
- large RoboFiesta wordmark; and
- tagline.

It should remain visually recognisable when the page itself is not visible in a social preview.

## 20. Technical Design Boundaries

### Stack

- Next.js 14 App Router;
- TypeScript;
- React;
- Tailwind utilities in selected interactive components;
- a shared global CSS visual system in `app/globals.css`;
- local event assets under `public/events`;
- Lucide React icons;
- Web Audio API for optional sound;
- Resend HTTP API for contact delivery.

### Styling architecture

The visual system is primarily CSS-first:

- global tokens and component styles live in `app/globals.css`;
- Tailwind config mirrors the palette, pixel spacing, shadows, and fonts;
- layout-specific components use semantic class names;
- the coverflow and loader use Tailwind utility classes where appropriate.

The stylesheet contains earlier base layers and later refinements/overrides. Treat the final `RoboFiesta design tokens and accessible interaction states` section as the current token contract. Add focused component styles rather than introducing broad overrides that accidentally change existing templates.

### Performance boundaries

The design has already made several performance-aware choices:

- poster assets are local and cached for seven days with stale-while-revalidate;
- Next.js image output prefers WebP;
- event coverflow is deferred until near the viewport;
- coverflow uses requestAnimationFrame and ResizeObserver rather than continuous layout work;
- scroll/world updates are batched through requestAnimationFrame;
- some poster entries can use `content-visibility` where supported;
- the loader is skipped on repeat visits;
- route animation is short and disabled for reduced motion.

When extending the experience:

- avoid adding full-screen filters, permanent blur, or high-frequency animation;
- do not move all event images into client-only state;
- keep local art dimensions accurate;
- prefer transforms/opacity for animation;
- avoid repeated DOM measurement inside scroll handlers; and
- preserve the existing direct-route and static-event-page behaviour.

## 21. Implementation Checklist

### Adding or updating an event

1. Add approved art to `public/events`.
2. Record the true asset dimensions.
3. Add or update the `EventRecord` in `lib/data.ts`.
4. Supply a concise description, true team size, difficulty, timing, format, prize state, and rule summary.
5. Confirm the slug is stable before publishing.
6. Check `/events` at desktop, tablet, and mobile poster-grid widths.
7. Check the coverflow image crop and selected caption.
8. Check the detail route directly, including social metadata and the contact-registration link.
9. Update schedule or FAQ only when the same fact is officially confirmed there.
10. Run `npm run build`, `npm run lint`, and `git diff --check`.

### Adding a sponsor

1. Replace only the confirmed slot in `sponsors`.
2. Add a local/approved logo asset.
3. Set accurate alternative text.
4. Check logo legibility in the sponsor bay.
5. Do not fill any remaining slot with fabricated branding.

### Publishing a roster

1. Obtain approved names, roles, photos, and social destinations.
2. Replace placeholder data without changing the role hierarchy unless approved.
3. Provide descriptive alternative text for real portraits.
4. Remove or update the `TEAM REVEAL COMING SOON` state only when the roster is truly ready.

### Updating contact delivery

1. Configure `RESEND_API_KEY`.
2. Configure verified `CONTACT_FROM_EMAIL`.
3. Confirm `CONTACT_TO_EMAIL` or the documented site-contact fallback.
4. Test validation, success, failure, honeypot, and query-prefilled event routes.
5. Never claim delivery based on client-side form submission alone.

## 22. Design Do / Do Not

### Do

- Build new sections as another part of the same pixel world.
- Use cream, pastel, ink outlines, and offset shadows to create tactile hierarchy.
- Keep page titles large and memorable.
- Make states explicit: online, ready, pending, error, TBA.
- Use real event art and correct dimensions.
- Keep body copy readable and content-led.
- Test keyboard, mobile, reduced-motion, direct-route, and console-error paths.
- Make empty content look intentionally staged, not accidentally missing.

### Do not

- Redesign the system into glossy neon cyberpunk, minimalist SaaS, glassmorphism, or a monochrome terminal.
- Add rounded pill components as the default shape language.
- Use soft grey shadows in place of pixel shadows.
- Put long text in Press Start 2P.
- Invent organiser facts, social links, prize amounts, sponsors, payment states, or rulebook specifics.
- Hide critical actions inside novelty controls.
- Add autoplay sound.
- Add motion that makes content unreadable, changes page height unpredictably, or ignores reduced-motion preferences.
- Replace route-level poster art with generic stock photos.
- Create a separate visual language for Events, Contact, or error states.

## 23. Quality Gate

Before handing off a visual or content change, verify:

- the 8-bit pixel-console identity is still visibly continuous across `/`, `/events`, `/events/[slug]`, `/contact`, and the 404 page;
- mobile navigation, focus states, schedule tabs, FAQ, carousel, contact fields, and direct links remain usable;
- page-specific headings and metadata still match shared source data;
- unapproved information remains visibly pending;
- newly added art is crisp, correctly sized, and has useful alt text;
- no layout creates horizontal overflow;
- reduced-motion mode has a complete non-animated equivalent;
- the contact form reports configuration or delivery failures honestly;
- `npm run build` succeeds;
- `npm run lint` succeeds; and
- `git diff --check` is clean.

## 24. File Ownership Guide

| Concern | Primary file(s) |
| --- | --- |
| Global palette, layout, visual components, responsive rules | `app/globals.css` |
| Home-page composition | `app/page.tsx` |
| Event data, schedule, FAQ, sponsors, prizes, roster placeholders | `lib/data.ts` |
| Site identity, contact details, canonical URL | `lib/site.ts` |
| Poster-wall directory | `components/EventsPage.tsx` |
| Event mission brief | `components/EventDetailPage.tsx` |
| Home event carousel | `components/EventCoverflow.tsx` and `components/ui/coverflow-carousel.tsx` |
| Navigation and sound toggle | `components/Navbar.tsx` |
| Background world and scroll HUD | `components/SkyWorld.tsx` |
| Route/reveal/click motion | `components/MotionDirector.tsx` |
| First-visit loader | `components/SiteLoader.tsx` and `components/ui/pixel-arc-loader.tsx` |
| Contact page and form | `components/ContactPage.tsx` and `components/ContactForm.tsx` |
| Contact delivery | `app/api/contact/route.ts` |
| Footer console | `components/SiteFooter.tsx` |
| SEO and schema | `app/layout.tsx`, `components/StructuredData.tsx`, route metadata files |
| Event artwork | `public/events/` |

---

The design succeeds when it feels unmistakably like RoboFiesta: a bright, tactile pixel arena that gives students a clear path from curiosity to participation while staying honest about what is confirmed, what is coming, and how to get help.
