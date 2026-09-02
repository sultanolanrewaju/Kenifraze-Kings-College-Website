# Kenifraze Kings College — Admin Panel

A drop-in React admin panel: Tailwind CSS for styling, Lucide for icons, and
TanStack Query v5 for all server state (no Redux/Zustand). Built to run
standalone or be merged into an existing Vite/CRA app.

## File structure

```
src/
  api/                 fetch() helpers, one file per resource
    client.js          shared request wrapper (auth header, JSON/FormData, errors)
    instructors.js
    events.js
    academics.js
    donators.js
    contact.js
    dashboard.js
  hooks/               useQuery / useMutation wrappers, one file per resource
    useInstructors.js
    useEvents.js
    useAcademics.js
    useDonators.js
    useContact.js
    useDashboard.js
  lib/
    queryClient.js     QueryClient singleton (defaults: 1min staleTime, no refetch-on-focus)
    queryKeys.js        central registry of query keys used by hooks + invalidations
  components/
    layout/
      Sidebar.jsx       left nav, collapsible on mobile (slide-in + scrim)
      Header.jsx        admin profile + quick stats pulled from useDashboardSummary
      AdminLayout.jsx   shell: sidebar + header + content outlet, handles mobile nav state
    ui/
      Button.jsx        primary/gold/outline/danger/ghost variants, built-in loading spinner
      Modal.jsx         accessible dialog (Esc to close, focus trap via overflow lock)
      StatCard.jsx       dashboard summary card
      FileDrop.jsx        styled file/image input, image preview
      EmptyState.jsx      empty-list placeholder with optional action
  pages/
    Dashboard.jsx        stat cards, quick actions, recent activity feed
    Instructors.jsx      add-instructor modal + grid, edit/delete placeholders
    Events.jsx           post-event modal + grid, edit/delete placeholders
    Academics.jsx         add-post modal + table, edit/delete placeholders
    Donators.jsx           read-only donations table
    ContactSettings.jsx     address/email/phones/socials form with Save Changes mutation
  App.jsx                 QueryClientProvider + simple page-switcher (no router dependency)
  main.jsx                 Vite entry point
  index.css                Tailwind directives + font imports + view-transition keyframes
tailwind.config.js          design tokens (ink navy, gold, parchment, brick, forest)
postcss.config.js
package.json
```

## Wiring into an existing app

- **Already using react-router?** Swap the `PAGES` object + `useState` in
  `App.jsx` for `<Route>` elements — every page component takes no required
  props beyond the optional `onNavigate` callback used for dashboard shortcuts.
- **Already have a QueryClientProvider at the root?** Delete the one in
  `App.jsx` and import `queryClient` from `src/lib/queryClient.js` into your
  existing provider, or just re-use your existing client and drop `lib/queryClient.js`.
- **Auth:** `api/client.js` reads a bearer token from
  `localStorage.getItem("kkc_admin_token")`. Point this at your real auth
  storage (context, cookie, etc).

## Backend contract (Express/Multer assumptions)

All create/update forms with file inputs send **`multipart/form-data`** via
`FormData` — `client.js` skips the `Content-Type` header for these so the
browser sets the correct multipart boundary, matching a standard
`multer.single('image')` or `multer.single('attachment')` middleware.

| Resource    | Endpoints                                                              |
|-------------|--------------------------------------------------------------------------|
| Dashboard   | `GET /dashboard/summary` → `{ totalInstructors, totalDonators, totalSiteVisits, recentActivity: [{id, message, actor, timeAgo}] }` |
| Instructors | `GET/POST /instructors`, `PATCH/DELETE /instructors/:id`                |
| Events      | `GET/POST /events`, `PATCH/DELETE /events/:id`                          |
| Academics   | `GET/POST /academics`, `PATCH/DELETE /academics/:id`                    |
| Donators    | `GET /donators` (read-only)                                             |
| Contact     | `GET /settings/contact`, `PATCH /settings/contact`                      |

Set `VITE_API_BASE_URL` in a `.env` file to point at your API (defaults to `/api`).

## Setup

```bash
npm install
npm run dev
```

Add your school's fonts/logo, then connect `api/*.js` to your real endpoints —
every page already renders loading, empty, and error states, so no other
plumbing is required.
