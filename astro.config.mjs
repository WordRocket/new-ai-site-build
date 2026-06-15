// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import siteConfig from './src/data/site-config.json';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: siteConfig.url,
  vite: {
    plugins: [tailwindcss()],
  },
});
