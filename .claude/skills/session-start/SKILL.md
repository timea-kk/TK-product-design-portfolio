---
name: session-start
description: Prepares Claude for a new working session by reading all project agent rules, MD files, and hooks so nothing needs to be re-explained. Use when the user says "session start", "start a session", or invokes /session-start.
allowed-tools: [Read, Bash]
---

# Session Start

You are preparing for a new working session on this project. Complete all steps below before responding to any task.

## Step 1 — Identify project root

Run `pwd` to confirm the working directory. All paths below are relative to it.

## Step 2 — Read agent rules

Read these files in full. They govern how you write, code, and discuss design:

- `agents/agent_selection.md` — which agent to use for which task
- `agents/developer.yml` — coding rules, component conventions, tooling
- `agents/writer.yml` — copy, tone, and content rules
- `agents/design-system.yml` — token, component API, and documentation rules
- `agents/CV_CONTEXT.md` — background context about the portfolio owner

## Step 3 — Confirm hooks

Read `~/.claude/settings.json` lines 1-30 (the hooks block) so you know which tool calls are gated and what the pre-conditions are.

## Step 4 — Check memory index

Read `~/.claude/projects/-Users-timeakonya-Documents-0Projects-Portfolio/memory/MEMORY.md` for any carry-over decisions or preferences from past sessions.

## Step 5 — Report back

Say only: "Ready." Nothing else.
