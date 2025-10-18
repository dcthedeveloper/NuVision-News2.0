import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // UI libraries / icons
          vendor_ui: [
            "react",
            "react-dom",
            "@tanstack/react-query",
            "lucide-react",
            "react-router-dom",
          ],
          // Visualization
          vendor_viz: [
            "recharts",
            "embla-carousel-react",
            "react-day-picker",
          ],
        },
      },
    },
    commonjsOptions: {
      // helps when dependencies mix ESM/CJS
      transformMixedEsModules: true,
    },
  },
  optimizeDeps: {
    // Do NOT prebundle heavy transformers lib; it's dynamically imported
    exclude: ["@huggingface/transformers"],
  },
}));
