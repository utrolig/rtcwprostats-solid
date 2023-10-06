import solid from "solid-start/vite";
import { defineConfig } from "vite";
import denoAdapter from "solid-start-deno";

export default defineConfig({
  plugins: [
    solid({
      adapter: denoAdapter(),
    }),
  ],
});
