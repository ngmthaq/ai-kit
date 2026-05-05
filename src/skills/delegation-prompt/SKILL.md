---
name: delegation-prompt
description: Delegation prompt templates for Root Agent handoffs to planner.agent.md, debugger.agent.md, developer.agent.md, tester.agent.md, and reviewer.agent.md. Use when composing feature planning, bug planning, implementation, testing, or review delegations.
---

## Purpose

Shared delegation prompt skill used by the **Root Agent** when routing work to planning, implementation, testing, and review sub-agents.

Use the section that matches the target agent and request type:

- `Feature Planning Prompt` for `planner.agent.md` on `feature` or `refactor`
- `Bug Planning Prompt` for `debugger.agent.md` on `bug`
- `Developer Delegation Prompt` for `developer.agent.md`
- `Tester Delegation Prompt` for `tester.agent.md`
- `Reviewer Delegation Prompt` for `reviewer.agent.md`

---

## Feature Planning Prompt

Use when delegating a feature or refactor request to `planner.agent.md` for implementation planning.
Load the references from [feature-planning-prompt](./references/feature-planning-prompt.md) for the full template and usage notes.

---

## Bug Planning Prompt

Use when delegating a bug report to `debugger.agent.md` for fix planning.
Load the references from [bug-planning-prompt](./references/bug-planning-prompt.md) for the full template and usage notes.

---

## Developer Delegation Prompt

Use when assigning implementation tasks derived from an approved plan to `Developer Agent (developer.agent.md)`.
Load the references from [developer-delegation-prompt](./references/developer-delegation-prompt.md) for the full template and usage notes.

---

## Tester Delegation Prompt

Use when assigning testing tasks after developer implementation is complete to `Tester Agent (tester.agent.md)`.
Load the references from [tester-delegation-prompt](./references/tester-delegation-prompt.md) for the full template and usage notes.

---

## Reviewer Delegation Prompt

Use when submitting completed developer and tester output for quality review to `Reviewer Agent (reviewer.agent.md)`.
Load the references from [reviewer-delegation-prompt](./references/reviewer-delegation-prompt.md) for the full template and usage notes.
