# @ngmthaq20/ai-kit

Scaffold Claude-flavored agents, skills, and workflow templates into your project.

---

## Usage

```sh
npx @ngmthaq20/ai-kit@latest init claude
```

This copies the bundled templates into `.claude/` in the current working directory.

---

To target `.github/` instead:

```sh
npx @ngmthaq20/ai-kit@latest init github
```

In the `agents` folder, remove `permissionMode` and `memory` from the YAML configuration of all agent files because GitHub Copilot does not support them. Also, change `model` from `inherite` to `Auto (copilot)` for proper formatting.

To configure the model dynamically depending on the agent, see the `Agent Model Configuration` section below.

---

## Agent Model Configuration

In the agents folder, you will see many agent files; you can configure each agent to run a different model depending on your purpose.

For Claude Code, you can change the `model` in the YAML configuration from `inherit` to other models such as `haiku`, `sonnet`, or `opus`.

With GitHub Copilot, you can flexibly switch to other models supported by the platform by changing the `model` in the YAML configuration, such as Claude Sonnet 4.6, GPT 5.3 Codex, GPT 5.4, or Gemini 3.1 Pro.

---

## Developer Guide

See [DEVELOPER_GUIDE](./DEVELOPER_GUIDE.md)

---

## License

ISC
