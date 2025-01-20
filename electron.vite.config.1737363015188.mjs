// electron.vite.config.ts
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import react from "@vitejs/plugin-react";
var electron_vite_config_default = defineConfig({
  main: {
    plugins: [externalizeDepsPlugin(), tsconfigPaths()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    plugins: [react(), tsconfigPaths()],
    server: {
      port: 5123,
      strictPort: true
    }
  }
});
export {
  electron_vite_config_default as default
};
