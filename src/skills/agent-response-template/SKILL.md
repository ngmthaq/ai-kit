---
name: agent-response-template
description: Response templates for planner.agent.md, debugger.agent.md, developer.agent.md, tester.agent.md, and reviewer.agent.md. Use when returning a plan, a sub-agent work result, or a reviewer decision back to Root Agent.
---

## Purpose

Shared response template skill used by sub-agents when sending structured output back to the **Root Agent**.

Use the section that matches the response type:

- `Plan Response Template` for `planner.agent.md` and `debugger.agent.md`
- `Sub-Agent Result Template` for `developer.agent.md` and `tester.agent.md`
- `Reviewer Response Template` for `reviewer.agent.md`

---

## Plan Response Template

Use when `planner.agent.md` or `debugger.agent.md` is returning a structured implementation or fix plan.
Load the template from this reference: [plan-response-template](./references/plan-response-template.md).

---

## Sub-Agent Result Template

Use when `developer.agent.md` or `tester.agent.md` is returning work results after execution.
Load the template from this reference: [sub-agent-result-template](./references/sub-agent-result-template.md).

---

## Reviewer Response Template

Use when `reviewer.agent.md` is returning a final review decision.
Load the template from this reference: [reviewer-response-template](./references/reviewer-response-template.md).
