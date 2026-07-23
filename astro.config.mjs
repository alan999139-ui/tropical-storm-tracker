import { defineConfig } from 'astro/config';

// https://astro.build
export default defineConfig({
  site: 'https://tropicalstormtracker.example.com',
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
