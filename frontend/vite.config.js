import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Port 3000 so it matches the backend's CORS origin
export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
});
