
import { readdir } from "node:fs/promises";
import path from "node:path";

const IGNORE = new Set([
  "node_modules",
  "dist",
  "build",
  ".git",
  ".next",
  ".turbo"
]);

export async function scanProject(dir = process.cwd(), files: string[] = []) {
  const entries = await readdir(dir, { withFileTypes: true });

  await Promise.all(
    entries.map(async (entry) => {
      if (IGNORE.has(entry.name)) return;

      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await scanProject(fullPath, files);
      } else if (entry.name.endsWith(".ts")) {
        files.push(fullPath);
      }
    })
  );

  return files;
}
