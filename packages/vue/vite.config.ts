import vue from "@vitejs/plugin-vue";
import vueJSX from "@vitejs/plugin-vue-jsx";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import { dependencies, peerDependencies } from "./package.json";

export default defineConfig({
  plugins: [vue(), vueJSX()],
  build: {
    outDir: "./dist",
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      fileName: "index",
      formats: ["cjs", "es"],
    },
    rollupOptions: {
      external: [
        ...Object.keys(dependencies),
        ...Object.keys(peerDependencies),
      ],
      output: {
        globals: [
          ...Object.keys(dependencies),
          ...Object.keys(peerDependencies),
        ].reduce(
          (acc, name) => ({ ...acc, [name]: name }),
          {} as Record<string, string>
        ),
      },
    },
  },
  resolve: {
    alias: {
      "@blro/ui-primitives-vue": resolve(__dirname, "src/"),
      "#playground": resolve(__dirname, "playground/"),
    },
  },
});
