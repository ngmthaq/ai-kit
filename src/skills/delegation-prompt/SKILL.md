---
name: delegation-prompt
description: Delegation prompt templates the Root Agent uses when spawning sub-agents that load the planner, debugger, developer, tester, or reviewer role skills. Use when composing feature planning, bug planning, implementation, testing, or review delegations.
user-invocable: false
---

## Purpose

Shared delegation prompt skill used by the **Root Agent** when spawning planning, implementation, testing, and review sub-agents (each loaded with the matching role reference from [sub-agents](../sub-agents/SKILL.md)).

Use the section that matches the target role and request type:

- `Feature Planning Prompt` for the [planner](../sub-agents/references/planner.md) role on `feature` or `refactor`
- `Bug Planning Prompt` for the [debugger](../sub-agents/references/debugger.md) role on `bug`
- `Developer Delegation Prompt` for the [developer](../sub-agents/references/developer.md) role
- `Tester Delegation Prompt` for the [tester](../sub-agents/references/tester.md) role
- `Reviewer Delegation Prompt` for the [reviewer](../sub-agents/references/reviewer.md) role

---

## Feature Planning Prompt

Use when spawning a sub-agent loaded with the [planner](../sub-agents/references/planner.md) role to plan a feature or refactor.
Load the references from [feature-planning-prompt](./references/feature-planning-prompt.md) for the full template and usage notes.

---

## Bug Planning Prompt

Use when spawning a sub-agent loaded with the [debugger](../sub-agents/references/debugger.md) role to plan a fix.
Load the references from [bug-planning-prompt](./references/bug-planning-prompt.md) for the full template and usage notes.

---

## Developer Delegation Prompt

Use when spawning a sub-agent loaded with the [developer](../sub-agents/references/developer.md) role to implement tasks from an approved plan.
Load the references from [developer-delegation-prompt](./references/developer-delegation-prompt.md) for the full template and usage notes.

---

## Tester Delegation Prompt

Use when spawning a sub-agent loaded with the [tester](../sub-agents/references/tester.md) role to write and run tests.
Load the references from [tester-delegation-prompt](./references/tester-delegation-prompt.md) for the full template and usage notes.

---

## Reviewer Delegation Prompt

Use when spawning a sub-agent loaded with the [reviewer](../sub-agents/references/reviewer.md) role to review completed developer and tester output.
Load the references from [reviewer-delegation-prompt](./references/reviewer-delegation-prompt.md) for the full template and usage notes.
