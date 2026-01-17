export function report(issues: any[]) {
  if (!issues.length) return console.log("✅ Code is optimized and safe!\n");

  for (const i of issues) {
    console.log(`❌ [${i.type}] ${i.msg} → ${i.file}`);
  }

  console.log(`\nScore: ${Math.max(0, 100 - issues.length * 5)} / 100`);
}
