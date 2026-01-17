import { perfRules } from "./performance.js";
import { securityRules } from "./security.js";

export async function runRules(files: string[]) {
  const all = [...perfRules, ...securityRules];
  const issues: any[] = [];

  for (const file of files) {
    for (const rule of all) {
      issues.push(...(await rule.check(file)));
    }
  }

  return issues;
}
