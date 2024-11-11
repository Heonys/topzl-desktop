import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
    plugins: [react()],
    base: "./",
    build: {
      outDir: "dist-renderer"
    },
    server: {
        port: 5123,
        strictPort: true
    }
})
