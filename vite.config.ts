import solid from "solid-start/vite";
import { defineConfig } from "vite";
import denoAdapter from "solid-start-deno";
import { imagetools } from "vite-imagetools";

export default defineConfig({
  plugins: [
    imagetools(),
    solid({
      adapter: denoAdapter(),
    }),
  ],
});
