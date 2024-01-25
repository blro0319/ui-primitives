import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
      "#examples": resolve(__dirname, "examples"),
      "#playground": resolve(__dirname, "playground"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "blro-ui-primitives",
      fileName: "index",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
        assetFileNames({ name }) {
          return name === "style.css" ? "index.css" : name;
        },
      },
    },
  },
});
