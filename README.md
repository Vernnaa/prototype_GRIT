# GRIT prototype

React + Vite + TypeScript mobile prototype. Journey: Explore → Experience → Reflect → Decide → Progress. Choices, mission checklist, reflection and path save locally in the current browser. UI lives in TSX components; `index.html` is Vite's document shell only.

```sh
npm ci
npm run dev
npm run typecheck
```

`npm test` checks state flow. `npm run build` writes static output to `dist/`.

## GitHub Pages

Repository `Vernnaa/prototype_GRIT` uses Vite base `/prototype_GRIT/` and hash navigation. In repository **Settings → Pages → Build and deployment**, set **Source: GitHub Actions**. Push to `main` to run `.github/workflows/pages.yml`; open `https://vernnaa.github.io/prototype_GRIT/` after deployment. No backend or server-side routing needed.

Design rules: [DESIGN.md](DESIGN.md). App entry is `src/main.tsx`; feature page entries live at `src/pages/<feature>/page.tsx`, feature-only UI under each page's `components/`, and shared UI at `src/components/`.
