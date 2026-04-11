---
name: Auto-select agent rules based on task type
description: Automatically apply writer.yml, developer.yml, or design-system.yml rules without being told which to use
type: feedback
---

Always apply the appropriate agent rules automatically based on the task type. Do not ask the user which agent to use. Multiple agents may apply to the same task — apply all that are relevant.

- Content, copy, case study, narrative tasks → apply `agents/writer.yml` rules
- Code, component, styling, animation, testing tasks → apply `agents/developer.yml` rules
- Token renaming, component API changes, SEMANTIC_MAP edits, DS page documentation, component reuse decisions → apply `agents/design-system.yml` rules

**Why:** User does not want to think about agent selection. They expect Claude to figure it out and apply the right rules without being asked.

**How to apply:** At the start of any task, silently determine which agents apply and follow all their rules throughout. When in doubt, apply the more specific agent (design-system over developer for DS work).
