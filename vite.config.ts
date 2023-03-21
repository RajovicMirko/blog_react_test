import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: resolve("./src"),
    },
  },
  plugins: [react(), eslint()],
});
