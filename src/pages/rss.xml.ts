import rss from '@astrojs/rss';
import siteConfig from '../lib/siteConfig';
import { getAllPosts } from '../lib/posts';

export async function GET() {
  const posts = await getAllPosts();

  return rss({
    title: siteConfig.siteTitle,
    description: siteConfig.siteDescription,
    site: siteConfig.siteUrl,
    items: posts
      .filter((p) => p.isoDate)
      .map((p) => ({
        title: p.title,
        pubDate: new Date(p.isoDate as string),
        description: p.excerpt,
        link: p.slug
      }))
  });
}
