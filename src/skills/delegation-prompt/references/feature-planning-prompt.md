# Feature Planning Prompt

## Template

```md
- From: Root Agent
- To: planner.agent.md
- Title: Feature Planning Request — {short title of the feature}
- Description: {one sentence describing what this feature/refactor achieves}

---

## Document References

- {list any relevant documents from memory or the plan that the planner should reference}

## Skill References

- {list all relevant skill files scanned from the skills/ directory that planner should apply}

## Original User Prompt

{paste the full original user prompt verbatim}

## Constraints

**ALWAYS ask the user when any section cannot be filled with confidence** — do not infer, guess, or proceed with placeholders. If any requirement, constraint, or context field cannot be filled with certainty from the user prompt, list it here and STOP. Do not process until the user has answered every open question.

## Additional Information

{Root Agent can add additional information here to help planner create the plan}
```

---

## Usage Notes

- `Skill References` must be populated by scanning the `skills/` directory and selecting all files relevant to the feature domain.
- `Document References` should include any relevant memory items or previous plans that the planner should reference when creating the implementation plan.
- Planner must respond using [agent-response-template](../../agent-response-template/) skill (`Plan Response Template` section).
