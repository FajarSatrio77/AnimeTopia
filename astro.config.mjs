// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import cloudflare from "@astrojs/cloudflare";
import playformCompress from "@playform/compress";
import react from "@astrojs/react";
import path from "path";

// https://astro.build/config
export default defineConfig({
  vite: {
    build: {
      minify: false,
    },
    resolve: {
      alias: {
        "~": path.resolve("./src")
      }
    }
  },

  integrations: [tailwind(), playformCompress(), react()],
});
