// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import siteConfig from './src/data/site-config.json';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: siteConfig.url,
  integrations: [sitemap(), icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});
