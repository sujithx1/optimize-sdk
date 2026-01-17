// src/rules/types.ts
import { execSync } from "child_process";

export const typeRules = [
  {
    name: "typescript-check",
    async check(_file: string) {
      try {
        // Run tsc in noEmit mode
        execSync("tsc --noEmit", { stdio: "pipe" });
        return [];
      } catch (e: any) {
        // Extract errors
        const output = e.stdout?.toString() || e.message || "Type check failed";
        const errors = output
          .split("\n")
          .filter((line: string) => line.trim() !== "")
          .map((line: string) => ({ type: "TYPE", file: "ts", msg: line }));
        return errors;
      }
    },
  },
];
