import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [react()],
    server: {
      port: 3000,
      host: true,
      watch: {
        usePolling: true,
      },
      esbuild: {
        target: "esnext",
        platform: "linux",
      },
    },
    define: {
      VITE_APP_PATH_PREFIX: JSON.stringify(env.VITE_APP_PATH_PREFIX),
      VITE_APP_BACKEND_URL: JSON.stringify(env.VITE_APP_BACKEND_URL),
    },
  };
});
