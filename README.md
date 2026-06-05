# Errand Planner

Errand Planner is a Vue 3 application for organizing everyday errands by urgency, due date, priority, completion status, and estimated time. The app is designed to answer the practical questions a user has when they open it:

- What should I do today?
- What is most urgent?
- How much time will I need?
- What have I already completed?

The goal is to make the app feel like a lightweight planning assistant, not just a basic todo list.

## Core Flow

1. The user adds an errand once.
2. The app saves it automatically with localStorage persistence.
3. Active errands are sorted automatically by urgency.
4. The dashboard highlights what needs attention today.
5. The user marks errands as done when handled.
6. Completed errands move to the completed page.
7. Statistics update immediately.

## Features

- Add errands with task, location, priority, due date, estimated time, category, and notes.
- Automatically sort active errands by urgency.
- Filter errands by all, today, high priority, completed, and pending.
- Mark errands as completed.
- Edit or delete errands.
- View completed errands separately.
- See dashboard statistics for totals, due today, completed count, high-priority count, and estimated time needed.
- Persist errands and settings with Pinia persisted state.
- Light and dark theme support.
- Progressive Web App support for mobile installation.
- Offline app shell caching through a service worker.

## Tech Stack

- Vue 3
- Vite
- Vue Router
- Pinia
- pinia-plugin-persistedstate
- Tailwind CSS
- lucide-vue-next
- ESLint
- Web App Manifest
- Service Worker

## Project Setup

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

`npm run serve` is also available as a Vite-compatible alias.

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Lint files:

```bash
npm run lint
```

## NPM Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Starts the Vite development server. |
| `npm run serve` | Alias for the Vite development server. |
| `npm run build` | Builds the production bundle. |
| `npm run preview` | Serves the production build locally. |
| `npm run lint` | Runs ESLint across the project. |

## Pages

The app uses three main pages:

| Page | Route | Purpose |
|---|---|---|
| Dashboard | `/` | Shows stats, today's errands, and the next most urgent errands. |
| Errands | `/errands` | Shows the full filterable errand list. |
| Completed | `/completed` | Shows errands that have already been handled. |

Legacy routes are redirected:

| Old Route | Redirects To |
|---|---|
| `/planner` | `/errands` |
| `/history` | `/completed` |
| `/settings` | `/` |

## Main Components

| Component | Responsibility |
|---|---|
| `AddErrandForm.vue` | Main input form for adding and editing errands. |
| `ErrandCard.vue` | Displays a single errand with priority, due date, location, estimate, and actions. |
| `ErrandList.vue` | Renders a list of errand cards. |
| `StatsPanel.vue` | Shows dashboard metrics. |
| `FilterTabs.vue` | Provides simple errand filters. |
| `BaseButton.vue` | Reusable button component. |
| `BaseBadge.vue` | Reusable badge component. |
| `BaseModal.vue` | Reusable modal component. |

## Errand Data Model

Each errand follows this shape:

```js
{
  id: String,
  title: String,
  location: String,
  category: String,
  priority: String,
  status: String,
  order: Number,
  dueDate: String | null,
  estimatedMinutes: Number,
  notes: String,
  createdAt: String,
  completedAt: String | null,
}
```

Allowed priority values:

```js
'high' | 'medium' | 'low'
```

Allowed category values:

```js
'shopping' | 'finance' | 'health' | 'transport' | 'other'
```

Allowed status values:

```js
'pending' | 'done'
```

## Sorting Rules

Active errands are sorted automatically using this order:

1. Overdue errands
2. Due today
3. High priority
4. Medium priority
5. Low priority
6. No deadline

The sorting logic lives in:

```text
src/utils/priorityUtils.js
```

The store exposes the sorted active list through:

```text
store.pending
store.sortedActive
```

## Filters

The errands page supports these filters:

- All
- Today
- High Priority
- Completed
- Pending

Filter constants are defined in:

```text
src/utils/priorityUtils.js
```

Filtering is handled by the Pinia store method:

```js
store.filteredErrands(filter)
```

## State Management

Shared state is managed with Pinia:

```text
src/stores/errandStore.js
src/stores/settingsStore.js
```

The errand store handles:

- Adding errands
- Updating errands
- Completing errands
- Deleting errands
- Filtering errands
- Computing active and completed lists
- Computing overdue, due-today, high-priority, and estimated-time values

The settings store handles:

- Theme state
- Default priority
- Default category

Both stores use `pinia-plugin-persistedstate`, so data is saved in localStorage automatically.

## Folder Structure

```text
src/
  assets/
    main.css
  components/
    errand/
      AddErrandForm.vue
      ErrandCard.vue
      ErrandList.vue
      FilterTabs.vue
      StatsPanel.vue
    layout/
      AppHeader.vue
      AppNav.vue
    ui/
      BaseBadge.vue
      BaseButton.vue
      BaseModal.vue
  composables/
    useErrands.js
    usePriority.js
  layouts/
    DefaultLayout.vue
  pages/
    CompletedPage.vue
    DashboardPage.vue
    ErrandsPage.vue
  router/
    index.js
  stores/
    errandStore.js
    settingsStore.js
  utils/
    priorityUtils.js
  App.vue
  main.js
```

## User Experience Notes

The intended experience is:

```text
User opens app
  -> Dashboard shows today's errands
  -> User adds a new errand
  -> App saves automatically
  -> App places the errand in the right urgency position
  -> User marks it done
  -> Completed page and stats update immediately
```

Errands should be quick to scan. A card should clearly show:

- Task name
- Location
- Priority
- Due status
- Estimated time
- Category
- Completion status
- Actions

## Development Notes

- Use Composition API with `<script setup>`.
- Keep shared state in Pinia.
- Keep local UI state, such as modal open state, inside the page component.
- Keep priority, category, status, filter, and sorting constants in `priorityUtils.js`.
- Use `@/` imports for files under `src`.
- Use Tailwind classes for styling.
- Keep base UI components store-agnostic.

## Verification Checklist

Before handing off changes, run:

```bash
npm run lint
npm run build
```

Then verify:

- `/` renders the dashboard.
- `/errands` renders the filterable errand list.
- `/completed` renders completed errands.
- Adding an errand updates stats and persists after refresh.
- Marking an errand done moves it out of active errands.
- Filters return the expected errands.

## Production Build

Build output is generated in:

```text
dist/
```

The folder is ignored by git through `.gitignore`.

## Progressive Web App

The app is installable on supported mobile browsers because it includes:

- `public/manifest.webmanifest`
- `public/sw.js`
- `public/icon-192.png`
- `public/icon-512.png`
- `public/maskable-icon-512.png`
- `public/apple-touch-icon.png`
- `public/pwa-icon.svg`
- `public/maskable-icon.svg`
- Mobile app metadata in `index.html`
- Service worker registration in `src/registerServiceWorker.js`

The service worker is registered only for production builds. This avoids stale caching during local development.

To test the PWA locally:

```bash
npm run build
npm run preview
```

Then open the preview URL on a browser that supports PWA installation.

On Android Chrome:

1. Open the deployed site or local preview URL.
2. Open the browser menu.
3. Choose **Install app** or **Add to Home screen**.

On iPhone Safari:

1. Open the deployed site.
2. Tap the share button.
3. Choose **Add to Home Screen**.

For the best mobile install experience, deploy the app over HTTPS. Service workers and PWA installation require a secure context, except for localhost during development.
