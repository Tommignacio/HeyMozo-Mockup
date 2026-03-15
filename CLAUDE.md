# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**HeyMozo** — a UI mockup for a restaurant management app. It simulates two user roles:
- **Cliente** (customer): phone-style UI to call the waiter, view the menu, or request the bill/payment.
- **Mozo** (waiter): dashboard to manage active alerts and table statuses.

## Commands

```bash
npm run dev       # Start dev server (Vite HMR)
npm run build     # Production build
npm run lint      # ESLint
npm run preview   # Preview production build
```

No test suite is configured.

## Stack

- **React 19** (JSX, no TypeScript)
- **Vite 8** with `@vitejs/plugin-react-swc`
- **Tailwind CSS 4** via `@tailwindcss/vite`
- **React Router 7** (`BrowserRouter`)
- **HeroUI** (beta) — partially adopted, not yet widely used

## Architecture

### Routing (`src/App.jsx`)

```
/            → redirect to /cliente
/cliente     → ClientePage
/cliente/menu → MenuPage
/mozo/*      → MozoLayout (waiter dashboard)
```

### State management

All table state lives in `MozoLayout` and is passed as props to child pages. There is no global state or context — prop drilling is intentional for this mockup scope.

Mesa state machines:
- **Billing alerts** (mesa 1 & 2): `PENDING → PAID → GONE`
- **Order flow** (mesa 4): `NEW_ORDER → COOKING → OCCUPIED → GONE`
- **Mesa release** (mesa 3, 5): `released: false → true`

Both `ActiveAlertsPage` and `MisMesasPage` receive the same shared state so they stay in sync.

### View layers

| Layer | File | Purpose |
|---|---|---|
| Shell | `src/pages/MozoLayout.jsx` | Tab state, shared mesa state, layout (Sidebar + Header + BottomNav) |
| Alerts tab | `src/pages/ActiveAlertsPage.jsx` | Alert cards list + modals for billing/order actions |
| Tables tab | `src/pages/MisMesasPage.jsx` | Grid of mesa cards + inline popups (timeline + confirm release) |
| Customer | `src/pages/ClientePage.jsx` | Wrapped in `<Phone>` shell, action buttons, PayModal |
| Menu | `src/pages/MenuPage.jsx` | Reads from `src/data/menuItems.js` |

### Styling conventions

- **Tailwind utility classes** for layout and responsive behavior.
- **`src/styles/heymozo.css`** for named CSS classes (`.alert-card`, `.modal-overlay`, `.btn-blue`, etc.) — imported globally via `App.jsx`.
- **`src/index.css`** for Tailwind base directives.
- Dark theme throughout: primary background `#1c1c1e`, card background `#2c2c2e`.
- Alert/mesa variant colors are centralized in each component via plain objects (e.g., `variantBg`, `variantHeaderColor`).

### Component conventions

- Icons are inline SVGs defined as constants inside component files (no icon library).
- Modals rendered inline within the page component via conditional rendering, not portals.
- The `<Phone>` wrapper (`src/components/Phone.jsx`) and `<StatusBar>` are used only on the Cliente side to simulate a mobile device frame.
- `AlertCard` accepts a `variant` prop that drives the header color; `dimmed` prop reduces opacity for deprioritized cards.

### Static data

`src/data/menuItems.js` exports `menuCategories` — the only data file. All mesa/alert state is hardcoded in component files (this is a mockup, no backend).


### Consideraciones

- Nunca hagas modificaciones en la rama main. 
- No Commit sin preguntarme antes.
- No hagas build en cada cambio.