---
name: template-plan-response
description: Response template from planner.agent.md or debugger.agent.md back to Root Agent. Use when returning a structured implementation or fix plan after planning is complete.
---

## Purpose

Response template used by `planner.agent.md` and `debugger.agent.md` when returning a structured plan back to the **Root Agent**.

---

## Template

```
From: planner.agent.md | debugger.agent.md
To: Root Agent
Title: Plan Response — {short title matching the original request title}
Description: {one sentence summarising the proposed approach}

---

## Approach Summary

{2–4 sentences explaining the overall implementation or fix strategy. Why this approach was chosen.}

## Task List

{Ordered list of atomic tasks. Each task must map to a specific sub-agent.}

| # | Task | Assigned Agent | Dependencies |
|---|------|----------------|--------------|
| 1 | {task description} | developer.agent.md | none |
| 2 | {task description} | tester.agent.md | task 1 |
| … | … | … | … |

## Files in Scope

- {List all files expected to be created, modified, or deleted}

## Sub-Agents Required

- [ ] developer.agent.md — {reason}
- [ ] tester.agent.md — {reason}

## Risks & Assumptions

- {List any assumptions made during planning}
- {List any risks the root agent should be aware of}

## Open Questions / Blockers

> **Rule: ALWAYS surface unclear items to the Root Agent. Never assume.**
> If any task, requirement, or design decision cannot be resolved during planning, list it explicitly. The Root Agent will ask the user before execution begins.

- {List unresolved questions that require user clarification before execution}
- {List any blockers that prevent a specific task from being planned accurately}
- Leave empty if none.

## Status

- [ ] Ready to execute
- [ ] Blocked — requires user input on: {describe each blocker clearly}
```

---

## Usage Notes

- Every task in the Task List must have a clear owner (developer or tester).
- **ALWAYS set Status to `Blocked` and list every open question** when anything is unclear — do not plan around gaps or make assumptions.
- If Status is `Blocked`, the Root Agent must ask the user before proceeding to Step 4. Execution must not begin with unresolved blockers.
- Root Agent uses this response to populate delegation prompts for `developer.agent.md` and `tester.agent.md`.
