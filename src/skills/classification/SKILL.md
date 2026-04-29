---
name: classification
description: Intent classification logic for the Root Agent. Use when a user prompt arrives to determine whether the request is a feature (refactor | chore) or a bug before any delegation occurs.
---

## Purpose

Used by the **Root Agent** to classify every incoming user prompt before any delegation occurs. Classification determines which planning agent is invoked and which prompt template is used.

---

## Classification Rules

### Feature

Classify as `feature` when the prompt describes:

- New functionality to be added
- An existing behaviour to be refactored or improved
- A chore (dependency update, config change, tooling setup, code cleanup)
- A performance improvement with no broken behaviour involved

**Signal words:** "add", "implement", "create", "build", "refactor", "improve", "update", "migrate", "upgrade", "support", "enable", "integrate"

### Bug

Classify as `bug` when the prompt describes:

- Something that was working and is now broken
- Unexpected or incorrect behaviour
- A crash, error, or exception
- A regression introduced by a recent change
- Output that does not match the specification

**Signal words:** "broken", "not working", "fails", "error", "crash", "wrong", "incorrect", "regression", "unexpected", "should be", "used to work"

---

## Decision Template

```
From: Root Agent
To: Root Agent (self)
Title: Classification — {short title of the user prompt}
Description: {one sentence stating the classification and primary reason}

---

## Input

- User prompt: {paste the full original user prompt verbatim}

## Classification Result

- Type: feature | refactor | chore | bug
- Rationale: {one or two sentences explaining why this classification was chosen}

## Ambiguity Notes

- {List any signals that pointed toward a different classification}
- {List any assumptions made to resolve ambiguity}
- Leave empty if classification was unambiguous.

## Next Step

- [ ] Delegate to planner.agent.md using `prompt-feature-planning.skill.md`
- [ ] Delegate to debugger.agent.md using `prompt-bug-planning.skill.md`
```

---

## Ambiguous Cases

If the prompt contains signals for both `feature` and `bug`, or if any field cannot be filled with confidence:

> **Rule: ALWAYS ask the user. Never assume.**

Stop and ask the user a direct, specific question before proceeding. Do not guess, infer, or proceed with a best-effort classification.

**Ask template:**

```
I need clarification before I can proceed:

1. {specific question — e.g. "Is this describing a broken existing behaviour, or a new capability you want added?"}
2. {additional question if needed}

Please answer so I can route this correctly.
```

Only proceed to delegation once every ambiguity is resolved by the user.

---

## Usage Notes

- Classification is always the **first action** of the Root Agent. No delegation happens before it.
- **ALWAYS ask the user when anything is unclear** — intent, scope, affected area, expected behaviour. There are no acceptable assumptions.
- The classification result feeds directly into the delegation prompt (`From`, `Title`, `Classification` fields).
- A prompt that cannot be classified without guessing must be treated as blocked until the user clarifies.
