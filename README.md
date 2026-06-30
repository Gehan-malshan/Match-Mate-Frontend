# Match Mate — Frontend

A **Vite + React 19** single-page application for a curated blind-dating event platform. Users discover exclusive social encounters, book tickets through a simulated payment flow, browse the community, and manage their profile. Administrators have a dedicated portal for event CRUD and AI-powered matchmaking.

> **Status:** MVP / Prototype — all data is currently static mock data.  
> **Integration branch:** `dev/pathum/Integration` has backend API wiring (Spring Boot) that is not yet merged into `main`.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Getting Started](#getting-started)
4. [Available Scripts](#available-scripts)
5. [Routing & Pages](#routing--pages)
6. [State Management](#state-management)
7. [Data Layer (Static Mock Data)](#data-layer-static-mock-data)
8. [Booking & Payment Flow](#booking--payment-flow)
9. [Admin Portal](#admin-portal)
10. [Authentication (Planned)](#authentication-planned)
11. [Styling & Theming](#styling--theming)
12. [Design System](#design-system)
13. [API Integration Guide](#api-integration-guide)
14. [Environment Variables](#environment-variables)
15. [Contributing](#contributing)

---

## Tech Stack

| Layer       | Technology                              |
|-------------|-----------------------------------------|
| **Framework** | React 19.2 (JSX, no TypeScript)       |
| **Build Tool** | Vite 8                                |
| **Routing** | react-router-dom 7 + react-router 8     |
| **Styling** | Tailwind CSS v4 + custom CSS modules    |
| **State**   | React Context API (useContext + useState) |
| **Icons**   | Google Material Symbols (Outlined)      |
| **Fonts**   | Libre Caslon Text (display), Hanken Grotesk (body) |
| **Linting** | ESLint 10 + react-hooks + react-refresh |

### Production Dependencies

```json
{
  "react": "^19.2.6",
  "react-dom": "^19.2.6",
  "react-router": "^8.0.1",
  "react-router-dom": "^7.18.0"
}
```

### Dev Dependencies

- `vite` 8 — dev server & bundler
- `@vitejs/plugin-react` 6 — React support (Oxc compiler)
- `@tailwindcss/vite` 4 — Tailwind CSS Vite plugin
- `tailwindcss` 4.3 — utility-first CSS framework
- `eslint` 10 + `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh`

---

## Project Structure

```
match-mate-frontend/
├── index.html                  # SPA entry HTML
├── vite.config.js              # Vite config (React + Tailwind plugins)
├── tailwind.config.js          # Custom design tokens (colors, fonts, spacing)
├── eslint.config.js            # ESLint flat config
├── package.json
├── public/                     # Static assets (currently empty)
├── dist/                       # Production build output
└── src/
    ├── main.jsx                # React entry point (BrowserRouter wrapper)
    ├── App.jsx                 # Root component with all route definitions
    ├── index.css               # Tailwind directives + global styles (scrollbar, grain)
    │
    ├── context/
    │   └── AppStateContext.jsx # Global state provider (events, members, bookTicket)
    │
    ├── data/
    │   ├── Event.js            # Static event data (3 events) + helpers
    │   └── Members.js          # Static member data (9 members) + match data
    │
    ├── components/
    │   ├── UI/                 # Design system primitives
    │   │   ├── Button.jsx      # Polymorphic link/button with variants
    │   │   ├── FilterChip.jsx  # Toggleable filter button
    │   │   ├── FormField.jsx   # Labeled input/select with hints
    │   │   └── UnderlineField.jsx  # Border-bottom style input
    │   │
    │   ├── layout/             # Layout components
    │   │   ├── Navbar.jsx      # Landing page navigation
    │   │   ├── AppNavbar.jsx   # Authenticated app navigation
    │   │   ├── BottomNav.jsx   # Mobile bottom navigation bar
    │   │   ├── Footer.jsx      # Site footer
    │   │   ├── AdminLayout.jsx # Admin sidebar + topbar + Outlet
    │   │   └── AdminSideBar.jsx# Admin navigation sidebar
    │   │
    │   ├── landing/            # Landing page sections
    │   │   ├── Hero.jsx        # Hero section with animated text
    │   │   ├── TrustStats.jsx  # Trust/statistics section
    │   │   ├── PrivacyFeatures.jsx # Anonymity/privacy features
    │   │   ├── HowItWorks.jsx  # How it works steps
    │   │   └── FinalCTA.jsx    # Call-to-action section
    │   │
    │   ├── auth/
    │   │   └── LoginForm.jsx   # Email/password login form
    │   │
    │   ├── event/
    │   │   └── EventCard.jsx   # Event card with image, badge, CTA
    │   │
    │   ├── community/
    │   │   └── MemberCard.jsx  # Member profile card with tags
    │   │
    │   ├── member/
    │   │   ├── InfoCard.jsx    # Member detail information card
    │   │   └── DiscoveryIntentCard.jsx # Member's discovery intention
    │   │
    │   ├── profile/
    │   │   ├── AvatarCard.jsx  # Profile avatar management
    │   │   ├── IntroductionCard.jsx    # Bio/introduction editing
    │   │   ├── LifestyleBlueprintCard.jsx  # Lifestyle traits editing
    │   │   └── SecurityVaultCard.jsx   # Security/privacy settings
    │   │
    │   └── admin/              # Admin portal components
    │       ├── GlassPanel.jsx           # Frosted glass card container
    │       ├── AdminPageHeader.jsx      # Page header with accent text
    │       ├── AdminFormField.jsx       # Admin form field wrapper
    │       ├── EventMetaPanel.jsx       # Event metadata display panel
    │       ├── CapacityPricingBento.jsx # Capacity & pricing bento grid
    │       ├── AttendeeListItem.jsx     # Attendee row for matchmaking
    │       └── MatchCard.jsx            # Match pair card with score
    │
    ├── Pages/                  # Route-level page components
    │   ├── LandingPage.jsx
    │   ├── LoginPage.jsx
    │   ├── RegistrationPage.jsx
    │   ├── EventsPage.jsx
    │   ├── EventDetailsPage.jsx
    │   ├── CommunityPage.jsx
    │   ├── MemberProfilePage.jsx
    │   ├── ProfilePage.jsx
    │   │
    │   ├── checkout/           # Booking & payment journey
    │   │   ├── PaymentProcessingPage.jsx
    │   │   ├── PaymentFailedPage.jsx
    │   │   └── BookingConfirmedPage.jsx
    │   │
    │   └── admin/              # Admin portal pages
    │       ├── AdminEventListPage.jsx
    │       ├── AdminManageEventPage.jsx
    │       └── AdminMatchmakingPage.jsx
    │
    └── styles/                 # Custom CSS modules
        ├── admin.css           # Admin portal styles (1362 lines)
        └── checkout.css        # Payment flow styles (806 lines)
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 18 (LTS recommended)
- **npm** >= 9

### Installation

```bash
# Clone the repository
git clone https://github.com/Gehan-malshan/match-mate-frontend.git
cd match-mate-frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` (default Vite port).

### Production Build

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build locally
```

---

## Available Scripts

| Command             | Description                              |
|---------------------|------------------------------------------|
| `npm run dev`       | Start Vite dev server with HMR           |
| `npm run build`     | Build for production into `dist/`        |
| `npm run preview`   | Serve the production build locally       |
| `npm run lint`      | Run ESLint across the entire codebase    |

---

## Routing & Pages

All routes are defined in `src/App.jsx`. The app uses `react-router-dom` v7 with a `<BrowserRouter>` wrapper in `src/main.jsx`.

### Public Routes

| Path                          | Page Component          | Description |
|-------------------------------|------------------------|-------------|
| `/`                           | `LandingPage`          | Marketing landing page with hero, trust stats, features, how-it-works, CTA |
| `/login`                      | `LoginPage`            | Login form with email/password |
| `/register`                   | `RegistrationPage`     | Two-step registration (identity + questionnaire) |
| `/events`                     | `EventsPage`           | Event listing with category filter chips + date selector |
| `/events/:eventId`            | `EventDetailsPage`     | Full event detail with hero, booking card, map, host info |
| `/community`                  | `CommunityPage`        | Member directory grid with filterable cards |
| `/community/:memberId`        | `MemberProfilePage`    | Individual member profile detail |
| `/profile`                    | `ProfilePage`          | User's own profile (avatar, bio, lifestyle, security) |

### Checkout Journey Routes

| Path                                         | Page Component              | Description |
|----------------------------------------------|-----------------------------|-------------|
| `/events/:eventId/payment-processing`        | `PaymentProcessingPage`     | Simulated payment loading (1750ms timeout) |
| `/events/:eventId/payment-failed`            | `PaymentFailedPage`         | Payment failure with retry logic (max 3) |
| `/events/:eventId/booking-confirmed`         | `BookingConfirmedPage`      | Booking confirmation with ticket card |

### Admin Routes (nested under `AdminLayout`)

| Path                               | Page Component              | Description |
|------------------------------------|-----------------------------|-------------|
| `/admin`                           | redirects to `/admin/events` | Root redirect |
| `/admin/events`                    | `AdminEventListPage`        | Event management table |
| `/admin/events/create`             | `AdminManageEventPage`      | Create new event form |
| `/admin/events/:eventId/edit`      | `AdminManageEventPage`      | Edit existing event form |
| `/admin/events/:eventId/matchmake` | `AdminMatchmakingPage`      | Matchmaking dashboard |
| `/admin/matchmaking`               | Placeholder stub            | Not implemented |
| `/admin/settings`                  | Placeholder stub            | Not implemented |

**Wildcard:** Any unmatched path (`*`) redirects to `/`.

---

## State Management

The app uses **React Context API** — no Redux, Zustand, or external library.

### AppStateContext (`src/context/AppStateContext.jsx`)

Wraps the entire `<App />` in `<AppStateProvider>`. Provides via `useAppState()`:

```jsx
const {
  events,       // Array of event objects
  members,      // Array of member objects
  setEvents,    // Setter for events array
  setMembers,   // Setter for members array
  bookTicket,   // Function(eventId, customerDetails) => { event, member, ticketId }
  getEventById, // Function(eventId) => event | undefined
  getMemberById // Function(memberId) => member | undefined
} = useAppState();
```

**Why Context instead of direct imports:** The booking flow mutates state (decrements `seatsLeft`, increments `registeredCount`, adds a new member). Context ensures every consumer — the Event Details page AND the Admin dashboard — sees the same up-to-date data without a page refresh.

---

## Data Layer (Static Mock Data)

> **Current state:** The entire application runs on hardcoded JavaScript arrays. There are **zero API calls** to a backend.

### Events (`src/data/Event.js`)

Three hardcoded events:

| ID                | Title                  | Category      | Price | Seats | Status       |
|-------------------|------------------------|---------------|-------|-------|--------------|
| `velvet-masquerade` | The Velvet Masquerade | Masquerade    | $120  | 8/40  | Booking Open |
| `crimson-affair`    | The Crimson Affair    | Dinner Date   | $95   | 0/24  | Waitlist     |
| `midnight-garden`   | Midnight Garden       | Outdoor       | $80   | 15/50 | Booking Open |

Each event has: `id`, `title`, `category`, `status`, `statusType` (open/waitlist/closed), `date`, `time`, `location`, `price`, `seatsLeft`, `totalCapacity`, `genderRatio`, `coordinates`, `heroImage`, `mapImage`, `hostName`, `hostImage`, `description` (array of paragraphs), `features` (array of icon/title/description), `preparation` (array of strings), `venueNote`.

### Members (`src/data/Members.js`)

Nine hardcoded member profiles with: `id`, `name`, `online`, `age`, `gender`, `location`, `avatar`, `tags`, `bio`, `occupation`, `occupationIcon`, `education`, `traits`, `discoveryIntent`, `discoveryNote`.

### Matches (`src/data/Members.js — matchesByEvent`)

Pre-configured match data for the `velvet-masquerade` event only:

| Match | Member A   | Member B     | Score | Status    |
|-------|------------|--------------|-------|-----------|
| 1     | Cider_Wit  | Velvet_Lyric | 98%   | suggested |
| 2     | Satin_Veil | Neon_Shadow  | 84%   | suggested |

---

## Booking & Payment Flow

The booking flow is fully simulated client-side with no actual payment processing.

### Flow

1. User clicks "Book Your Secret Ticket" on `EventDetailsPage`
2. Navigated to `/events/:eventId/payment-processing`
3. `PaymentProcessingPage` shows a loading animation with "Processing Payment..."
4. After **1750ms** simulated delay, `bookTicket()` is called on the context
   - Decrements `seatsLeft` by 1 (floored at 0)
   - Increments `registeredCount` by 1
   - Creates a new guest member record with a generated `ticketId`
5. Navigation passes the result via router state to either:
   - `/events/:eventId/booking-confirmed` — shows ticket card with ticket ID
   - `/events/:eventId/payment-failed` — shows error with retry option

### Payment Testing

Developer buttons exist on `PaymentProcessingPage`:
- **Force Success** — skips directly to booking confirmation
- **Force Failure** — navigates to payment failed page

### Retry Logic

`PaymentFailedPage` tracks retry count (max 3 attempts) via router state. After 3 failed attempts, the retry button is disabled.

---

## Admin Portal

The admin portal provides event management and matchmaking functionality. Located under the `/admin` route tree with a sidebar layout (`AdminLayout` + `AdminSideBar`).

### Event Management

- **Event List** (`/admin/events`): Table view of all events with status indicators, registered count, Manage and Matchmaking buttons
- **Create/Edit Event** (`/admin/events/create`, `/admin/events/:eventId/edit`): Form with fields for event name, type, date/time, address, pricing, capacity, gender limits, cover image, special instructions. Currently operates on mock data.

### Matchmaking (`/admin/events/:eventId/matchmake`)

A two-column dashboard:
- **Left — Attendee Pool:** Searchable list of members
- **Right — Alchemical Forge:** "Initiate AI Matchmaking" button that simulates a 1200ms delay then loads pre-configured matches from `matchesByEvent`. Match cards show compatibility score, member avatars, and Confirm/Adjust actions.

> **Note:** All admin functionality operates on in-memory mock data. TODO comments indicate where backend integration is needed.

---

## Authentication (Planned)

**No real authentication is currently implemented.**

- `LoginForm.jsx` collects email/password and logs to console
- `RegistrationPage.jsx` has identity fields + questionnaire but submission only logs to console
- No JWT tokens, no session management, no auth guards, no protected routes
- Admin portal has no authentication barrier

The `dev/pathum/Integration` branch contains work toward Spring Boot backend integration that likely includes authentication, but it has not been merged.

---

## Styling & Theming

### Tailwind CSS v4

Configuration in `tailwind.config.js` with an extensive custom Material Design-inspired theme:

- **Dark mode only:** `darkMode: "class"`, background `#131313`
- **Color palette:** Primary (pink/magenta), Secondary (coral/orange), Tertiary (lavender), Surface (dark neutrals), Error (red)
- **Custom spacing:** `margin-desktop: 64px`, `margin-mobile: 20px`, `gutter: 24px`, `container-max: 1200px`
- **Font families:** `display-lg` (Libre Caslon Text, serif), `body-md`/`body-lg` (Hanken Grotesk, sans-serif)
- **Font sizes:** `display-lg` (64px), `headline-lg` (48px), `headline-md` (32px), `body-md` (16px), `label-sm` (12px)

### Global Styles (`src/index.css`)

- `glass-panel` utility: frosted glass effect with backdrop blur
- `text-gradient` utility: pink-to-magenta gradient text
- `reveal` animation: fade-in + translateY
- Grain overlay texture (fixed position, 3% opacity)
- Custom scrollbar styling

### Custom CSS Modules

- `src/styles/admin.css` (1362 lines) — Admin portal styling (event rows, matchmaking layout, forms)
- `src/styles/checkout.css` (806 lines) — Payment flow styling (processing animation, ticket card, error state)

### Icon System

Google Material Symbols (Outlined) loaded via CDN:
```html
<span class="material-symbols-outlined">icon_name</span>
```

### Google Fonts

Loaded in `index.html`:
- **Libre Caslon Text** (serif, weights 400, 700)
- **Hanken Grotesk** (sans-serif, weights 300, 400, 500, 600, 700)

---

## Design System

### UI Components (`src/components/UI/`)

| Component        | Props                                      | Variants                     |
|------------------|--------------------------------------------|------------------------------|
| `Button`         | `to`, `variant`, `children`, `className`   | `primary`, `outlinePrimary`, `outline` |
| `FilterChip`     | `label`, `active`, `onClick`               | Toggleable active state      |
| `FormField`      | `label`, `name`, `type`, `options`, `hint` | Text input, select dropdown  |
| `UnderlineField` | `label`, `name`, `type`, `options`         | Minimal border-bottom style  |

### Layout Components

| Component        | Description |
|------------------|-------------|
| `Navbar`         | Landing page nav (logo, Home, How it Works, Events, About, Login/Join) |
| `AppNavbar`      | Authenticated app nav (Events, Community, Profile) |
| `BottomNav`      | Mobile bottom navigation bar (Events, Community, Profile) |
| `Footer`         | Site footer with links |
| `AdminLayout`    | Admin sidebar + topbar + `<Outlet />` for nested routes |
| `AdminSideBar`   | Fixed sidebar with navigation items and user profile |

---

## API Integration Guide

When integrating with a real backend (Spring Boot or otherwise), here is every place that needs to be updated:

### 1. Replace Static Data with API Calls

**`src/context/AppStateContext.jsx`**
- Replace `useState(seedEvents)` with an initial fetch from `GET /api/events`
- Replace `useState(seedMembers)` with an initial fetch from `GET /api/members`
- `bookTicket()` should call `POST /api/events/:eventId/book` instead of mutating local state
- `getEventById()`, `getMemberById()` could be API calls or client-side lookups depending on scale

**`src/data/Event.js`** — Keep the helper functions (`getEventById`, `createBlankEvent`, `EVENT_TYPES`, `EVENT_STATUSES`) but remove the static `events` array once the context fetches from API.

**`src/data/Members.js`** — Keep helper functions but remove static data once API is integrated.

### 2. Suggested API Endpoints

| Method | Endpoint                               | Purpose |
|--------|----------------------------------------|---------|
| GET    | `/api/events`                          | List all events |
| GET    | `/api/events/:eventId`                 | Get single event details |
| POST   | `/api/events`                          | Create new event (admin) |
| PUT    | `/api/events/:eventId`                 | Update event (admin) |
| DELETE | `/api/events/:eventId`                 | Delete event (admin) |
| POST   | `/api/events/:eventId/book`            | Book a ticket |
| GET    | `/api/members`                         | List all members |
| GET    | `/api/members/:memberId`               | Get single member profile |
| GET    | `/api/events/:eventId/matches`         | Get AI matchmaking results |
| POST   | `/api/events/:eventId/matches/confirm` | Confirm a match pair |
| POST   | `/api/auth/login`                      | User login |
| POST   | `/api/auth/register`                   | User registration |
| GET    | `/api/profile`                         | Get current user profile |
| PUT    | `/api/profile`                         | Update current user profile |

### 3. Add an HTTP Client

Install a library like `axios` or use the built-in `fetch`:

```bash
npm install axios
```

Create `src/libs/api.js`:
```js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
});

// Request interceptor to attach JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // Redirect to login or refresh token
    }
    return Promise.reject(err);
  }
);

export default api;
```

### 4. Authentication Flow

1. `LoginForm.jsx` and `RegistrationPage.jsx` currently log to console — wire them to `POST /api/auth/login` and `POST /api/auth/register`
2. Store JWT token in `localStorage` or a secure cookie
3. Add route guards using a wrapper component that checks for the token
4. Protect admin routes with role-based access control

### 5. Update State Management

Consider migrating from React Context to a more robust solution as the app grows:
- **Zustand** — lightweight, no boilerplate
- **Redux Toolkit** — if you need middleware, devtools, and more structure
- **React Query / TanStack Query** — for server-state caching, refetching, and loading states

### 6. Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:8080/api
```

All environment variables must be prefixed with `VITE_` to be exposed to the client by Vite.

### 7. Replace Simulated Flows

| Current Simulation                 | Replace With |
|-----------------------------------|--------------|
| `setTimeout(1750ms)` in PaymentProcessingPage | Real API call to `POST /api/events/:eventId/book` |
| `setTimeout(1200ms)` in AdminMatchmakingPage | `GET /api/events/:eventId/matches` (real AI/algorithm) |
| Retry logic via router state       | Server-side retry/error handling |
| Static match data in Members.js    | API-driven match generation |
| Form submissions logging to console | API calls with loading/error states |

### 8. Testing Setup

Add a testing framework (recommended: **Vitest** + **React Testing Library**):

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

Add to `vite.config.js`:
```js
test: {
  environment: "jsdom",
  globals: true,
  setupFiles: "./src/test/setup.js",
}
```

---

## Environment Variables

Currently **none** are required. When integrating with a backend, create `.env`:

```env
VITE_API_URL=http://localhost:8080/api
```

> Vite exposes only variables prefixed with `VITE_` to client code via `import.meta.env.VITE_*`.

---

## Code Conventions

| Convention | Practice |
|------------|----------|
| **File naming** | PascalCase for components/pages (`EventCard.jsx`) |
| **Exports** | Default export for all components |
| **CSS** | Tailwind utility classes in JSX; custom CSS in `src/styles/` for complex pages |
| **State** | React Context for global state; local `useState` for form/UI state |
| **Icons** | Google Material Symbols via `<span class="material-symbols-outlined">` |
| **Routing** | `react-router-dom` with `<Routes>`, `<Route>`, nested routes via `<Outlet>` |
| **Language** | JavaScript (JSX) — no TypeScript |
| **No CSS-in-JS** | Tailwind + plain CSS files only |

---

## Git Branch Strategy

```
main
├── dev/malshan        (most active — current HEAD)
├── dev/shakila        (Admin Portal + Payment/Booking pages)
└── dev/pathum/Integration  (Spring Boot backend integration — NOT merged)
```

Key commits:
1. `a79c22f` — Initiate Project (Vite scaffold)
2. `d239251` — Add Landing Page
3. `f396937` — Add Login and Registration Pages
4. `828a012` — Add Community interface with profile view
5. `6230892` — Add Event Details Page
6. `39ff0c9` — Admin Portal developed
7. `d34ac0a` — Payment and Booking Pages updated
8. `c318e92` — Integrate frontend with Spring Boot backend API (integration branch)

---

## Contributing

1. Create a feature branch from `main`: `git checkout -b dev/your-name/feature-name`
2. Make changes and test with `npm run dev`
3. Run linting: `npm run lint`
4. Create a pull request against `main`
5. Link any related issues in the PR description
