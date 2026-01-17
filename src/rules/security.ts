import * as fs from "fs";

export const securityRules = [
  {
    name: "hardcoded-secret",
    async check(file: string) {
      const content = fs.readFileSync(file, "utf8");
      return /(API_KEY|SECRET|TOKEN)\s*=\s*['"]/i.test(content)
        ? [{ type: "SEC", file, msg: "Hardcoded secret detected" }]
        : [];
    },
  },
];
