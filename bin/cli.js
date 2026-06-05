#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const AVAILABLE_INSTRUCTION_FILE = {
  github: "copilot-instructions.md",
  claude: "CLAUDE.md",
  cursor: null,
};

const CURSOR_RULES = {
  WORKSPACE_INSTRUCTIONS:
    "Workspace instructions — entry point linking project overview, coding conventions, agent rules, and the codebase knowledge graph",
  PROJECT_OVERVIEW:
    "Project overview — name, description, stack, libraries, docs location, and testing workflow",
  CODING_CONVENTIONS:
    "Coding conventions agents must follow when writing code for this project",
  AGENT_RULES:
    "DO and DO NOT rules agents must respect when receiving assignments",
  GIT_NEXUS:
    "GitNexus codebase knowledge graph — dependencies, call chains, clusters, and execution flows",
};

function errorLog(message) {
  console.error("\x1b[31m%s\x1b[0m", message);
}

function successLog(message) {
  console.log("\x1b[32m%s\x1b[0m", message);
}

function infoLog(message) {
  console.log("\x1b[34m%s\x1b[0m", message);
}

async function init() {
  const TEMPLATE = process.argv[3];
  if (Object.keys(AVAILABLE_INSTRUCTION_FILE).indexOf(TEMPLATE) === -1) {
    errorLog(`An error occurred, unknown template: ${TEMPLATE}`);
    infoLog(
      `Supported templates: ${Object.keys(AVAILABLE_INSTRUCTION_FILE).join(", ")}`,
    );
    process.exit(1);
  }

  // Backup agent folder if it exists
  const agentDir = path.join(process.cwd(), `.${TEMPLATE}`);
  if (fs.existsSync(agentDir)) {
    const backupName = `.${TEMPLATE}_backup_${Date.now()}`;
    const backupDir = path.join(process.cwd(), backupName);
    fs.renameSync(agentDir, backupDir);
    successLog(`Existing .${TEMPLATE} directory backed up to ${backupName}`);
  }

  // Copy src directory to working directory
  const srcDir = path.join(__dirname, "..", "src");
  const destDir = path.join(process.cwd(), `.${TEMPLATE}`);
  fs.cpSync(srcDir, destDir, { recursive: true });

  // Cursor reads rules from .cursor/rules/*.mdc instead of a single instruction file
  if (TEMPLATE === "cursor") {
    moveCursorRules(destDir);
    return;
  }

  // Rename default instruction file to corresponding template instruction file
  const instructionFile = AVAILABLE_INSTRUCTION_FILE[TEMPLATE];
  const defaultInstructionPath = path.join(
    destDir,
    "WORKSPACE_INSTRUCTIONS.md",
  );
  const destInstructionPath = path.join(
    process.cwd(),
    `.${TEMPLATE}`,
    instructionFile,
  );
  fs.renameSync(defaultInstructionPath, destInstructionPath);
}

function moveCursorRules(destDir) {
  const rulesDir = path.join(destDir, "rules");
  fs.mkdirSync(rulesDir, { recursive: true });

  // Move each top-level doc into rules/ as .mdc with Cursor rule frontmatter
  for (const [name, description] of Object.entries(CURSOR_RULES)) {
    const sourcePath = path.join(destDir, `${name}.md`);
    const frontmatter = `---\ndescription: ${description}\nalwaysApply: true\n---\n\n`;
    const content = fs.readFileSync(sourcePath, "utf8");
    fs.writeFileSync(path.join(rulesDir, `${name}.mdc`), frontmatter + content);
    fs.rmSync(sourcePath);
  }

  rewriteCursorRuleLinks(destDir, rulesDir);
}

function rewriteCursorRuleLinks(dir, rulesDir) {
  const pattern = new RegExp(
    `((?:\\.\\./)+|\\./)?(${Object.keys(CURSOR_RULES).join("|")})\\.md\\b`,
    "g",
  );

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      rewriteCursorRuleLinks(entryPath, rulesDir);
      continue;
    }
    if (!/\.(md|mdc)$/.test(entry.name)) continue;

    const isRuleFile = dir === rulesDir;
    const content = fs.readFileSync(entryPath, "utf8");
    const updated = content.replace(pattern, (_match, prefix = "", name) => {
      const base = isRuleFile ? "" : "rules/";
      return `${prefix}${base}${name}.mdc`;
    });
    if (updated !== content) {
      fs.writeFileSync(entryPath, updated);
    }
  }
}

function showHelp() {
  console.log(`
    > @ngmthaq20/my-copilot CLI

    Usage:
      npx @ngmthaq20/my-copilot@latest init [template]      - Initialize a new project
      npx @ngmthaq20/my-copilot@latest help                 - Show help message

    Templates:
      github    - Init .github directory with Github Copilot configuration
      claude    - Init .claude directory with Claude Code configuration
      cursor    - Init .cursor directory with Cursor configuration (rules/*.mdc)
    `);
}

try {
  const COMMAND = process.argv[2];
  switch (COMMAND) {
    case "init":
      init();
      break;

    case undefined:
    case "help":
      showHelp();
      break;

    default:
      errorLog(`An error occurred, unknown command: ${COMMAND}`);
      infoLog(
        "Use 'npx @ngmthaq20/my-copilot@latest help' for usage information",
      );
      process.exit(1);
  }
} catch (error) {
  errorLog(`An error occurred: ${error.message}`);
  process.exit(1);
}
