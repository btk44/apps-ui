---
description: 'Use when editing SvelteKit server routes, form actions, load functions, or .server.ts modules. Covers server boundaries, request validation, and error handling.'
applyTo:
  - 'src/routes/**/*.server.ts'
  - 'src/lib/**/*.server.ts'
---

# SvelteKit Server Guidelines

- Keep server-only logic in `+page.server.ts`, other `*.server.ts` route files, or `*.server.ts` library modules; do not import these into client components.
- Type route loads and actions with SvelteKit-generated types such as `PageServerLoad` and `Actions` where applicable.
- Treat form data and URL parameters as untrusted input. Validate required values, numeric ranges, dates, and collections before passing them to application services.
- Preserve SvelteKit's expected action/load response shapes and use framework error/failure helpers when appropriate; do not turn failures into success-shaped fallback data.
- Keep service responsibilities in the feature's server module rather than embedding data access or business rules in route handlers.
