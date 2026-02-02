import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: {
    compilerOptions: {
      composite: false,
      declaration: true,
      declarationMap: true,
    },
  },
  entry: ["src/index.ts", "src/react/index.ts"],
  external: [
    "react",
    "@tanstack/react-query",
    "elysia",
    "@elysiajs/eden",
    "server",
  ],
  format: ["esm"],
  splitting: true,
  treeshake: true,
});
