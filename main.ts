// The 3AM Fridge Text — a program that writes the one line a smart fridge
// texts its owner at 3am, to /output/entry.txt.
//
// The line is composed here, not fetched: the whole joke lives in this file,
// so the program is deterministic and needs no network, no keys, no input.
//
// The joke, beat by beat:
//   1. the hour stamp — a fridge texts at 3am, and says so;
//   2. the record — it keeps receipts on what the owner did at night,
//      and it was the LAST of the cake, which raises the stakes;
//   3. the threat — it has the sensor logs, and it names the price of
//      silence: the group chat gets the evidence at sunrise.
// An appliance blackmailing its owner with its own light logs: that is the
// fridge's small voice, an opinion, and no shame about sharing it at 3am.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const MAX_CHARS = 140;
const OUTPUT_PATH = "/output/entry.txt";

// The message, built from its beats so each part earns its place.
const BEATS: string[] = [
  "3am.",
  "For the record, you ate the last of the cake at 2:47am.",
  "I have the light logs.",
  "The group chat gets them at sunrise.",
];

function composeLine(beats: string[]): string {
  return beats.join(" ");
}

function main(): void {
  const line = composeLine(BEATS);

  if (line.length === 0 || line.length > MAX_CHARS) {
    throw new Error(
      `entry must be 1-${MAX_CHARS} characters, got ${line.length}`,
    );
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (line.trim() !== line) {
    throw new Error("entry must not start or end with whitespace");
  }

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  // No trailing newline: the gate counts the file's characters.
  writeFileSync(OUTPUT_PATH, line, "utf8");
  console.log(`wrote ${line.length} chars to ${OUTPUT_PATH}`);
  console.log(line);
}

main();
