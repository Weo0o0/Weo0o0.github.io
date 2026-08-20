const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const postsDir = path.join(__dirname, "..", "content", "posts");
const outFile = path.join(__dirname, "..", "public", "search-index.json");

const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

function extractExcerpt(content) {
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

const posts = files
  .map((filename) => {
    const content = fs.readFileSync(path.join(postsDir, filename), "utf-8");
    const { data, content: body } = matter(content);

    if (data.published === false) return null;

    const slug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.mdx?$/, "");
    const dateMatch = filename.match(/^(\d{4}-\d{2}-\d{2})/);
    const categories = data.categories
      ? Array.isArray(data.categories) ? data.categories : data.categories.split(" ")
      : [];
    const tags = data.tags || data.tag || [];

    return {
      slug,
      title: data.title || slug,
      date: data.date || (dateMatch ? dateMatch[1] : ""),
      categories,
      tags: Array.isArray(tags) ? tags : [tags],
      excerpt: extractExcerpt(body),
      readingTime: Math.ceil(body.split(/\s+/).length / 200) + " min read",
      published: true,
      toc: data.toc !== false,
    };
  })
  .filter(Boolean)
  .sort((a, b) => (a.date > b.date ? -1 : 1));

fs.writeFileSync(outFile, JSON.stringify(posts, null, 2));
console.log(`Generated search index with ${posts.length} posts`);
