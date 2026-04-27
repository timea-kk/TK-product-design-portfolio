---
name: visual-regression
description: ALWAYS run this automatically after any visual change — layout, spacing, sizing, color, or component edits. Never wait for the user to ask. Run tests, report results, and offer to update baselines if the change was intentional.
allowed-tools: Bash
---

Run the visual regression tests against the saved baselines:

```bash
npm run test:visual
```

If tests **pass**: no visual regressions detected. Report that clearly.

If tests **fail**: visual differences were detected.
- Report which snapshots failed.
- Stop. Do NOT run `npm run test:visual:update`.
- Wait for the user to explicitly say "update the baselines" or "yes update" before touching them.
- Only then run `npm run test:visual:update`.

Never update baselines proactively. The user must confirm after seeing the failure.

The baseline screenshots live in `tests/visual/__snapshots__/`. The dev server must be running on port 5175 (the webServer config will start it automatically if it isn't).

To add tests for new pages, add a new spec file to `tests/visual/` following the same pattern as `tests/visual/home.spec.ts`.
