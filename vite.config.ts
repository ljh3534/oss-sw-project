import { defineConfig } from "vitest/config";

export default defineConfig({
  // GitHub Pages(https://ljh3534.github.io/oss-sw-project/) 하위 경로 배포
  base: "/oss-sw-project/",
  test: {
    include: ["tests/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: ["src/calculator.ts"],
      reporter: ["text", "lcov"],
      thresholds: { lines: 90, functions: 90, branches: 85 },
    },
  },
});
