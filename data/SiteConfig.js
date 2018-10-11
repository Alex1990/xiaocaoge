module.exports = {
  siteTitle: "小曹哥的博客", // Site title.
  siteTitleShort: "小曹哥", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: "小曹哥的博客", // Alternative site title for SEO.
  siteLogo: "/favicon/favicon.png", // Logo used for SEO and manifest.
  siteUrl: "https://xiaocaoge.com", // Domain of your website without pathPrefix.
  pathPrefix: "/", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription: "记录前端技术，如 HTML、CSS、JavaScript、React，也记录生活", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteFBAppID: "", // FB Application ID for using app insights
  googleAnalyticsID: "UA-49539922-1", // GA tracking ID.
  disqusShortname: "xiaocaoge", // Disqus shortname.
  postDefaultCategoryID: "其他", // Default category for posts.
  dateFromFormat: "YYYY-MM-DD", // Date format used in the frontmatter.
  dateFormat: "YYYY-MM-DD", // Date format for display.
  userName: "Alex", // Username to display in the author segment.
  userTwitter: "", // Optionally renders "Follow Me" in the UserInfo segment.
  userLocation: "Earth", // User location to display in the author segment.
  userAvatar: "https://api.adorable.io/avatars/150/test.png", // User avatar to display in the author segment.
  userDescription:
    "", // User description to display in the author segment.
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
    {
      label: "GitHub",
      url: "https://github.com/Alex1990",
      iconClassName: "fa fa-github"
    },
    {
      label: "Twitter",
      url: "https://twitter.com/AlexChaoHere",
      iconClassName: "fa fa-twitter"
    },
    {
      label: "Email",
      url: "mailto:alexchao1990@gmail.com",
      iconClassName: "fa fa-envelope"
    }
  ],
  copyright: "Copyright © forever. Alex Chao", // Copyright string for the footer of the website and RSS feed.
  themeColor: "#c62828", // Used for setting manifest and progress theme colors.
  backgroundColor: "#e0e0e0" // Used for setting manifest background color.
};
