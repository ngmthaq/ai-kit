#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const TEMPLATE = process.argv[3];

const INSTRUCTION_FILE = {
  github: "copilot-instructions.md",
  claude: "CLAUDE.md",
};

async function init() {
  // Backup agent folder if it exists
  const agentDir = path.join(process.cwd(), `.${TEMPLATE}`);
  if (fs.existsSync(agentDir)) {
    const backupDir = path.join(process.cwd(), `.backup_${TEMPLATE}`);
    fs.renameSync(agentDir, backupDir);
    console.log(
      `Existing .${TEMPLATE} directory backed up to .backup_${TEMPLATE}`,
    );
  }

  // Copy src directory to working directory
  const srcDir = path.join(__dirname, "..", "src");
  const destDir = path.join(process.cwd(), `.${TEMPLATE}`);
  fs.cpSync(srcDir, destDir, { recursive: true });

  // Rename default instruction file to corresponding template instruction file
  const instructionFile = INSTRUCTION_FILE[TEMPLATE];
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

function showHelp() {
  console.log(`
    @ngmthaq20/my-copilot CLI

    Usage:
      npx @ngmthaq20/my-copilot@latest init [template]        Initialize a new project
      npx @ngmthaq20/my-copilot@latest help                   Show help message

    Templates:
      github      Init .github directory with Github Copilot configuration
      claude      Init .claude directory with Claude Code configuration
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
      console.error(`Unknown command: ${COMMAND}`);
      showHelp();
      process.exit(1);
  }
} catch (error) {
  console.error("An error occurred:", error.message);
  process.exit(1);
}
