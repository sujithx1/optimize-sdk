import { scanProject } from "./scanner.js";
import { runRules } from "./rules/index.js";
import { report } from "./rules/reporter.js";

export async function runOptimizeGuard() {
  console.log("⚡ OptimizeGuard v1 running...\n");

  const files = await scanProject();
  const issues = await runRules(files);

  report(issues);

  return { ok: issues.length === 0 };
}
