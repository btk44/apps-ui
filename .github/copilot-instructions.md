# Project Guidelines

## Stack and Structure

- This is a SvelteKit application using Svelte 5, TypeScript, Tailwind CSS 4, and Vite.
- Route pages and server load/actions live under `src/routes/`; reusable app logic, models, and components live under `src/lib/`.
- Keep server-only code in `.server.ts` modules or SvelteKit server route files. Import shared code through the existing `$lib` alias.
- Follow the existing feature organization under `src/lib/apps/` and reuse shared components before adding new ones.

## Working Practices

- Inspect neighboring code and preserve its established behavior and conventions. Make focused changes; do not silently replace mock data or introduce a new backend or dependency.
- Keep TypeScript strict and respect the existing SvelteKit, ESLint, and Prettier configuration. Do not add lint suppressions or broad error fallbacks to hide problems.
- For UI changes, preserve accessibility, responsive behavior, existing theme tokens, and the app's established labels/localization patterns.
- Update relevant documentation when commands, setup, or user-facing behavior changes.

## Validation

- Run `npm run check` for Svelte and TypeScript diagnostics.
- Run `npm run lint` for Prettier and ESLint.
- Run `npm run build` when changes affect production behavior or build configuration.
- There is no configured test script; do not claim tests were run unless a test runner is added and used.


