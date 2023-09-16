import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "Push Notification Alert",
        short_name: "Push Notification Alert",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        scope: "/",
        icons: [
          {
            src: "/icons/alert_icon.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
        ]
      }
    }),
  ],
});
