import * as fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import _ from 'lodash';
import * as dayjsImport from 'dayjs';
import * as customParseFormatImport from 'dayjs/plugin/customParseFormat';
import siteConfig from './siteConfig';

export type Post = {
  filePath: string;
  slug: string;
  slugParam: string;
  title: string;
  date: string;
  isoDate: string | null;
  excerpt: string;
  html: string;
  timeToRead: number;
  tags: string[];
  category: string | null;
  cover: string | null;
  description: string | null;
};

const contentRoot = path.resolve(process.cwd(), 'content');
const require = createRequire(import.meta.url);
const dayjs = (dayjsImport as unknown as { default?: typeof dayjsImport }).default ?? (dayjsImport as unknown as any);
const customParseFormat =
  (customParseFormatImport as unknown as { default?: unknown }).default ?? (customParseFormatImport as unknown as any);
dayjs.extend(customParseFormat);

function escapeHtml(input: string) {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

const md: MarkdownIt = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight(code: string, language?: string): string {
    try {
      const Prism = require('prismjs');
      require('prismjs/components/');
      const lang = language && Prism.languages[language] ? language : 'markup';
      const highlighted = Prism.highlight(code, Prism.languages[lang], lang);
      return `<pre class="language-${lang}"><code class="language-${lang}">${highlighted}</code></pre>`;
    } catch {
      return `<pre><code>${escapeHtml(code)}</code></pre>`;
    }
  }
});

let cachedPosts: Post[] | null = null;

async function walkMarkdownFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...(await walkMarkdownFiles(fullPath)));
        return;
      }
      if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
        files.push(fullPath);
      }
    })
  );
  return files;
}

function toPosixPath(p: string) {
  return p.split(path.sep).join('/');
}

function buildSlugFromFile(contentFilePath: string) {
  const rel = toPosixPath(path.relative(contentRoot, contentFilePath));
  const parsed = path.posix.parse(rel);
  let slug: string;
  if (parsed.name !== 'index' && parsed.dir !== '') {
    slug = `/${parsed.dir}/${parsed.name}/`;
  } else if (parsed.dir === '') {
    slug = `/${parsed.name}/`;
  } else {
    slug = `/${parsed.dir}/`;
  }
  return slug;
}

function normalizeSlug(slug: string) {
  let s = slug.trim();
  if (!s.startsWith('/')) s = `/${s}`;
  if (!s.endsWith('/')) s = `${s}/`;
  return s;
}

function slugToParam(slug: string) {
  return slug.replace(/^\/+/, '').replace(/\/+$/, '');
}

function stripHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
    .replace(/<\/?[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function estimateTimeToRead(text: string) {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export async function getAllPosts(): Promise<Post[]> {
  if (cachedPosts) return cachedPosts;

  const files = await walkMarkdownFiles(contentRoot);
  const posts: Post[] = [];

  for (const filePathAbs of files) {
    const raw = await fs.readFile(filePathAbs, 'utf8');
    const { data, content } = matter(raw);

    const fm = data as Record<string, unknown>;
    const title = typeof fm.title === 'string' && fm.title.trim() ? fm.title.trim() : path.parse(filePathAbs).name;
    const cover = typeof fm.cover === 'string' ? fm.cover : null;
    const description = typeof fm.description === 'string' ? fm.description : null;

    const rawTags = fm.tags;
    const tags = Array.isArray(rawTags)
      ? rawTags.map((t) => String(t)).filter(Boolean)
      : typeof rawTags === 'string'
        ? rawTags.split(',').map((t) => t.trim()).filter(Boolean)
        : [];

    const category = typeof fm.category === 'string' && fm.category.trim() ? fm.category.trim() : null;

    const dateFromFormat = siteConfig.dateFromFormat || 'YYYY-MM-DD';
    const dateValue = fm.date;
    let dateString: string | null = null;
    let isoDate: string | null = null;

    if (typeof dateValue === 'string') {
      const cleaned = dateValue.trim();
      dateString = cleaned;
      const formats = [
        dateFromFormat,
        `${dateFromFormat} HH:mm`,
        `${dateFromFormat} HH:mm:ss`,
        'YYYY-MM-DDTHH:mm:ssZ',
        'YYYY-MM-DDTHH:mm:ss.SSSZ'
      ];
      const parsed = cleaned ? dayjs(cleaned, formats, true) : null;
      isoDate = parsed && parsed.isValid() ? parsed.toISOString() : null;
    } else if (dateValue instanceof Date) {
      const parsed = dayjs(dateValue);
      if (parsed.isValid()) {
        isoDate = parsed.toISOString();
        dateString = parsed.format(dateFromFormat);
      }
    } else if (typeof dateValue === 'number') {
      const parsed = dayjs(dateValue);
      if (parsed.isValid()) {
        isoDate = parsed.toISOString();
        dateString = parsed.format(dateFromFormat);
      }
    }

    const slugFromFile = buildSlugFromFile(filePathAbs);
    const slugFromFrontmatter =
      typeof fm.slug === 'string' && fm.slug.trim() ? `/${_.kebabCase(fm.slug.trim())}/` : null;
    const slug = normalizeSlug(slugFromFrontmatter ?? slugFromFile);

    const html = md.render(content);
    const excerptSource = description ?? stripHtml(html);
    const excerpt = excerptSource.length > 180 ? `${excerptSource.slice(0, 180)}…` : excerptSource;

    posts.push({
      filePath: filePathAbs,
      slug,
      slugParam: slugToParam(slug),
      title,
      date: dateString ?? '',
      isoDate,
      excerpt,
      html,
      timeToRead: estimateTimeToRead(excerptSource),
      tags,
      category,
      cover,
      description
    });
  }

  posts.sort((a, b) => {
    const aTime = a.isoDate ? dayjs(a.isoDate).valueOf() : 0;
    const bTime = b.isoDate ? dayjs(b.isoDate).valueOf() : 0;
    return bTime - aTime;
  });

  cachedPosts = posts;
  return posts;
}

export async function getPostBySlugParam(slugParam: string): Promise<Post | null> {
  const requested = slugParam.replace(/^\/+/, '').replace(/\/+$/, '');
  const posts = await getAllPosts();
  return posts.find((p) => p.slugParam === requested) ?? null;
}

export async function getAllTags() {
  const posts = await getAllPosts();
  const map = new Map<string, string>();
  for (const p of posts) {
    for (const tag of p.tags) {
      map.set(_.kebabCase(tag), tag);
    }
  }
  return Array.from(map.entries())
    .map(([kebab, label]) => ({ kebab, label }))
    .sort((a, b) => a.kebab.localeCompare(b.kebab));
}

export async function getAllCategories() {
  const posts = await getAllPosts();
  const map = new Map<string, string>();
  for (const p of posts) {
    if (!p.category) continue;
    map.set(_.kebabCase(p.category), p.category);
  }
  return Array.from(map.entries())
    .map(([kebab, label]) => ({ kebab, label }))
    .sort((a, b) => a.kebab.localeCompare(b.kebab));
}

export async function getPostsByTagKebab(tagKebab: string) {
  const posts = await getAllPosts();
  return posts.filter((p) => p.tags.some((t) => _.kebabCase(t) === tagKebab));
}

export async function getPostsByCategoryKebab(categoryKebab: string) {
  const posts = await getAllPosts();
  return posts.filter((p) => p.category && _.kebabCase(p.category) === categoryKebab);
}

export function postsToEdges(posts: Post[]) {
  return posts.map((p) => ({
    node: {
      excerpt: p.excerpt,
      timeToRead: p.timeToRead,
      frontmatter: {
        title: p.title,
        cover: p.cover,
        category: p.category,
        tags: p.tags,
        date: p.date
      },
      fields: {
        slug: p.slug,
        date: p.isoDate ?? ''
      }
    }
  }));
}

export async function getAllPostEdges() {
  const posts = await getAllPosts();
  return postsToEdges(posts);
}
