---
name: prompt-tester-delegation
description: Delegation prompt template from Root Agent to tester.agent.md. Use when assigning testing tasks after developer implementation is complete.
---

## Purpose

Delegation prompt template used by the **Root Agent** when assigning testing tasks to `tester.agent.md`.

---

## Template

```
From: Root Agent
To: tester.agent.md
Title: Testing Task — {short title matching the plan title}
Description: {one sentence describing what must be tested in this delegation}

Skill references:
- {list all relevant skill files scanned from the skills/ directory that tester should apply}

---

## Context

- Original request type: feature | refactor | bug fix
- Plan reference: {title of the plan from template-plan-response}
- Iteration: {current loop count, e.g. "Iteration 1 of 3"}

## Implementation Summary

{Brief description of what the developer implemented — what changed and why, so tester understands scope.}

## Files Changed by Developer

- {list all files created or modified by developer.agent.md}

## Tasks Assigned

{Extract only the tester tasks from the plan's Task List.}

| # | Task | Test Type | Acceptance Criteria |
|---|------|-----------|---------------------|
| 1 | {what to test} | unit | integration | e2e | {what passing looks like} |
| … | … | … | … |

## Test Scenarios Required

- Happy path: {describe the expected successful flow}
- Edge cases: {list edge cases to cover}
- Failure cases: {list failure / error scenarios to validate}

## Constraints

- {Test framework or tooling to use}
- {Coverage threshold if applicable}
- {Must not modify production code}

## Reviewer Feedback (if re-delegation)

{If this is a re-delegation triggered by a reviewer block, paste the reviewer's test-related feedback here. Leave empty on first delegation.}

## Expected Output

Return your result using `template-sub-agent-result.skill.md`.
```

---

## Usage Notes

- Root Agent must scan `skills/` and assign all relevant skill files to `Skill references` before delegating.
- Tester must not modify production code — only test files.
- If developer output is incomplete, tester should flag this in the result rather than testing partial work.
- Tester must respond using `template-sub-agent-result.skill.md`.
