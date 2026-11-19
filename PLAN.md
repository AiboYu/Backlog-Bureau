# Backlog Bureau — Project Plan

> A digital game investigation bureau. Discover games, compare prices, analyze
> discounts, manage a watchlist, and plan purchases within a budget.

**Course:** CSE 2004 Web Development — Final Project
**Grading criteria:** Originality · Excellent visual design · Meaningful interactivity · External API usage

---

## 1. Concept & Visual Identity

**"Classified Case Files"** — a fictional investigative agency that treats games as _open
cases_. Every feature inherits bureau vocabulary:

| App concept      | Bureau vocabulary       |
| ---------------- | ----------------------- |
| Game detail page | **Game Dossier**        |
| Watchlist        | **Surveillance List**   |
| Budget planner   | **Field Budget**        |
| Analytics        | **Intelligence Report** |
| Game comparison  | **Game Face-Off**       |
| Search / browse  | **Open a Case**         |
| Live deals       | **Deals Radar**         |

### Design system (strict tokens)

- **Palette** — deep ink base `#0E0F13`, warm paper `#F4EFE6`, phosphor signal teal
  `#2DD4BF` (primary action), caution amber `#F5A524` (price drops / on-sale), stamp red
  `#E5484D` (savings / alerts).
- **Typography** — IBM Plex Mono / JetBrains Mono for data (prices, IDs, labels), Space
  Grotesk / IBM Plex Sans for UI and headings, a condensed display face for page titles.
- **Signature motifs** — generated `FILE No.` per game (`CASE-1091500`), rubber-stamp
  status badges (`VERIFIED`, `ON SALE`, `SURVEILLANCE`, `CLEARED`), redacted-bar skeletons
  for loading states, ledger/grid lines, a faint `CLASSIFIED` watermark.
- **Motion** — stamp-slam badges, dossier cards sliding open, subtle scanline/tickertape on
  the radar page, CRT flicker on page transitions.
- **Anti-generic rule** — never the default shadcn look: one border treatment (1px ink
  lines at ~8% white), one spacing scale, monospace for _all_ data values.

---

## 2. Technology Stack

| Concern              | Choice                                     |
| -------------------- | ------------------------------------------ |
| Framework            | React 19 (via Vite)                        |
| Language             | TypeScript (strict)                        |
| Build tool           | Vite                                       |
| Styling              | Tailwind CSS v4 + shadcn/ui                |
| Animation            | Motion (Framer Motion)                     |
| Charts               | Recharts                                   |
| Icons                | Lucide React                               |
| Routing              | React Router (HashRouter for GitHub Pages) |
| Server state         | TanStack Query                             |
| Client persistence   | localStorage                               |
| Testing              | Vitest + React Testing Library             |
| Linting / formatting | ESLint + Prettier                          |

All dependencies pinned to **latest stable, mutually compatible versions**. No backend,
no auth, no database.

---

## 3. Architecture

### Feature-based structure (hybrid with cross-cutting layers)

```
src/
  app/                    # app shell: router, providers, root layout
    providers.tsx         # QueryClientProvider, ThemeProvider
    router.tsx            # route definitions
  components/
    ui/                   # shadcn primitives (button, card, badge, input, ...)
    layout/               # app shell: sidebar, header, mobile nav
    bureau/               # domain components: StampBadge, FileNumber, RedactedSkeleton
  features/
    home/                 # Headquarters landing
    discover/             # Open a Case (search + filters)
    game/                 # Game Dossier (detail)
    deals/                # Deals Radar (live deals)
    watchlist/            # Surveillance List
    budget/               # Field Budget
    faceoff/              # Game Face-Off (head-to-head comparison)
    intel/                # Intelligence Report (analytics)
      pages/              # route-level components
      components/         # feature-scoped components
      hooks/              # feature-scoped TanStack Query hooks
  services/
    api/
      client.ts           # fetch wrapper (User-Agent, error normalization)
      cheapshark.ts       # typed endpoint functions
      queryKeys.ts        # centralized TanStack Query keys
  hooks/                  # global shared hooks
  lib/
    utils.ts              # cn(), formatPrice, formatDate, buildFileNumber
  types/
    cheapshark.ts         # API response types
    domain.ts             # app-domain types (WatchlistItem, Budget, FaceOff, ...)
  config/
    site.ts               # app constants, API base URL
  test/
    setup.ts              # Vitest + jest-dom setup
    utils.tsx             # render helpers
  styles/
    globals.css           # Tailwind + design tokens
```

### Guiding rules

1. **UI vs pages vs services vs hooks vs types** are separated; feature folders own their
   page/component/hook code; shared code lives in the cross-cutting layers.
2. **TanStack Query** owns every API request — caching, loading states, error handling,
   retries. No `useEffect`-based fetching.
3. **Strict TypeScript** everywhere; reusable components are fully typed.
4. **Consistent design system** — all styling flows from tokens + `components/ui` + `components/bureau`.
5. **Performance** — route-level code splitting, query caching, memoized selectors,
   minimal re-renders, no layout thrash from animations.
