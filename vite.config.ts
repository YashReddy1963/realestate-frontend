import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

function ghPagesSpaFix() {
  return {
    name: "gh-pages-spa-fix",
    closeBundle() {
      const distDir = path.resolve(__dirname, "dist");
      const indexFile = path.resolve(distDir, "index.html");
      const fallbackFile = path.resolve(distDir, "404.html");

      if (fs.existsSync(indexFile)) {
        fs.copyFileSync(indexFile, fallbackFile);
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), ghPagesSpaFix()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/realestate-frontend/",  
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
  },
});
