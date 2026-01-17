#!/usr/bin/env bun
import { runOptimizeGuard } from "./engine.js";

const result = await runOptimizeGuard();

if (!result.ok) process.exit(1);
