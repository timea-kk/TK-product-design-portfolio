---
name: Auto-select writer or developer agent
description: Automatically apply writer.yml or developer.yml rules without being told which to use
type: feedback
---

Always apply the appropriate agent rules automatically based on the task type. Do not ask the user which agent to use.

- Content, copy, case study, narrative tasks → apply `agents/writer.yml` rules
- Code, component, styling, animation, testing tasks → apply `agents/developer.yml` rules

**Why:** User does not want to think about agent selection. They expect Claude to figure it out.

**How to apply:** At the start of any task, silently determine which agent applies (or both, if mixed) and follow those rules throughout.
