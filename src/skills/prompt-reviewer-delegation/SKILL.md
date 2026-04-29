---
name: prompt-reviewer-delegation
description: Delegation prompt template from Root Agent to reviewer.agent.md. Use when submitting completed developer and tester output for quality review.
---

## Purpose

Delegation prompt template used by the **Root Agent** when sending completed work to `reviewer.agent.md` for quality review.

---

## Template

```
From: Root Agent
To: reviewer.agent.md
Title: Review Request — {short title matching the original task title}
Description: {one sentence describing what was built or fixed and what the reviewer must assess}

Skill references:
- {list all relevant skill files scanned from the skills/ directory that reviewer should apply}

---

## Context

- Original request type: feature | refactor | chore | bug fix
- Review iteration: {e.g. "Review 1 of 2"}
- Plan reference: {title of the plan from template-plan-response}

## Original User Requirement

{Paste the original user prompt verbatim. Reviewer must validate against this, not assumptions.}

## Work Completed

### Developer Output

{Summary of what developer.agent.md implemented — reference files and key changes.}

### Tester Output

{Summary of what tester.agent.md produced — reference test files and results.}

## Files Changed

| File | Action | Changed By |
|------|--------|------------|
| {path/to/file} | created | modified | deleted | developer | tester |
| … | … | … |

## Previous Review Feedback (if re-review)

{If this is a second review after a block, summarise what was blocked and what was done to address it. Leave empty on first review.}

## Review Checklist

Reviewer must assess all of the following:

- [ ] Output satisfies the original user requirement
- [ ] Code follows project conventions and skill references
- [ ] No unintended side effects or regressions
- [ ] Tests cover the required scenarios and pass
- [ ] No obvious security, performance, or maintainability issues

## Expected Output

Return your result using `template-reviewer-response.skill.md`.
```

---

## Usage Notes

- Root Agent must scan `skills/` and assign all relevant skill files to `Skill references` — reviewer enforces them.
- On re-review, always include the `Previous Review Feedback` section so reviewer can confirm issues were resolved.
- Reviewer must not modify code — only assess and report.
- Reviewer must respond using `template-reviewer-response.skill.md`.
