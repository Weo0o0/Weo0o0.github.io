import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  categories: string[];
  tags: string[];
  published: boolean;
  toc: boolean;
  readingTime: string;
  excerpt: string;
}

export interface Post extends PostMeta {
  content: string;
}

function extractDate(filename: string): string {
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : "";
}

function extractExcerpt(content: string): string {
  const cleaned = content
    .replace(/^#{1,6}\s+.*$/gm, "")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[.*?\]\(.*?\)/g, "")
    .replace(/[*_`~]/g, "")
    .replace(/{:.*?}/g, "")
    .replace(/<[^>]+>/g, "")
    .trim();
  const lines = cleaned.split("\n").filter((l) => l.trim().length > 10);
  return lines.slice(0, 2).join(" ").slice(0, 200) + "...";
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const filenames = fs.readdirSync(postsDirectory);
  const posts = filenames
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((filename) => {
      const slug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.mdx?$/, "");
      const fullPath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(fullPath, "utf-8");
      const { data, content } = matter(fileContents);
      const stats = readingTime(content);

      const categories = data.categories
        ? Array.isArray(data.categories)
          ? data.categories
          : data.categories.split(" ")
        : [];

      const tags = data.tags || data.tag || [];

      return {
        slug,
        title: data.title || slug,
        date: data.date || extractDate(filename),
        categories: categories.map((c: string) => c.trim()),
        tags: Array.isArray(tags) ? tags : [tags],
        published: data.published !== false,
        toc: data.toc !== false,
        readingTime: stats.text,
        excerpt: extractExcerpt(content),
      };
    })
    .filter((post) => post.published)
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  if (!fs.existsSync(postsDirectory)) return null;

  const filenames = fs.readdirSync(postsDirectory);
  const filename = filenames.find((f) => {
    const fSlug = f.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.mdx?$/, "");
    return fSlug === slug;
  });

  if (!filename) return null;

  const fullPath = path.join(postsDirectory, filename);
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  const categories = data.categories
    ? Array.isArray(data.categories)
      ? data.categories
      : data.categories.split(" ")
    : [];

  const tags = data.tags || data.tag || [];

  return {
    slug,
    title: data.title || slug,
    date: data.date || extractDate(filename),
    categories: categories.map((c: string) => c.trim()),
    tags: Array.isArray(tags) ? tags : [tags],
    published: data.published !== false,
    toc: data.toc !== false,
    readingTime: stats.text,
    excerpt: extractExcerpt(content),
    content,
  };
}

export function getAllCategories(): { name: string; count: number }[] {
  const posts = getAllPosts();
  const catMap = new Map<string, number>();
  posts.forEach((post) => {
    post.categories.forEach((cat) => {
      catMap.set(cat, (catMap.get(cat) || 0) + 1);
    });
  });
  return Array.from(catMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAllTags(): { name: string; count: number }[] {
  const posts = getAllPosts();
  const tagMap = new Map<string, number>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });
  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter((post) =>
    post.categories.some((c) => c.toLowerCase() === category.toLowerCase())
  );
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}
