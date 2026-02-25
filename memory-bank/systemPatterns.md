# System Patterns

## System Architecture
- Frontend: Single-page React application built with Vite for development and bundling.
- Layers: UI (components like TicketForm, EmailSelect), API (zammad.ts module for HTTP requests), Config (env vars for Zammad integration).
- Data Flow: Load users on app init → User selects email in form → Validate and submit → Fetch owner_id → POST ticket → Handle response with toasts.

## Key Technical Decisions
- Vite + React + TypeScript: For fast HMR, type safety, and modern JS/TS support.
- Tailwind CSS: Utility classes for rapid, consistent styling without custom CSS.
- Fetch API: Native, lightweight for API calls; no need for Axios unless auth interceptors required.
- Local caching and debounced search: For user emails to minimize API load and improve UX.
- Env vars: Securely configure Zammad URL, token, defaults via Vite prefixes.

## Design Patterns in Use
- Separation of Concerns: API logic isolated in api/zammad.ts; UI in components.
- Hook-based State Management: useState/useEffect for form state, user list caching.
- TypeScript Interfaces: For API payloads, responses to ensure correctness.
- Debounced Input: For email search to optimize performance.

## Component Relationships
- App.tsx: Root, renders TicketForm.
- TicketForm.tsx: Manages form state, validation, submission; composes EmailSelect for email input.
- EmailSelect.tsx: Handles email selection logic, custom input reveal, local filtering.
- api/zammad.ts: Provides typed functions (getUsers, getMe, createTicket) used by TicketForm on submit.

## Critical Implementation Paths
- User List Fetch: GET /api/v1/users on app load, cache unique emails.
- Owner Resolution: GET /api/v1/users/me before ticket creation.
- Ticket Creation: POST /api/v1/tickets with internal article, guess customer, fixed group/state/tags.
- Error Handling: Catch API errors, display via toasts; validate email format client-side.
