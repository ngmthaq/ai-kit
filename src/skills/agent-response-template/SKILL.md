---
name: agent-response-template
description: Response templates for the planner, debugger, developer, tester, and reviewer role skills. Use when returning a plan, a sub-agent work result, or a reviewer decision back to the Root Agent.
user-invocable: false
---

## Purpose

Shared response template skill used by sub-agents when sending structured output back to the **Root Agent**.

Use the section that matches the response type:

- `Plan Response Template` for the [planner](../sub-agents/references/planner.md) and [debugger](../sub-agents/references/debugger.md) roles
- `Sub-Agent Result Template` for the [developer](../sub-agents/references/developer.md) and [tester](../sub-agents/references/tester.md) roles
- `Reviewer Response Template` for the [reviewer](../sub-agents/references/reviewer.md) role

---

## Plan Response Template

Use when a sub-agent loaded with the [planner](../sub-agents/references/planner.md) or [debugger](../sub-agents/references/debugger.md) role is returning a structured implementation or fix plan.
Load the template from this reference: [plan-response-template](./references/plan-response-template.md).

---

## Sub-Agent Result Template

Use when a sub-agent loaded with the [developer](../sub-agents/references/developer.md) or [tester](../sub-agents/references/tester.md) role is returning work results after execution.
Load the template from this reference: [sub-agent-result-template](./references/sub-agent-result-template.md).

---

## Reviewer Response Template

Use when a sub-agent loaded with the [reviewer](../sub-agents/references/reviewer.md) role is returning a final review decision.
Load the template from this reference: [reviewer-response-template](./references/reviewer-response-template.md).
