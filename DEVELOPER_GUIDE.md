# Developer Guide

> How to use the AI agent system in your day-to-day development work.

---

## Table of Contents

1. [Overview](#overview)
2. [When to Use Which Path](#when-to-use-which-path)
3. [Step-by-Step Usage](#step-by-step-usage)
   - [Chore Path](#chore-path)
   - [Feature / Refactor Path](#feature--refactor-path)
   - [Bug Fix Path](#bug-fix-path)
4. [Writing Good Prompts](#writing-good-prompts)
5. [The Approval Gate — What to Expect](#the-approval-gate--what-to-expect)
6. [Reviewing Agent Output](#reviewing-agent-output)
7. [Loop Guard — When Things Get Stuck](#loop-guard--when-things-get-stuck)
8. [Common Mistakes to Avoid](#common-mistakes-to-avoid)
9. [Quick Reference Card](#quick-reference-card)

---

## Overview

The agent system is a multi-agent AI workflow that handles software development tasks on your behalf. You interact with a single entry point — the **Root Agent** — and it coordinates a team of specialized sub-agents behind the scenes.

You never talk to sub-agents directly. The Root Agent classifies your request, delegates to the right agents, validates results, and reports back to you.

```
You ──► Root Agent ──► Planner / Debugger ──► Developer + Tester ──► Reviewer ──► You
```

The system supports three types of tasks:

| Type        | Description                                          | Example                                       |
| ----------- | ---------------------------------------------------- | --------------------------------------------- |
| **Feature** | New functionality or a refactor                      | "Add pagination to the user list API"         |
| **Bug**     | Unexpected behavior or regression                    | "Login fails when email contains a plus sign" |
| **Chore**   | Low-risk housekeeping with no business logic changes | "Bump axios to 1.7.0"                         |

> Want to understand what happens under the hood? See the `agents/` folder in the repo.

---

## When to Use Which Path

Use this table to frame your request correctly before prompting:

| Situation                                   | Type               |
| ------------------------------------------- | ------------------ |
| Adding something new                        | Feature            |
| Changing how something works                | Feature            |
| Reorganizing code without changing behavior | Feature (refactor) |
| Something broke that used to work           | Bug                |
| Tests are failing unexpectedly              | Bug                |
| Performance regression                      | Bug                |
| Updating a dependency                       | Chore              |
| Changing a config file                      | Chore              |
| Setting up a linter or tool                 | Chore              |
| Fixing lint warnings with no logic changes  | Chore              |

> **When in doubt:** if it touches business logic or could cause a regression, treat it as a **feature** or **bug** — not a chore.

---

## Step-by-Step Usage

### Chore Path

Chores are the simplest path — the Root Agent handles them directly with no planning phase.

**Steps:**

1. Open the CLI or chat interface.
2. Describe the chore clearly (see [Writing Good Prompts](#writing-good-prompts)).
3. The Root Agent will confirm the scope and the files it plans to touch — **review this carefully**.
4. Reply with your approval (e.g. "yes, go ahead").
5. The agent makes the change and sends you a summary of files changed.

**Example prompt:**

```
Chore: Bump the `zod` package to version 3.23.8 in package.json and update the lockfile.
```

**What to watch for:** if the agent says the change is larger than expected or touches logic files, it will stop and ask you to re-classify. This is correct behavior — do not push it to continue as a chore.

---

### Feature / Refactor Path

This is the full pipeline: plan → approve → implement → test → review.

**Steps:**

1. **Write your prompt.** Describe the feature or refactor in plain language. Include acceptance criteria if you have them.
2. **Review the plan.** Before any code is written, the Root Agent presents a plan for your approval. Read it carefully (see [The Approval Gate](#the-approval-gate--what-to-expect)).
3. **Approve or revise.** Reply with approval, or give specific feedback. The plan will be revised and re-presented.
4. **Implementation runs automatically.** Code is written and tests are run without any further input from you.
5. **Review runs automatically.** Output is reviewed internally. If issues are found, the loop repeats.
6. **Summary.** The Root Agent reports what was done, what files changed, and any follow-up notes.

**Example prompt:**

```
Feature: Add email verification on sign-up.

When a new user registers, send a verification email with a unique token.
The user should not be able to log in until they click the link.
Token should expire after 24 hours.

Stack: Node.js / Express backend, Postgres, existing Nodemailer setup.
```

---

### Bug Fix Path

The same flow as features, but the Root Agent focuses on root cause analysis before proposing a fix.

**Steps:**

1. **Write your prompt.** Describe what broke, what you expected, and what happened instead. Include logs or stack traces if you have them.
2. **Review the fix plan.** Same approval gate as features — do not skip it.
3. **Approve or revise.** Give feedback if the proposed fix looks wrong.
4. **Implementation + test + review run automatically.**
5. **Summary.** Root Agent reports the fix, affected files, and regression tests added.

**Example prompt:**

```
Bug: User profile avatar upload returns 413 error for files over 1MB, even though our
limit should be 10MB.

Expected: Files up to 10MB upload successfully.
Actual: 413 Payload Too Large for anything over ~1MB.

Stack trace:
  Error: request entity too large
  at read (/app/node_modules/body-parser/lib/read.js:79)
  ...

This worked before the nginx config was updated last week.
```

---

## Writing Good Prompts

The quality of the output depends heavily on the quality of your prompt.

### For features

- State **what** should happen, not how to implement it.
- Include **acceptance criteria** — when is this feature "done"?
- Mention the **relevant stack** (language, framework, existing services).
- Reference **related files or modules** if you know them.

### For bugs

- Describe **observed behavior** (what actually happens).
- Describe **expected behavior** (what should happen).
- Include **reproduction steps** if possible.
- Paste **stack traces, error messages, or logs** directly in the prompt.
- Mention **what changed recently** if you suspect a cause.

### For chores

- Be specific about **which package / config / file** is involved.
- State the **target version or desired state**.
- Mention any known **compatibility concerns**.

### General tips

- One task per prompt. Don't bundle a feature and a bug in the same message.
- Avoid vague prompts like "clean up the auth code" — be specific about what needs cleaning and why.
- If you already know which files are in scope, say so.

---

## The Approval Gate — What to Expect

Before any code is written, the Root Agent presents a plan for your approval. This gate exists to prevent wasted work — it is the most important moment in the workflow.

**The plan will include:**

- A summary of the approach
- An ordered list of tasks
- The files in scope
- Any open questions or blockers

**What to do:**

| Your response                            | What happens next                 |
| ---------------------------------------- | --------------------------------- |
| Approve (e.g. "looks good, proceed")     | Implementation begins             |
| Request changes (e.g. "change X, add Y") | Plan is revised and re-presented  |
| Cancel (e.g. "stop, abort")              | Workflow ends, nothing is changed |

**Tips for reviewing the plan:**

- Check that the task list matches your intent — not just the summary.
- Verify that files in scope are correct. Irrelevant files in scope = unnecessary risk.
- If the plan lists open questions, answer them in your approval message.
- You can iterate on the plan as many times as needed before implementation starts.

---

## Reviewing Agent Output

After implementation and internal review complete, the Root Agent sends you a summary report.

**Check the summary for:**

- Files changed — do they match what you expected?
- Tests added or updated — are there meaningful tests covering the change?
- Outstanding notes — items the agents couldn't resolve or recommend as follow-up.

**When to push back:**

The internal review checks for technical correctness, but it doesn't know your product context. Push back if:

- The implementation technically works but doesn't match the intent of your request.
- The scope was too broad or too narrow.
- Tests are superficial or missing edge cases you care about.

To request a fix, describe what's wrong and the Root Agent will re-enter the loop.

---

## Loop Guard — When Things Get Stuck

The system has built-in protection to prevent runaway cycles. If the agent gets stuck, it will pause and surface the blockers to you instead of looping indefinitely.

**When this happens:**

Read the blockers carefully — they are usually a sign that the original plan has an ambiguity or a missing requirement. Provide the missing context directly rather than just saying "try again."

**Example response when stuck:**

```
The `user_sessions` table doesn't have a `token_hash` column yet.
You'll need to create a migration to add it first.
Here's the current schema: [paste schema]
```

---

## Common Mistakes to Avoid

**Labeling a feature as a chore to skip planning.**
Chores skip the approval gate entirely. If your change touches logic, calling it a chore bypasses safeguards.

**Approving the plan without reading it.**
The plan is the contract for what will be built. Approving without reading means you lose the chance to correct course before implementation.

**Giving vague feedback during plan revision.**
"This doesn't look right" is not actionable. Be specific: "The plan adds caching but the task only requires a simple DB query — remove the Redis steps."

**Bundling multiple unrelated tasks in one prompt.**
The workflow is designed for one task at a time. Split them up.

**Expecting the internal review to catch product misalignment.**
The review checks technical correctness, not whether the implementation matches your product vision. That sanity check is yours to do at the summary stage.

**Ignoring outstanding notes in the summary.**
Agents flag follow-up items for a reason. Leaving them unaddressed accumulates technical debt.

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────────────────┐
│                        AGENT WORKFLOW — QUICK REF                   │
├──────────────┬──────────────────────────────────────────────────────┤
│ CHORE        │ Small, low-risk, no business logic changes           │
│              │ Confirm scope → done.                                │
├──────────────┼──────────────────────────────────────────────────────┤
│ FEATURE      │ New functionality or refactor                        │
│              │ Prompt → Plan → Approve → done.                      │
├──────────────┼──────────────────────────────────────────────────────┤
│ BUG          │ Unexpected behavior, failure, regression             │
│              │ Prompt → Fix plan → Approve → done.                  │
├──────────────┴──────────────────────────────────────────────────────┤
│ GOOD PROMPT CHECKLIST                                               │
│  ✓ One task only                                                    │
│  ✓ What (not how)                                                   │
│  ✓ Acceptance criteria (features)                                   │
│  ✓ Observed vs expected + stack trace (bugs)                        │
│  ✓ Target version / file (chores)                                   │
├─────────────────────────────────────────────────────────────────────┤
│ APPROVAL GATE                                                       │
│  Approve → "looks good, proceed"                                    │
│  Revise  → describe specific changes                                │
│  Abort   → "stop" or "cancel"                                       │
├─────────────────────────────────────────────────────────────────────┤
│ LOOP GUARD                                                          │
│  Agent pauses and surfaces blockers → provide missing context       │
├─────────────────────────────────────────────────────────────────────┤
│ WANT MORE DETAIL?                                                   │
│  See the agents/ folder in the repo.                                │
└─────────────────────────────────────────────────────────────────────┘
```
