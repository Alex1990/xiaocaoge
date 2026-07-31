const imported = await import("../../data/SiteConfig.mjs");
const siteConfig = (imported as unknown as { default?: unknown }).default ?? imported;

export default siteConfig as {
  siteTitle: string;
  siteTitleShort: string;
  siteTitleAlt: string;
  siteLogo: string;
  siteUrl: string;
  pathPrefix: string;
  siteDescription: string;
  siteRss: string;
  googleAnalyticsID?: string;
  disqusShortname?: string;
  postDefaultCategoryID?: string;
  dateFromFormat: string;
  dateFormat: string;
  userName?: string;
  userLocation?: string;
  userAvatar?: string;
  userDescription?: string;
  userLinks?: Array<{ label: string; url: string; iconClassName: string }>;
  copyright?: string;
};
