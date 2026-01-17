import * as fs from "fs";
export const perfRules = [
  {
    name: "await-in-loop",
    async check(file: string) {
      const content = fs.readFileSync(file, "utf8");
      return /for\s*\(.*\)\s*{[\s\S]*await/.test(content)
        ? [{ type: "PERF", file, msg: "await inside loop" }]
        : [];
    },
  },
];
