---
description: 'Use when creating or editing Svelte components and SvelteKit pages. Covers Svelte 5 runes, component conventions, accessibility, and UI behavior.'
applyTo: 'src/**/*.svelte'
---

# Svelte Guidelines

- Use Svelte 5 runes (`$state`, `$derived`, `$props`, and `$bindable`) for reactive component state, consistent with nearby components.
- Keep components focused. Reuse components from `src/lib/components/` and the existing `src/lib/components/ui/` primitives rather than duplicating UI behavior.
- Treat components under `src/lib/components/ui/` as shadcn-svelte generated/installed code: do not modify them. Compose or wrap these components elsewhere when customization is needed.
- Order and group imports consistently: framework and third-party imports first, then `$lib` aliases, then relative imports; keep type-only imports clearly grouped with their related imports and sort imports within groups.
- Keep script declarations in consistent groups and order: constants, ordinary variables, reactive state, derived state, helper functions, event handlers, then lifecycle hooks. Keep related declarations together and preserve any ordering required by dependencies.
- Preserve semantic HTML, keyboard interaction, accessible names, and visible focus behavior when building or changing controls.
- Keep layout responsive and use the existing Tailwind utility conventions and theme tokens.
- Whenever adding a page or UI control that needs user-facing text, add the text to the corresponding feature's `labels.ts` file under the matching section, then use that label in the UI. This includes labels, placeholders, button text, and accessible names; do not hard-code these strings in the component.
- Preserve form names, action URLs, bindings, and event behavior when changing SvelteKit forms.
