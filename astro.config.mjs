// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";
import playformCompress from "@playform/compress";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    build: {
      minify: false,
    },
  },

  output: "server",

  adapter: cloudflare({
    webAnalytics: {
      enabled: true,
    },
    imagesConfig: {
      sizes: [240, 340, 640, 768, 1024],
      domains: [],
      minimumCacheTTL: 60,
    },
    edgeMiddleware: true,
    imageService: true,
  }),

  integrations: [playformCompress(), react()],
});
