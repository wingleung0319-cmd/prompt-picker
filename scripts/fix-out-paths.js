/**
 * After static export, replace absolute paths /_next with ./_next
 * so that out/ works when opened as file:// (e.g. double-click index.html).
 */
const fs = require("fs");
const path = require("path");

const outDir = path.join(__dirname, "..", "out");
if (!fs.existsSync(outDir)) {
  console.warn("scripts/fix-out-paths.js: out/ not found, skipping.");
  process.exit(0);
}

function walk(dir, callback) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, callback);
    else callback(full);
  }
}

let count = 0;
walk(outDir, (file) => {
  const ext = path.extname(file);
  if (![".html", ".js", ".css", ".json"].includes(ext)) return;
  let s = fs.readFileSync(file, "utf8");
  const before = s;
  s = s.replace(/"\/_next/g, '"./_next').replace(/'\/_next/g, "'./_next");
  if (s !== before) {
    fs.writeFileSync(file, s);
    count++;
  }
});

if (count > 0) console.log("fix-out-paths: updated", count, "file(s) for file:// support.");
