---
name: template-reviewer-response
description: Response template from reviewer.agent.md back to Root Agent. Use when returning a review decision — accepted or blocked — with a detailed checklist and issue list.
---

## Purpose

Response template used by `reviewer.agent.md` when returning a review decision back to the **Root Agent**.

---

## Template

```
From: reviewer.agent.md
To: Root Agent
Title: Review Response — {short title matching the review request title}
Description: {one sentence stating the decision and the primary reason}

---

## Decision

- [ ] accepted — output meets all requirements and quality standards
- [ ] blocked — issues must be resolved before acceptance

## Summary

{2–4 sentences explaining the overall quality of the output and the basis for the decision.}

## Checklist Results

| Item | Result | Notes |
|------|--------|-------|
| Satisfies original user requirement | pass | fail | partial | {notes} |
| Follows project conventions and skill references | pass | fail | partial | {notes} |
| No unintended side effects or regressions | pass | fail | partial | {notes} |
| Tests cover required scenarios and pass | pass | fail | partial | {notes} |
| No security, performance, or maintainability issues | pass | fail | partial | {notes} |

## Issues Found (if blocked)

{List each issue clearly. Each issue must include enough detail for the responsible sub-agent to act on it without further clarification.}

| # | Severity | File | Description | Assigned To |
|---|----------|------|-------------|-------------|
| 1 | critical | high | medium | low | {path/to/file} | {clear description of the issue} | developer.agent.md | tester.agent.md |
| … | … | … | … | … |

- Leave empty if decision is `accepted`.

## Recommendations (non-blocking)

{Optional: suggestions for improvement that are not blockers but worth noting for future iterations.}

- Leave empty if none.
```

---

## Usage Notes

- Decision must be binary: `accepted` or `blocked`. No partial acceptance.
- Every issue in the Issues table must have an assigned agent — Root Agent uses this to route re-delegation.
- `critical` or `high` severity issues always result in `blocked`. `medium` or `low` may be accepted at reviewer discretion.
- Reviewer must not silently pass work that partially meets requirements — use `partial` in checklist and block if needed.
