#!/bin/sh
input=$(cat)
file=$(printf '%s' "$input" | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{try{process.stdout.write(JSON.parse(d).tool_input.file_path||"")}catch{}})')

[ -z "$file" ] && exit 0
case "$file" in
  *src/*) ;;
  *) exit 0 ;;
esac
case "$file" in
  *.ts | *.tsx | *.css | *.json) ;;
  *) exit 0 ;;
esac
[ -f "$file" ] || exit 0

npx biome check --write "$file" >/dev/null 2>&1
exit 0
