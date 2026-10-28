---
description: 'Use when editing project configuration, package manifests, or build and lint tooling such as package.json, tsconfig, Vite, ESLint, and Prettier configuration.'
applyTo:
  - 'package.json'
  - '*.config.js'
  - '*.config.ts'
  - 'tsconfig*.json'
  - 'components.json'
---

# Configuration Guidelines

- Prefer the project's existing SvelteKit, Vite, TypeScript, ESLint, and Prettier tooling; avoid adding dependencies or scripts without a concrete need.
- Keep configuration changes narrow and consistent with the current module format and tool versions.
- Do not edit generated SvelteKit files under `.svelte-kit/`.
- When changing scripts or tool configuration, run the corresponding project check or lint command to validate it.
