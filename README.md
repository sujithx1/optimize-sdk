# 🚀 OptimizeGuard

OptimizeGuard is a lightweight **code optimization guard** that helps developers check whether their code is **optimized, safe, and type-correct before committing or pushing**.

It runs with **one simple command** and gives **clear, human-readable feedback** — no complex setup needed.

---

## 🌟 Why OptimizeGuard?

Many code issues are found **after pushing** or during **code review**.
OptimizeGuard catches them **early**, right on your machine.

✔ Faster feedback  
✔ Cleaner commits  
✔ Better code quality  
✔ Developer-friendly output  

---

## 🔍 What does it check?

### ⚡ Performance
- `await` inside loops
- Blocking or inefficient patterns

### 🧠 Type Safety
- Usage of `any`
- Unsafe or missing TypeScript types

### 🔐 Security
- Hardcoded secrets
- `eval()` and unsafe executions

### 🧹 Code Quality
- Common anti-patterns
- Unoptimized logic hints

---

## 📦 Installation

```bash
npm install -g @sujithx1/optimizeguard


▶️ Usage
optimizeguard

Example output
❌ OptimizeGuard failed

• Performance issue: await inside loop (src/api/user.ts)
• Type issue: usage of 'any' (src/services/auth.ts)

Fix the issues and try again.


If everything is good:
✅ OptimizeGuard passed
Your code is optimized and safe to commit 🎉


🔗 Use as Pre-Commit Hook (Recommended)

Automatically block bad commits.
npx husky add .husky/pre-commit "optimizeguard"


