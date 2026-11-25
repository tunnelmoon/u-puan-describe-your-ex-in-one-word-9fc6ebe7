import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "recalled";

function main(): void {
  if (WORD.length < 1 || WORD.length > 111) {
    throw new Error(`entry must be 1 to 111 characters, got ${WORD.length}`);
  }
  if (WORD.trim() !== WORD || WORD.length === 0) {
    throw new Error("entry must not be only whitespace or have surrounding whitespace");
  }
  if (/\s/.test(WORD)) {
    throw new Error("entry must be exactly one word, no whitespace allowed");
  }
  if (!/^[A-Za-z]+$/.test(WORD)) {
    throw new Error("entry must be letters only, no punctuation tricks");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, WORD, "utf8");
  const back = readFileSync(outPath, "utf8");
  if (back !== WORD) {
    throw new Error("round-trip read-back mismatch");
  }
  console.log(`wrote ${outPath} (${WORD.length} chars)`);
}

main();
