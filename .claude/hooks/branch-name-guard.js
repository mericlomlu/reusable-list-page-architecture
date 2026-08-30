const { execSync } = require("node:child_process");

const types = [
  "feat",
  "fix",
  "refactor",
  "perf",
  "docs",
  "style",
  "test",
  "build",
  "ci",
  "chore",
  "revert",
];
const exempt = new Set(["main"]);
const pattern = new RegExp(`^(${types.join("|")})/[a-z0-9]+(?:-[a-z0-9]+)*$`);

function currentBranch() {
  try {
    return execSync("git branch --show-current", { encoding: "utf8" }).trim();
  } catch {
    return "";
  }
}

const branch = (process.argv[2] || currentBranch()).trim();

if (!branch || exempt.has(branch) || pattern.test(branch)) {
  process.exit(0);
}

process.stderr.write(
  `Branch name "${branch}" is invalid. Use <type>/<kebab-case>. ` +
    `Allowed types: ${types.join(", ")}.\n`,
);
process.exit(2);
