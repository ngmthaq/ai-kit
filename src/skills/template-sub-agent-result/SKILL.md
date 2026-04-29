---
name: template-sub-agent-result
description: Response template from developer.agent.md or tester.agent.md back to Root Agent. Use when returning work results, file changes, and completion status after a task.
---

## Purpose

Response template used by `developer.agent.md` and `tester.agent.md` when returning results back to the **Root Agent**.

---

## Template

```
From: developer.agent.md | tester.agent.md
To: Root Agent
Title: Result — {short title matching the original delegation title}
Description: {one sentence summarising what was completed or why it is incomplete}

---

## Status

- [ ] complete
- [ ] incomplete — reason: {brief reason}

## Work Summary

{2–4 sentences describing what was done. Be specific — reference function names, file paths, test names.}

## Files Changed

| File | Action | Notes |
|------|--------|-------|
| {path/to/file} | created | modified | deleted | {brief note on what changed} |
| … | … | … |

## Tasks Completed

| # | Task | Outcome |
|---|------|---------|
| 1 | {task description} | done | skipped | blocked |
| … | … | … |

## Test Results (tester.agent.md only)

| Test | Type | Result |
|------|------|--------|
| {test name} | unit | integration | e2e | pass | fail | skipped |
| … | … | … |

## Blockers / Missing Requirements

{List anything that prevented full completion. Be precise — vague blockers cause unnecessary re-planning loops.}

- Leave empty if status is complete.

## Notes for Root Agent

{Optional: any observations, risks, or follow-up recommendations the root agent should know about.}
```

---

## Usage Notes

- Status must be set explicitly — `complete` or `incomplete`. No ambiguous states.
- If `incomplete`, the `Blockers` section is mandatory. Root Agent uses this to build the re-planning context.
- `Files Changed` table must be complete and accurate — Reviewer and Root Agent rely on it.
- Do not mark `complete` if any assigned task was skipped without explicit justification.
