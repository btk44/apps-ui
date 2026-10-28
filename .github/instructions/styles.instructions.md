---
description: "Use when editing CSS, Tailwind styles, theme tokens, or global visual foundations. Covers Tailwind CSS 4 and the project's shared design tokens."
applyTo: 'src/**/*.css'
---

# Styling Guidelines

- Follow the Tailwind CSS 4 setup and existing global conventions in `src/routes/layout.css`.
- Prefer existing semantic theme variables and utility classes over hard-coded colors or one-off values.
- Keep global styles limited to application-wide foundations; prefer component-scoped classes and utilities for local presentation.
- Preserve both light and dark theme behavior when changing shared tokens or foundational styles.
- Keep CSS formatting consistent with the Prettier configuration.
