import { glob } from "glob";
import fs from "node:fs";

export async function scanProject() {
  if (!fs.existsSync("src")) {
    console.log(
      "🚫 No src folder found. Run from project root or skipping scan."
    );
    return [];
  }

  return glob("src/**/*.{ts,tsx,js,jsx}", {
    nodir: true,
    cwd: process.cwd(),
    ignore: ["**/node_modules/**"],
  });
}
