// OptimizeGuard v1 - High Performance Code Quality Gate SDK
// Bun / Node compatible

// package.json
/*
{
  "name": "optimizeguard",
  "version": "1.0.0",
  "type": "module",
  "bin": { "optimizeguard": "dist/cli.js" },
  "scripts": {
    "build": "bun build src/cli.ts --outdir dist",
    "dev": "bun src/cli.ts"
  },
  "dependencies": {
    "@typescript-eslint/parser": "^7.0.0",
    "esbuild": "^0.20.0",
    "glob": "^10.3.10"
  }
}
*/

// src/cli.ts
#!/usr/bin/env bun
import { runOptimizeGuard } from "./engine.js";

const result = await runOptimizeGuard();
if (!result.ok) process.ex it(1);

// src/engine.ts
import { scanProject } from "./scanner.js";
import { runRules } from "./rules/index.js";
import { report } from "./reporter.js";

export async function runOptimizeGuard() {
  console.log("⚡ OptimizeGuard v1 running...\n");
  const files = await scanProject();
  const issues = await runRules(files);
  report(issues);
  return { ok: issues.length === 0 };
}

// src/scanner.ts
import glob from "glob";
export async function scanProject() {
  return glob.sync("**/*.{ts,js}", { ignore: ["node_modules/**", "dist/**"] });
}

// src/rules/index.ts
import { perfRules } from "./performance.js";
import { securityRules } from "./security.js";

export async function runRules(files: string[]) {
  const all = [...perfRules, ...securityRules];
  const issues = [] as any[];
  for (const file of files) for (const r of all) issues.push(...(await r.check(file)));
  return issues;
}

// src/rules/performance.ts
import fs from "fs";
export const perfRules = [
  {
    name: "await-in-loop",
    async check(file: string) {
      const c = fs.readFileSync(file, "utf8");
      return /for\s*\(.*\)\s*{[\s\S]*await/.test(c)
        ? [{ type: "PERF", file, msg: "await inside loop" }]
        : [];
    },
  },
];

// src/rules/security.ts
import fs from "fs";
export const securityRules = [
  {
    name: "hardcoded-secret",
    async check(file: string) {
      const c = fs.readFileSync(file, "utf8");
      return /(API_KEY|SECRET|TOKEN)\s*=\s*['\"]/i.test(c)
        ? [{ type: "SEC", file, msg: "Hardcoded secret detected" }]
        : [];
    },
  },
];

// src/reporter.ts
export function report(issues: any[]) {
  if (!issues.length) return console.log("✅ Code is optimized and safe!\n");
  for (const i of issues) console.log(`❌ [${i.type}] ${i.msg} → ${i.file}`);
  console.log(`\nScore: ${100 - issues.length * 5} / 100`);
}
