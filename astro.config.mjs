import { defineConfig } from "astro/config";
import siteConfig from "./data/SiteConfig.mjs";

const base = siteConfig.pathPrefix && siteConfig.pathPrefix !== "/" ? siteConfig.pathPrefix : "/";

export default defineConfig({
  site: siteConfig.siteUrl,
  base,
  trailingSlash: "always",
});
