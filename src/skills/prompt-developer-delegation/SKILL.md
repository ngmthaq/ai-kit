---
name: prompt-developer-delegation
description: Delegation prompt template from Root Agent to developer.agent.md. Use when assigning implementation tasks derived from an approved plan.
---

## Purpose

Delegation prompt template used by the **Root Agent** when assigning implementation tasks to `developer.agent.md`.

---

## Template

```
From: Root Agent
To: developer.agent.md
Title: Implementation Task — {short title matching the plan title}
Description: {one sentence describing what must be implemented in this delegation}

Skill references:
- {list all relevant skill files scanned from the skills/ directory that developer should apply}

---

## Context

- Original request type: feature | refactor | chore | bug fix
- Plan reference: {title of the plan from template-plan-response}
- Iteration: {current loop count, e.g. "Iteration 1 of 3"}

## Tasks Assigned

{Extract only the developer tasks from the plan's Task List. Do not include tester tasks.}

| # | Task | Dependencies | Acceptance Criteria |
|---|------|--------------|---------------------|
| 1 | {task description} | {none or task #} | {what done looks like} |
| … | … | … | … |

## Files in Scope

- Create: {list files to create}
- Modify: {list files to modify}
- Delete: {list files to delete, if any}

## Architecture & Conventions

- {Patterns to follow: naming conventions, folder structure, design patterns}
- {Frameworks, libraries, or internal utilities to use}
- {Anything explicitly NOT allowed}

## Constraints

- {Performance, security, backward-compatibility, or scope constraints}
- {Must not break: list critical existing behaviors}

## Reviewer Feedback (if re-delegation)

{If this is a re-delegation triggered by a reviewer block, paste the reviewer's feedback here. Leave empty on first delegation.}

## Expected Output

Return your result using `template-sub-agent-result.skill.md`.
```

---

## Usage Notes

- Root Agent must scan `skills/` and assign all relevant skill files to `Skill references` before delegating.
- On re-delegation, always include the reviewer feedback section — developer must address each point explicitly.
- `Acceptance Criteria` per task is mandatory — vague tasks produce vague results.
- Developer must respond using `template-sub-agent-result.skill.md`.
