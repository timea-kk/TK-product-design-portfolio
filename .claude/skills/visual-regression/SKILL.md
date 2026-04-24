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
- Show which snapshots failed.
- Ask the user: "These look like intentional changes — should I update the baselines?"
- If yes: run `npm run test:visual:update` to accept the new screenshots as the new baseline, then confirm the baselines were updated.
- If no: report the regression so the user can investigate the cause.

The baseline screenshots live in `tests/visual/__snapshots__/`. The dev server must be running on port 5175 (the webServer config will start it automatically if it isn't).

To add tests for new pages, add a new spec file to `tests/visual/` following the same pattern as `tests/visual/home.spec.ts`.
