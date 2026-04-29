---
name: prompt-feature-planning
description: Delegation prompt template from Root Agent to planner.agent.md. Use when delegating a feature or refactor request for implementation planning.
---

## Purpose

Delegation prompt template used by the **Root Agent** when sending a feature or refactor request to `planner.agent.md` for implementation planning.

---

## Template

```
From: Root Agent
To: planner.agent.md
Title: Feature Planning Request — {short title of the feature}
Description: {one sentence describing what this feature/refactor achieves}

Skill references:
- {list all relevant skill files scanned from the skills/ directory that planner should apply}

---

## Original User Prompt

{paste the full original user prompt verbatim}

## Classification

- Type: feature | refactor
- Rationale: {why this was classified as such}

## Codebase Context

- Affected modules / files: {list known files or modules relevant to this feature}
- Architecture notes: {any patterns, conventions, or constraints the planner must respect}
- Dependencies: {external libraries, services, or internal modules involved}

## Requirements

{Expand the user prompt into clear, unambiguous requirements. Use bullet points. Each item must be testable.}

## Constraints

- {Performance, security, backward-compatibility, or scope constraints}

## Open Questions

> **Rule: ALWAYS ask the user. Never assume.**
> If any requirement, constraint, or context field cannot be filled with certainty from the user prompt, list it here and STOP. Do not delegate to planner.agent.md until the user has answered every open question.

**Ask template:**
```

Before I can create the implementation plan, I need clarification:

1. {specific question}
2. {specific question}

Please answer so the plan is accurate.

```

- {List anything unclear — scope, affected files, constraints, expected behaviour, definition of done}
```

---

## Usage Notes

- Root Agent must fill every section before delegating. Do not send partial prompts.
- **ALWAYS ask the user when any section cannot be filled with confidence** — do not infer, guess, or proceed with placeholders.
- `Skill references` must be populated by scanning the `skills/` directory and selecting all files relevant to the feature domain.
- Planner must respond using `template-plan-response.skill.md`.
