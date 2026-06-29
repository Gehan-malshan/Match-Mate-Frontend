# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Backend integration

This frontend talks to the Spring Boot API documented in `MatchMate_API_Documentation.pdf` (base path `/api/v1`).

### Environment

Copy `.env.example` to `.env` and set the API base URL:

```
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

The PayHere sandbox SDK is loaded via a `<script>` tag in `index.html`.

### What is wired to the backend

- **Auth** (`/auth/login`, `/auth/register`) via `src/api/auth.js` + `AuthContext`. The cached user's `role` drives `isAdmin` and admin route gating (`AdminRoute`).
- **Events discovery & details** (`/events`, `/events/{id}`, search, etc.) via `src/api/events.js`.
- **Admin event management** (`AdminEventListPage`, `AdminManageEventPage`):
  - List + delete: `GET /events`, `DELETE /events/{id}`.
  - Create / edit: `POST /events/create`, `PUT /events/{id}` (edit uses `GET /events/{id}` to hydrate).
  - Gender limits: `PUT /events/{id}/limits?maleLimit=&femaleLimit=` (admin only).
  - Field mapping between the admin form and the backend DTOs lives in `src/utils/adminEventMapper.js`.
- **Booking + payment checkout** (`EventDetailsPage` → `PaymentProcessingPage` → `BookingConfirmedPage` / `PaymentFailedPage`):
  - `POST /bookings`, `POST /payments/initiate`, PayHere popup, then polls `GET /payments/booking/{id}` (confirmed server-side via `POST /payments/callback`). Orchestrated in `src/utils/paymentFlow.js`.
- **My Bookings** (`/bookings` route, `BookingsPage`): `GET /bookings/my` + `PUT /bookings/{id}/cancel`.
- **Event attendee pool** (in `AdminMatchmakingPage`): `GET /bookings/event/{id}` — live list of who booked.

### Known backend gaps (not connected / faked)

These UI areas have no supporting backend endpoint yet and are clearly marked in-app:

- **Matchmaking / pairing engine** (`AdminMatchmakingPage` right column): no `matchmake` endpoint. The "Initiate AI Matchmaking" action does not persist pairings; a visible notice states this. (Attendee pool on the left *is* live.)
- **Registration questionnaire** (`RegistrationPage`): personality/questionnaire answers are collected client-side only; the backend `register` endpoint stores identity fields only.
- **Password change** and **avatar generation**: no endpoints; attendee avatars are derived placeholders (`ui-avatars.com`).
- **Community / member directory** (`CommunityPage`, `MemberProfilePage`): still backed by `src/data/Members.js` mock data — there is no public members API.
