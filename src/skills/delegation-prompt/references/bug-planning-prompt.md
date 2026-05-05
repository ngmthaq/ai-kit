# Bug Planning Prompt

## Template

```md
- From: Root Agent
- To: debugger.agent.md
- Title: Bug Fix Planning Request — {short title of the bug}
- Description: {one sentence describing the broken behavior and its impact}

---

## Document References

- {list any relevant documents from memory or the plan that the debugger should reference}

## Skill References

- {list all relevant skill files scanned from the skills/ directory that debugger should apply}

## Original User Prompt

{paste the full original user prompt verbatim}

## Classification

- Type: bug
- Rationale: {why this was classified as a bug — unexpected behavior, regression, failure, etc.}

## Observed Behavior

{Describe exactly what is happening. Include error messages, stack traces, or logs if available.}

## Expected Behavior

{Describe what should happen instead.}

## Reproduction Steps

1. {Step one}
2. {Step two}
3. {Add more as needed}

## Environment

- Runtime / platform: {e.g. Node 20, Python 3.12, browser, OS}
- Version / branch: {affected version or branch}
- Affected files (if known): {list known files or modules}

## Constraints

- {Must not break existing behavior in X, must remain backward-compatible, performance budget, etc.}
```

---

## Open Questions

Rule: ALWAYS ask the user. Never assume. If observed behavior, reproduction steps, environment, or expected behavior cannot be filled with certainty from the user prompt, list them here and STOP. Do not delegate to debugger.agent.md until the user has answered every open question.

**Ask template:**

```
Before I can create the fix plan, I need clarification:

1. {specific question — e.g. "What is the exact error message you're seeing?"}
2. {specific question — e.g. "Which version or branch is affected?"}

Please answer so the debugger can produce an accurate fix plan.

- {List anything unclear — reproduction steps, environment, observed vs expected behavior, affected scope}
```

---

## Usage Notes

- Root Agent must fill every section before delegating. Do not send partial prompts.
- **ALWAYS ask the user when any section cannot be filled with confidence** — do not infer, guess, or fabricate details.
- If reproduction steps are unknown, ask the user — do not state "unknown" and proceed.
- `Skill References` must be populated by scanning the `skills/` directory and selecting all files relevant to the bug domain.
- `Document References` should include any relevant memory items or previous plans that the debugger should reference when creating the fix plan.
- Debugger must respond using [agent-response-template](../../agent-response-template/) skill (`Plan Response Template` section).
