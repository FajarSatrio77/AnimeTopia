// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import staticAdapter from "@astrojs/adapter-static";
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

  adapter: staticAdapter({
    platformProxy: {
      enabled: true,
    },
    routes: {
      strategy: 'include',
      exclude: [],
    },
  }),

  integrations: [playformCompress(), react()],
});
