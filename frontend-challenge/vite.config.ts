import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
      "a9b094137fe4.ngrok.app" // add your ngrok subdomain here
    ]
  }
});
