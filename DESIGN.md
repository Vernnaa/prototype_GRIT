# GRIT — From Dream to Direction

## Current app entry (React + Tailwind v4)

The active prototype now starts from `src/main.tsx` → `src/FreshApp.tsx` and `src/style.css`. `src/content.ts` contains the new fields, missions and ten questions; `src/model.ts` owns local state under `grit-fresh-v1`. The earlier `src/App.tsx` and related pages remain in the repository as inactive legacy work. `references/screen/references_screen.jpeg` is the whole-app visual guide; `references/screen/screen-1.png` shows detail for the first four screens. Mascot art is imported directly from `references/maskot/`. Brand colors for the active app are exactly `#172033`, `#B7F34A`, `#7C5CFC`, `#F7F7F2`, `#FFFFFF`, and `#10141F`. Keep Vite's `/prototype_GRIT/` base for GitHub Pages.

## Purpose

Mobile-first, interactive career exploration prototype for students aged 15–21. Guide users through **Explore → Experience → Reflect → Decide → Progress**. Never claim one perfect career or require a career decision before exploration. Each screen offers one clear next action.

## Design tokens

| Token | Hex | Use |
| --- | --- | --- |
| Navy | `#172033` | Primary text, navigation, dark CTAs and splash |
| Lime | `#B7F34A` | Primary CTA, selected state, progress, highlights |
| Purple | `#7C5CFC` | Discovery accents and special achievements |
| Off-white | `#F7F7F2` | Screen background |
| White | `#FFFFFF` | Content surfaces |
| Black | `#10141F` | Secondary dark text when needed |

Derived muted text, borders and tracks use transparent navy; no new accent colors. Navy with white text and lime with navy text are preferred high-contrast pairs. Never place small white text on lime.

## Type and layout

- Font: **Manrope**, weights 400/500/600/700/800; system sans-serif fallback. Major headings 800, section titles 700, controls 600–700, body 400–500. Use compact line height and slightly tight tracking on headings.
- 8px spacing rhythm, with 16–24px horizontal page margins. Minimum touch target 44px. Container radius 18–20px; inner controls 10–14px. Use soft navy-tinted shadow only where elevation helps hierarchy.
- Layout shows phone UI only: centered phone frame on desktop, edge-to-edge on mobile. No explanatory copy or marketing panel beside device. Keep actions and bottom navigation reachable. Show pressed, selected and keyboard focus states; respect reduced-motion preference.
- Onboarding (`splash` → `welcome` → `start` → `questions`) follows `references/screen/screen-1.png`: white screens with deep navy `#062B49`, vivid lime `#C8FF00`, restrained purple illustration details, pill CTAs, and large transparent mascot art from `references/maskot/`. The splash is navy. Quiz progress reflects the three actual question groups, not the mockup's 10-question label.
- React + Vite + TypeScript is active app in `src/`. `App.tsx` handles route/state coordination; `Layout.tsx` owns phone chrome; `components/` contains shared UI; each feature routes through `pages/<feature>/page.tsx`, with feature-specific UI under its local `components/`. `state.ts` owns reducer/persistence and `data.ts` typed prototype content. Route via `location.hash` for GitHub Pages. `index.html` remains Vite's minimal document shell; all app UI is TSX.

## Components and navigation

- Primary button: lime background, navy text. Secondary: navy outline and navy text. Dark: navy with white text. Selected cards: lime border and subtle lime tint.
- White cards carry concise content; purple denotes exploration, never replaces lime as selection/CTA. Icons have consistent stroke and explanatory labels.
- Bottom navigation: **Home · Explore · Missions · My Path · Profile**. Active item visibly marked. Detail flows provide a back action.
- Gritty appears strategically at welcome, exploration summary, mission encouragement and achievement, not on every screen. Reuse existing SVG until bespoke illustrations exist.
- Feature page entries: `onboarding`, `explore`, `missions`, `reflection`, `path`, `home`, `progress`, `profile`. Shared elements stay in `src/components/`; do not duplicate them inside feature folders.

## Experience and content

- Starting points: “I have a dream”, “I have a few ideas”, “I have no idea”. All enter the same journey; selections influence suggested next steps, not access.
- Exploration captures interests, strengths and values. Profile and suggestions reflect actual selections. Match labels are exploratory, not fabricated certainty or diagnosis.
- Completing a mission leads to reflection, then several possible directions and an editable path. Keep one next action prominent throughout.
- Copy: brief, encouraging English. Use “Worth exploring”, “You might enjoy…” and “Your path can change”; avoid “perfect career”, “you should become…”, and job-readiness claims on new screens.

## Prototype constraints

- Runs as Vite-built static files on GitHub Pages (`/prototype_GRIT/`); persist demo state with versioned `localStorage`. Login, payments, uploads and AI must not imply real server-backed functionality when simulated. GitHub Actions builds and deploys `dist`.
- Verify the no-idea, dream and several-ideas starting points, mission → reflection → path, refresh persistence, navigation/back, keyboard focus, and small-screen scrolling before calling the redesign complete.
