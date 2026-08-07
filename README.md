# @ngmthaq20/ai-kit

Scaffold Claude-flavored agents, skills, and workflow templates into your project.

---

## Usage

```sh
npx @ngmthaq20/ai-kit@latest init claude
```

This copies the bundled templates into `.claude/` in the current working directory.

---

### First-Time Onboarding / Outdated Project Information

If you are setting up AI agents on a project for the first time, or if `PROJECT_OVERVIEW.md` and `CODING_CONVENTIONS.md` are outdated, use the built-in **onboarding** skill to let the AI discover and document your project automatically.

In any agent chat, type:

```
/onboarding
```

> It is recommended to use Claude Opus model 4.6 or higher.

The skill will guide the AI through:

1. Discovering project name, description, languages, frameworks, package manager, key libraries, database, doc directory, and testing workflow — then writing results to `PROJECT_OVERVIEW.md`.
2. Scanning the codebase for coding conventions, presenting them for your approval, then writing results to `CODING_CONVENTIONS.md`.
3. _(Optional)_ Running a security review (secrets, dependency CVEs, and vulnerability scan).
4. _(Optional)_ Auditing codebase quality against clean code principles.
5. _(Optional)_ Auditing test files for AAA structure.

---

## Configuration Files

After running `init`, three Markdown files are written into the AI agents' configuration directory (`.claude/`). Together they tell every agent **what your project is**, **how to write code for it**, and **what it is and isn't allowed to do**. Fill them in before assigning any task — agents read them as ground truth.

| File                    | Purpose                                                       | When to edit                                    |
| ----------------------- | ------------------------------------------------------------- | ----------------------------------------------- |
| `PROJECT_OVERVIEW.md`   | High-level facts about the project (stack, tooling, testing). | Once at setup, then whenever the stack changes. |
| `CODING_CONVENTIONS.md` | How code should be written and structured.                    | Once at setup, then as conventions evolve.      |
| `AGENT_RULES.md`        | Hard guardrails — what agents may and may not do.             | Rarely; these are safety boundaries.            |

> 💡 You don't have to fill these in by hand. Run the [`/onboarding`](#first-time-onboarding--outdated-project-information) skill and the AI will scan your codebase and populate `PROJECT_OVERVIEW.md` and `CODING_CONVENTIONS.md` for you.

---

### PROJECT_OVERVIEW.md

Gives agents a quick orientation **before** they start working, so they don't have to rediscover the stack on every task. It contains a fixed checklist of project facts:

- **Project Name** / **Project Description** — what the project is.
- **Programming Languages**, **Frameworks**, **Package Managers**, **Key Libraries**, **Database** — the technical stack.
- **Doc Directory** — where documentation lives (defaults to `/docs`).
- **Testing Workflow** — one of `Code-First`, `Test-First`, or `Skip-Testing`. Controls whether agents write tests, and when.
- **Playwright Check** — one of `Always`, `None`, or `Ask-User`. Controls whether agents run browser checks for UI changes.

> ⚠️ Do **not** edit the checklist template keys themselves — only fill in their values. Put any extra project-specific context an agent needs under the **Additional Informations** section.

---

### CODING_CONVENTIONS.md

Defines **how** code should be written so agent output matches your codebase's existing style. Always fill this in before assigning work — without it, agents fall back to generic defaults. Recommended things to cover:

- A **tree diagram** of the project structure for general orientation.
- **Formatter / linter rules** (Prettier, ESLint, Flutter Lint, etc.) — semicolons, quote style, tab size, spacing, line breaks.
- **Naming conventions** for variables, functions, and files, including special cases (e.g. React hooks prefixed with `use`, NestJS services as `name.service.ts`).
- **Logical ordering** within a file — which parts come first and which come last.
- **Cross-cutting rules** — validation, logging, error handling, database access, caching, testing, and integration with backend/frontend services and third-party libraries.

---

### AGENT_RULES.md

The agents' **guardrails** — the explicit `DO` / `DON'T` boundaries that apply to every task. Read these before assigning work, since they govern safety and scope. Highlights:

**DO** — define a bounded role, use least-privilege access, require human approval for irreversible actions, provide structured context, log every action, run evals, and ask the user whenever intent or scope is unclear.

**DON'T** — give vague instructions, grant broad/admin access, assume full autonomy, dump unchunked data, allow silent failures, treat deployment settings as permanent, make changes outside the request's scope, or read sensitive values such as keys, certificates, passwords, or environment-variable values (agents may read env **keys**, never their values).

---

## Developer Guide

See [DEVELOPER_GUIDE](./DEVELOPER_GUIDE.md).

---

## License

ISC
