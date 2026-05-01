import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  return {
    server: {
      port: 3000,
      host: "0.0.0.0",
    },
    plugins: [react()],
    define: {
      "process.env.API_KEY": JSON.stringify(env.GEMINI_API_KEY),
      "process.env.GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY),
      "process.env.OPENROUTER_API_KEY": JSON.stringify(env.OPENROUTER_API_KEY),
      "process.env.OPENROUTER_MODEL": JSON.stringify(env.OPENROUTER_MODEL),
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
            'vendor-motion': ['framer-motion'],
            'vendor-icons': ['lucide-react'],
            'vendor-utils': ['react-intersection-observer'],
          }
        }
      },
      chunkSizeWarningLimit: 1000,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        }
      }
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
  };
});
