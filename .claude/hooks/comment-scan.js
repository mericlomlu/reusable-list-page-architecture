const fs = require("node:fs");

function scan(file) {
  let source;
  try {
    source = fs.readFileSync(file, "utf8");
  } catch {
    return [];
  }

  const isCss = file.endsWith(".css");
  const hits = [];
  let index = 0;
  let line = 1;
  let state = "code";

  while (index < source.length) {
    const current = source[index];
    const next = source[index + 1];

    if (state === "code") {
      if (current === "\n") {
        line += 1;
        index += 1;
        continue;
      }
      if (!isCss && (current === '"' || current === "'" || current === "`")) {
        state = current;
        index += 1;
        continue;
      }
      if (!isCss && current === "/" && next === "/") {
        hits.push(line);
        while (index < source.length && source[index] !== "\n") index += 1;
        continue;
      }
      if (current === "/" && next === "*") {
        hits.push(line);
        index += 2;
        while (index < source.length && !(source[index] === "*" && source[index + 1] === "/")) {
          if (source[index] === "\n") line += 1;
          index += 1;
        }
        index += 2;
        continue;
      }
      index += 1;
      continue;
    }

    if (current === "\\") {
      index += 2;
      continue;
    }
    if (current === "\n") line += 1;
    if (current === state) state = "code";
    index += 1;
  }

  return [...new Set(hits)];
}

for (const file of process.argv.slice(2)) {
  const hits = scan(file);
  if (hits.length === 0) continue;
  process.stderr.write(
    `Comment(s) found in ${file} at line(s) ${hits.join(", ")}. ` +
      "Prefer self-explanatory code; keep only comments that explain an unavoidable non-obvious constraint.\n",
  );
}

process.exit(0);
