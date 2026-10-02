# GRIT prototype

The active GRIT mobile app uses React, Vite, TypeScript and Tailwind v4. Entry: `src/main.tsx` → `src/App.tsx`. Screens live in `src/pages/<feature>/screens.tsx`, with shared UI in `src/components/AppUI.tsx` and the app frame in `src/components/AppShell.tsx`. It uses the local artwork under `references/` and saves progress in this browser as `grit-fresh-v1`. GRIT Coach is a guided local prototype, not a live AI service. Older `page.tsx` files are inactive legacy work.

React + Vite + TypeScript mobile prototype. Journey: Explore → Experience → Reflect → Decide → Progress. Choices, mission checklist, reflection and path save locally in the current browser. UI lives in TSX components; `index.html` is Vite's document shell only.

```sh
npm ci
npm run dev
npm run typecheck
```

`npm test` checks state flow. `npm run build` writes static output to `dist/`.

## GitHub Pages

Repository `Vernnaa/prototype_GRIT` uses Vite base `/prototype_GRIT/`. In repository **Settings → Pages → Build and deployment**, set **Source: GitHub Actions**. Push to `main` to run `.github/workflows/pages.yml`; open `https://vernnaa.github.io/prototype_GRIT/` after deployment. No backend or server-side routing needed.

Design rules: [DESIGN.md](DESIGN.md). App entry is `src/main.tsx`; active screens live at `src/pages/<feature>/screens.tsx` and shared UI at `src/components/`.
