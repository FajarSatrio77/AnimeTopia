// @ts-check
import { defineConfig } from "astro/config";
<<<<<<< HEAD
import tailwindcss from "@tailwindcss/vite";
import playformCompress from "@playform/compress";
import react from "@astrojs/react";
=======
import tailwind from "@astrojs/tailwind";
import cloudflare from "@astrojs/cloudflare";
import playformCompress from "@playform/compress";
import react from "@astrojs/react";
import path from "path";
>>>>>>> be07b8cf48f62cfa635d431149ccc7ab95653c51

// https://astro.build/config
export default defineConfig({
  vite: {
<<<<<<< HEAD
    plugins: [tailwindcss()],
    build: {
      minify: false,
    },
  },

  // output: "server",

  // adapter: cloudflare({
  //   webAnalytics: {
  //     enabled: true,
  //   },
  //   imagesConfig: {
  //     sizes: [240, 340, 640, 768, 1024],
  //     domains: [],
  //     minimumCacheTTL: 60,
  //   },
  //   edgeMiddleware: true,
  //   imageService: true,
  // }),

  integrations: [playformCompress(), react()],
=======
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
>>>>>>> be07b8cf48f62cfa635d431149ccc7ab95653c51
});
