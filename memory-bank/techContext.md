# Tech Context

## Technologies Used
- Frontend: React (functional components with hooks), TypeScript for type safety.
- Build Tool: Vite for fast development and production builds.
- Styling: Tailwind CSS for utility-first classes.
- HTTP Client: Native Fetch API for API requests to Zammad.
- Notifications: react-hot-toast for success/error feedback.
- Testing: Playwright for end-to-end testing.
- Languages: JavaScript/TypeScript, HTML, CSS.

## Development Setup
- IDE: Visual Studio Code.
- Package Manager: npm (or yarn).
- Run Development Server: `npm run dev` (Vite HMR on localhost:5173).
- Build: `npm run build` for production bundle.
- Environment: .env file with VITE_ prefixed vars for Zammad config.
- Testing: `npx playwright test` for e2e.

## Technical Constraints
- Zammad API: Requires token authentication; must handle 401/403 errors gracefully.
- Email Validation: Client-side regex for format; server-side assumed by Zammad.
- Performance: Local user list caching to avoid repeated API calls; debounce search for responsiveness.
- Security: Never expose API token in client bundle; use env vars loaded at build time.
- Compatibility: Modern browsers (ES2020+); no IE support needed.

## Dependencies
- Core: react@^18, @types/react@^18, vite@^5.
- Styling: tailwindcss@^3.4.10, postcss@^8, autoprefixer@^10.
- Notifications: react-hot-toast@^2.
- Dev: @vitejs/plugin-react@^4, typescript@^5, @playwright/test@^1.
- No runtime deps for HTTP (use fetch).
- Management: npm install; lockfile with package-lock.json; no monorepo.

## Tool Usage Patterns
- Building: Vite handles bundling, hot module replacement, and optimization.
- Styling: Tailwind JIT mode for on-demand CSS generation; purge unused styles in prod.
- Testing: Playwright for browser automation; focus on happy path e2e for form submission.
- Deployment: Vite build outputs to dist/; serve statically or via any web server.
- Linting/Formatting: Implicit via VS Code; add ESLint/Prettier if expanded.
