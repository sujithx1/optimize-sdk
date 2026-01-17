import { perfRules } from "./performance";
import { securityRules } from "./security";
import { typeRules } from "./type";

export async function runRules(files: string[]) {
  const all = [...perfRules, ...securityRules, ...typeRules];
  const issues: any[] = [];

  for (const file of files) {
    for (const rule of all) {
      issues.push(...(await rule.check(file)));
    }
  }

  return issues;
}
