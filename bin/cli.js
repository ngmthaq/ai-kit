#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");
const TEMPLATE = "claude";

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
}

function showHelp() {
  console.log(`
    > @ngmthaq20/ai-kit CLI

    Usage:
      npx @ngmthaq20/ai-kit@latest init claude      - Init .claude directory with Claude Code configuration
      npx @ngmthaq20/ai-kit@latest help             - Show help message
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
      infoLog("Use 'npx @ngmthaq20/ai-kit@latest help' for usage information");
      process.exit(1);
  }
} catch (error) {
  errorLog(`An error occurred: ${error.message}`);
  process.exit(1);
}
