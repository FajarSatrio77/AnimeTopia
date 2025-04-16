// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel/static";
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

  output: "static",

  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),

  integrations: [playformCompress(), react()],
});
