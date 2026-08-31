// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import siteConfig from './src/data/site-config.json';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: siteConfig.url,
  trailingSlash: 'always',
  integrations: [sitemap(), react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