6. **Responsive + accessible** — mobile nav, focus states, `aria` on interactive charts,
   keyboard navigability, reduced-motion support.

---

## 4. Page Structure (HashRouter)

| Route        | Page                | Purpose                                                             |
| ------------ | ------------------- | ------------------------------------------------------------------- |
| `/`          | Headquarters        | Hero, quick-entry cards, active-case summary, featured deals        |
| `/discover`  | Open a Case         | Search + filter deals, results grid                                 |
| `/game/:id`  | Game Dossier        | Full case file: price comparison, ratings, cheapest-ever, watchlist |
| `/deals`     | Deals Radar         | Sortable/filterable live-deals feed                                 |
| `/watchlist` | Surveillance List   | Persisted watchlist, price targets, savings                         |
| `/budget`    | Field Budget        | Budget allocation across watchlist games                            |
| `/faceoff`   | Game Face-Off       | Head-to-head comparison with a weighted verdict                     |
| `/intel`     | Intelligence Report | Aggregated analytics from user data                                 |

---

## 5. Core Features

1. **Open a Case (Discover)** — search games by title; filter deals by max price, on-sale,
   store, minimum Metacritic.
2. **Game Dossier** — store price-comparison bar chart, current vs. cheapest-ever, ratings,
   savings, deep-link to purchase.
3. **Surveillance List (Watchlist)** — localStorage-persisted; per-game price targets with
   "distance to target" and hit detection.
4. **Deals Radar** — sortable/filterable live deals (biggest savings, lowest price,
   dealRating, Metacritic).
5. **Game Face-Off** _(core)_ — pick two games, side-by-side comparison across price,
   savings, ratings, deal quality; weighted scoring renders a **verdict**. Animated
   "vs." transition.
6. **Field Budget** — set a budget, assign priorities, app computes affordable combinations.
7. **Intelligence Report** — aggregate potential savings, best discount tracked, spending
   summary (Recharts).
8. **Personal price history** — snapshot cheapest price per visit → local time-series chart
   (CheapShark has no historical endpoint; the app builds its own).

---

## 6. Data Layer — CheapShark API

Base URL: `https://www.cheapshark.com/api/1.0` — **HTTPS + CORS `*`**, no key.

| Endpoint                                      | Use                                                                                 |
| --------------------------------------------- | ----------------------------------------------------------------------------------- |
| `GET /stores`                                 | store name/logo resolution                                                          |
| `GET /games?title=&limit=`                    | search                                                                              |
| `GET /games?id=`                              | game info, `cheapestPriceEver`, per-store current deals                             |
| `GET /deals?`                                 | live deals with filters (`upperPrice`, `onSale`, `storeID`, `metacritic`, `sortBy`) |
| `https://www.cheapshark.com/redirect?dealID=` | purchase deep-link                                                                  |

**Known constraints (verified live):**

- Cloudflare protection requires a _descriptive User-Agent_ (browsers send one automatically).
- Store image paths are relative → prefix `https://www.cheapshark.com`.
- No historical price timeline → mitigated by the local price-history feature.
- Metacritic / Steam ratings may be absent → render "N/A" gracefully.
- `dealID` is URL-encoded → `decodeURIComponent` before redirect.

---

## 7. Development Plan

- **Phase 0 — Scaffold (this phase):** Vite + React + TS, Tailwind + shadcn/ui, all
  dependencies, feature-based structure, config files, testing infra, GitHub Pages base
  config. _Verify: install, dev server, production build, lint, test._
- **Phase 1 — Design system:** tokens, base components, layout shell, bureau branding.
- **Phase 2 — Data layer:** typed API client, query hooks, caching, persistence.
- **Phase 3 — Core pages:** Discover + Game Dossier (charts).
- **Phase 4 — Interactive features:** Watchlist, Deals Radar, Budget, Game Face-Off.
- **Phase 5 — Analytics + history:** Intelligence Report, price-history snapshots.
- **Phase 6 — Polish & deploy:** motion, responsive, a11y, GitHub Pages deploy, device test.

---

## 8. GitHub Pages Deployment

- Vite `base: './'` (relative) + **HashRouter** → no server-side 404 handling needed.
- Deploy via GitHub Actions (build → upload `dist/`) or `gh-pages` branch.

## 9. Testing Strategy

- **Unit** — utilities (`formatPrice`, `buildFileNumber`, budget calculations), API client
  (mocked `fetch`).
- **Component** — `components/bureau` + `components/ui` render tests, feature components
  with mocked query hooks.
- **Integration** — feature pages with MSW-mocked CheapShark responses (added in Phase 2+).
- Coverage target: meaningful paths, not vanity metrics.

## 10. Risks & Mitigations

- **Cloudflare / User-Agent** → verify first browser call in Phase 2; friendly "signal lost"
  error state; light query caching.
- **Relative image paths** → `normalizeImageUrl` helper.
- **Missing ratings** → "N/A" rendering, never a broken `0`.
- **GitHub Pages routing** → HashRouter + relative base = zero-config.
