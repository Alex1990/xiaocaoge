import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import siteConfig from './data/SiteConfig.mjs';

const base = siteConfig.pathPrefix && siteConfig.pathPrefix !== '/' ? siteConfig.pathPrefix : '/';

export default defineConfig({
  site: siteConfig.siteUrl,
  base,
  trailingSlash: 'always',
  integrations: [react()],
});
