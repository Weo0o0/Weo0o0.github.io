const fs = require("fs");
const path = require("path");

const srcDir = "/tmp/blog-backup/_posts";
const destDir = path.join(__dirname, "..", "content", "posts");

if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

const files = fs.readdirSync(srcDir).filter((f) => f.endsWith(".md"));

files.forEach((filename) => {
  const content = fs.readFileSync(path.join(srcDir, filename), "utf-8");

  let migrated = content;

  // Fix: `tag:` → `tags:` in front matter
  migrated = migrated.replace(/^tag\s*:/m, "tags:");

  // Remove Jekyll-specific {: .notice--*} kramdown attributes (keep content)
  migrated = migrated.replace(/\{:\s*\.notice--\w+\s*\}/g, "");

  // Remove {: .btn ...} attributes
  migrated = migrated.replace(/\{:\s*\.btn[^}]*\}/g, "");

  // Convert Jekyll video includes to iframe
  migrated = migrated.replace(
    /\{%\s*include\s+video\s+id="([^"]+)"\s+provider="youtube"\s*%\}/g,
    '<iframe width="100%" height="400" src="https://www.youtube.com/embed/$1" frameBorder="0" allowFullScreen></iframe>'
  );

  // Fix image paths: ../images/ → /images/posts/
  migrated = migrated.replace(/\.\.\/(images\/)/g, "/images/posts/../images/");
  migrated = migrated.replace(/\.\.\/images\//g, "/images/posts/");

  // Write as .md (next-mdx-remote handles md files fine)
  fs.writeFileSync(path.join(destDir, filename), migrated);
  console.log(`Migrated: ${filename}`);
});

console.log(`\nDone! Migrated ${files.length} posts.`);
