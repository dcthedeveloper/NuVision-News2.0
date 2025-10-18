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
    // Optimize chunk size
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Manual chunks for better code splitting
        manualChunks: (id) => {
          // Vendor chunk for all node_modules
          if (id.includes('node_modules')) {
            // Separate large libraries into their own chunks
            if (id.includes('@huggingface/transformers')) {
              return 'transformers';
            }
            if (id.includes('recharts')) {
              return 'recharts';
            }
            if (id.includes('@radix-ui')) {
              return 'radix-ui';
            }
            if (id.includes('react-router-dom')) {
              return 'react-router';
            }
            // All other vendor libraries
            return 'vendor';
          }
        },
      },
    },
    // Enable minification (esbuild is default and faster than terser)
    minify: 'esbuild',
  },
  optimizeDeps: {
    // Pre-bundle dependencies for faster dev server startup
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['@huggingface/transformers'], // Don't pre-bundle transformers
  },
}));
