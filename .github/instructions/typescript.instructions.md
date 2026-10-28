---
description: 'Use when creating or editing TypeScript modules, models, helpers, and client-side application logic. Covers strict typing, imports, and feature organization.'
applyTo: 'src/**/*.ts'
---

# TypeScript Guidelines

- Keep code compatible with the project's strict TypeScript configuration; prefer explicit domain types and narrow types over `any` or unsafe casts.
- Treat files under `src/lib/components/ui/` as shadcn-svelte generated/installed code: do not modify them. Compose or wrap these components elsewhere when customization is needed.
- Reuse existing models and helpers under `src/lib/` before defining duplicate shapes or utility functions.
- Organize feature-specific code under the matching `src/lib/apps/<feature>/` folder, keeping models, labels, configuration, and services in their established locations.
- Order and group imports consistently: framework and third-party imports first, then `$lib` aliases, then relative imports; keep type-only imports clearly grouped with their related imports and sort imports within groups.
- Keep declarations consistently grouped and ordered: constants, ordinary variables, stateful variables, helper functions, then event handlers. Keep related declarations together and preserve any ordering required by dependencies.
- Use the `$lib` alias for library imports and follow the quote, tabs, and trailing-comma conventions defined by Prettier.
- Keep browser-only APIs out of server modules and server-only APIs out of browser-facing modules.
