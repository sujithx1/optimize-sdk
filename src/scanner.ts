import {glob} from "glob";

export async function scanProject() {
  return glob.sync("**/*.{ts,js}", { ignore: ["node_modules/**", "dist/**"] });
}
