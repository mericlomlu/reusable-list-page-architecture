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

const message = process.argv.slice(2).join(" ").trim();
const pattern = new RegExp(
  `^(${types.join("|")})(\\([a-z0-9-]+\\))?(!)?: [a-z0-9][^.!?]*$`,
);

if (pattern.test(message) && message.length <= 100) {
  process.exit(0);
}

process.stderr.write(
  "Invalid commit subject. Use <type>(optional-scope): <lowercase imperative summary>, " +
    "maximum 100 characters, without trailing punctuation.\n",
);
process.exit(2);
