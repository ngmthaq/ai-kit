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
3. _(Optional)_ Running secret and security scanners.
4. _(Optional)_ Auditing codebase quality against clean code principles.
5. _(Optional)_ Auditing test files for AAA structure.

---

## CODING_CONVENTIONS.md

Always define coding conventions for your project before assigning it to AI agents. Fill in the coding conventions in the `CODING_CONVENTIONS.md` file located in the AI ​​agents' configuration directory.

---

## AGENT_RULES.md

Define what the AI Agent should and should NOT do in the `AGENT_RULES.md` file located in the AI agents' configuration directory before assigning tasks to the AI Agent.

---

## PROJECT_OVERVIEW.md

Fill in the general project information in the `PROJECT_OVERVIEW.md` file in the agent configuration directory. This will give agents an overview before they start working.

---

## Developer Guide

See [DEVELOPER_GUIDE](./DEVELOPER_GUIDE.md).

---

## License

ISC
