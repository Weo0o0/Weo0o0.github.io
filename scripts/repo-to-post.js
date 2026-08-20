#!/usr/bin/env node

/**
 * repo-to-post.js
 *
 * GitHub 리포지토리 URL → 블로그 포스트(MDX) + 옵시디언 노트 변환 CLI
 *
 * Usage:
 *   node scripts/repo-to-post.js <github-repo-url> [options]
 *
 * Options:
 *   --obsidian <path>   옵시디언 볼트 저장 경로 (기본: 저장 안 함)
 *   --category <name>   포스트 카테고리 (기본: "GitHub-Repo")
 *   --tags <t1,t2,...>  쉼표로 구분된 태그 목록
 *   --dry-run           파일 저장 없이 미리보기만
 *
 * Examples:
 *   node scripts/repo-to-post.js https://github.com/alibaba/page-agent
 *   node scripts/repo-to-post.js https://github.com/user/repo --obsidian ~/Obsidian/Vault --category AI --tags ai,agent
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

// ─── Config ─────────────────────────────────────────────────────
const BLOG_POSTS_DIR = path.join(__dirname, "..", "content", "posts");
const MAX_TREE_DEPTH = 3;
const MAX_TREE_FILES = 200;

// ─── CLI Args ───────────────────────────────────────────────────
function parseArgs() {
  const args = process.argv.slice(2);
  const config = {
    repoUrl: null,
    obsidianPath: null,
    category: "GitHub-Repo",
    tags: [],
    dryRun: false,
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--obsidian" && args[i + 1]) {
      config.obsidianPath = args[++i];
    } else if (args[i] === "--category" && args[i + 1]) {
      config.category = args[++i];
    } else if (args[i] === "--tags" && args[i + 1]) {
      config.tags = args[++i].split(",").map((t) => t.trim());
    } else if (args[i] === "--dry-run") {
      config.dryRun = true;
    } else if (!args[i].startsWith("--")) {
      config.repoUrl = args[i];
    }
  }

  return config;
}

// ─── GitHub API ─────────────────────────────────────────────────
function githubFetch(apiPath) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.github.com",
      path: apiPath,
      headers: {
        "User-Agent": "repo-to-post-cli",
        Accept: "application/vnd.github.v3+json",
      },
    };

    const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
    if (token) {
      options.headers.Authorization = `Bearer ${token}`;
    }

    https.get(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        if (res.statusCode !== 200) {
          reject(new Error(`GitHub API ${res.statusCode}: ${data.slice(0, 200)}`));
          return;
        }
        resolve(JSON.parse(data));
      });
    }).on("error", reject);
  });
}

function githubFetchRaw(apiPath) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.github.com",
      path: apiPath,
      headers: {
        "User-Agent": "repo-to-post-cli",
        Accept: "application/vnd.github.v3.raw",
      },
    };

    const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
    if (token) {
      options.headers.Authorization = `Bearer ${token}`;
    }

    https.get(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        if (res.statusCode !== 200) {
          reject(new Error(`GitHub API ${res.statusCode}: ${data.slice(0, 200)}`));
          return;
        }
        resolve(data);
      });
    }).on("error", reject);
  });
}

// ─── Parse Repo URL ─────────────────────────────────────────────
function parseRepoUrl(url) {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) throw new Error(`유효하지 않은 GitHub URL: ${url}`);
  return { owner: match[1], repo: match[2].replace(/\.git$/, "") };
}

// ─── Fetch Repo Data ────────────────────────────────────────────
async function fetchRepoData(owner, repo) {
  console.log(`📡 GitHub API에서 데이터 수집 중...`);

  const [repoInfo, tree, readme] = await Promise.all([
    githubFetch(`/repos/${owner}/${repo}`),
    githubFetch(`/repos/${owner}/${repo}/git/trees/HEAD?recursive=1`).catch(() => ({ tree: [] })),
    githubFetchRaw(`/repos/${owner}/${repo}/readme`).catch(() => null),
  ]);

  let languages = {};
  try {
    languages = await githubFetch(`/repos/${owner}/${repo}/languages`);
  } catch {
    // optional
  }

  return { repoInfo, tree, readme, languages };
}

// ─── Build File Tree ────────────────────────────────────────────
function buildFileTree(treeData) {
  if (!treeData || !treeData.tree) return "파일 트리를 가져올 수 없습니다.";

  const items = treeData.tree
    .filter((item) => {
      const depth = item.path.split("/").length;
      if (depth > MAX_TREE_DEPTH) return false;
      if (item.path.includes("node_modules/")) return false;
      if (item.path.includes(".git/")) return false;
      if (item.path.startsWith("dist/") || item.path.startsWith("build/")) return false;
      return true;
    })
    .slice(0, MAX_TREE_FILES);

  const lines = [];
  items.forEach((item) => {
    const parts = item.path.split("/");
    const indent = "  ".repeat(parts.length - 1);
    const name = parts[parts.length - 1];
    const icon = item.type === "tree" ? "📁" : "📄";
    lines.push(`${indent}${icon} ${name}`);
  });

  return lines.join("\n");
}

// ─── Extract Usage from README ──────────────────────────────────
function extractUsageSections(readme) {
  if (!readme) return null;

  const sections = [];
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const allHeadings = [];
  let match;

  while ((match = headingRegex.exec(readme)) !== null) {
    allHeadings.push({
      level: match[1].length,
      title: match[2].trim(),
      index: match.index,
    });
  }

  const usageKeywords = [
    /install/i, /setup/i, /getting.?started/i, /usage/i,
    /quick.?start/i, /how.?to/i, /example/i, /사용/i, /설치/i,
    /configuration/i, /config/i, /api/i,
  ];

  for (let i = 0; i < allHeadings.length; i++) {
    const heading = allHeadings[i];
    const isUsageRelated = usageKeywords.some((re) => re.test(heading.title));

    if (isUsageRelated) {
      const start = heading.index;
      const end = i + 1 < allHeadings.length
        ? allHeadings[i + 1].index
        : readme.length;
      sections.push(readme.slice(start, end).trim());
    }
  }

  return sections.length > 0 ? sections.join("\n\n") : null;
}

// ─── Format Numbers ─────────────────────────────────────────────
function formatNumber(n) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return String(n);
}

// ─── Sanitize for MDX ───────────────────────────────────────────
function sanitizeForMdx(content) {
  let result = content;

  // Remove HTML comments (<!-- ... -->)
  result = result.replace(/<!--[\s\S]*?-->/g, "");

  // Convert <picture>/<source>/<img> blocks to simple markdown images
  result = result.replace(
    /<picture>[\s\S]*?<img\s+[^>]*?src="([^"]+)"[^>]*?alt="([^"]*)"[^>]*?>[\s\S]*?<\/picture>/gi,
    "![$2]($1)"
  );

  // Convert standalone HTML <img> tags to markdown (handles both <img .../> and <img ...>)
  result = result.replace(
    /<img\s+[^>]*?src="([^"]+)"[^>]*?alt="([^"]*)"[^>]*?>/gi,
    "![$2]($1)"
  );
  result = result.replace(
    /<img\s+[^>]*?alt="([^"]*)"[^>]*?src="([^"]+)"[^>]*?>/gi,
    "![$1]($2)"
  );

  // Convert <a> tags to markdown links
  result = result.replace(
    /<a\s+[^>]*?href="([^"]+)"[^>]*?>([\s\S]*?)<\/a>/gi,
    (_, href, text) => {
      const cleanText = text.replace(/<[^>]+>/g, "").trim();
      return `[${cleanText}](${href})`;
    }
  );

  // Remove <script> tags entirely
  result = result.replace(/<script[\s\S]*?<\/script>/gi, "");
  result = result.replace(/<script[^>]*?\/?>/gi, "");

  // Remove <picture> wrapper tags (content inside already converted)
  result = result.replace(/<\/?picture>/gi, "");

  // Remove remaining self-closing HTML tags that aren't in code blocks
  result = result.replace(/<(source|br|hr|wbr)\s*[^>]*?\/?>/gi, "");

  // Remove <div>, <span>, <p> wrappers (keep content)
  result = result.replace(/<\/?(div|span|p|section|details|summary|header|footer|nav|main|article|aside)\s*[^>]*?>/gi, "");

  // Escape curly braces that aren't in code blocks (MDX treats {} as JSX)
  const lines = result.split("\n");
  let inCodeBlock = false;
  result = lines.map((line) => {
    if (line.trim().startsWith("```")) inCodeBlock = !inCodeBlock;
    if (inCodeBlock) return line;
    // Escape { and } outside code blocks, but not in inline code
    return line.replace(/(?<!`[^`]*)\{(?![/*])/g, "\\{").replace(/(?<![/*])(?<![^`]*`)}/g, "\\}");
  }).join("\n");

  // Clean up excessive blank lines
  result = result.replace(/\n{4,}/g, "\n\n\n");

  return result;
}

// ─── Generate Markdown ──────────────────────────────────────────
function generateMarkdown(data, config) {
  const { repoInfo, tree, readme, languages } = data;
  const { owner, repo } = parseRepoUrl(config.repoUrl);

  const today = new Date().toISOString().split("T")[0];
  const slug = `${repo}`;

  const langList = Object.keys(languages);
  const topLangs = langList.slice(0, 5).join(", ");
  const autoTags = [
    ...new Set([
      ...(config.tags.length > 0 ? config.tags : []),
      ...langList.slice(0, 3).map((l) => l.toLowerCase()),
      ...(repoInfo.topics || []).slice(0, 5),
    ]),
  ];

  const fileTree = buildFileTree(tree);
  const usageSections = extractUsageSections(readme);

  // ─── Front Matter ───
  const frontMatter = [
    "---",
    `layout: single`,
    `title: "${repoInfo.name} - ${(repoInfo.description || "GitHub Repository").replace(/"/g, '\\"')}"`,
    `date: "${today}"`,
    `categories: [${config.category}]`,
    `tags: [${autoTags.join(", ")}]`,
    `toc: true`,
    `author_profile: false`,
    `---`,
  ].join("\n");

  // ─── Body ───
  const body = [];

  // Header info
  body.push(`# ${repoInfo.name}\n`);
  body.push(`> ${repoInfo.description || "설명 없음"}\n`);

  // Stats table
  body.push(`## 📊 리포지토리 정보\n`);
  body.push(`| 항목 | 값 |`);
  body.push(`|------|-----|`);
  body.push(`| **GitHub** | [${repoInfo.full_name}](${repoInfo.html_url}) |`);
  body.push(`| **⭐ Stars** | ${formatNumber(repoInfo.stargazers_count)} |`);
  body.push(`| **🍴 Forks** | ${formatNumber(repoInfo.forks_count)} |`);
  body.push(`| **📝 License** | ${repoInfo.license?.name || "N/A"} |`);
  body.push(`| **💻 주요 언어** | ${topLangs || "N/A"} |`);
  if (repoInfo.homepage) {
    body.push(`| **🌐 홈페이지** | [${repoInfo.homepage}](${repoInfo.homepage}) |`);
  }
  body.push(`| **📅 생성일** | ${repoInfo.created_at?.split("T")[0]} |`);
  body.push(`| **🔄 최근 업데이트** | ${repoInfo.updated_at?.split("T")[0]} |`);
  body.push("");

  // Topics
  if (repoInfo.topics && repoInfo.topics.length > 0) {
    body.push(`### 🏷️ 토픽\n`);
    body.push(repoInfo.topics.map((t) => `\`${t}\``).join("  ") + "\n");
  }

  // File tree
  body.push(`## 📁 프로젝트 구조\n`);
  body.push("```");
  body.push(fileTree);
  body.push("```\n");

  // README content
  if (readme) {
    body.push(`## 📖 README\n`);

    let readmeContent = readme;
    // Fix relative image/link URLs to absolute
    readmeContent = readmeContent.replace(
      /!\[([^\]]*)\]\((?!https?:\/\/)([^)]+)\)/g,
      `![$1](https://raw.githubusercontent.com/${owner}/${repo}/${repoInfo.default_branch}/$2)`
    );
    readmeContent = readmeContent.replace(
      /\[([^\]]*)\]\((?!https?:\/\/)(?!#)([^)]+)\)/g,
      `[$1](https://github.com/${owner}/${repo}/blob/${repoInfo.default_branch}/$2)`
    );

    // Sanitize for MDX compatibility
    readmeContent = sanitizeForMdx(readmeContent);

    body.push(readmeContent);
    body.push("");
  }

  // Usage / Quick Start
  if (usageSections) {
    body.push(`## 🚀 사용 방법 (README에서 추출)\n`);
    body.push(usageSections);
    body.push("");
  }

  // Reference links
  body.push(`---\n`);
  body.push(`## 🔗 참고 링크\n`);
  body.push(`- [GitHub Repository](${repoInfo.html_url})`);
  if (repoInfo.homepage) {
    body.push(`- [공식 홈페이지](${repoInfo.homepage})`);
  }
  body.push(`- [Issues](${repoInfo.html_url}/issues)`);
  body.push(`- [Releases](${repoInfo.html_url}/releases)`);
  body.push("");

  return {
    frontMatter,
    body: body.join("\n"),
    slug,
    today,
    filename: `${today}-${slug}.md`,
  };
}

// ─── Generate Obsidian Note ─────────────────────────────────────
function generateObsidianNote(data, config) {
  const { repoInfo, languages } = data;
  const langList = Object.keys(languages);
  const autoTags = [
    ...new Set([
      ...(config.tags.length > 0 ? config.tags : []),
      ...langList.slice(0, 3).map((l) => l.toLowerCase()),
      ...(repoInfo.topics || []).slice(0, 5),
      "github-repo",
    ]),
  ];

  const obsidianHeader = [
    "---",
    `title: "${repoInfo.name}"`,
    `source: "${repoInfo.html_url}"`,
    `created: "${new Date().toISOString().split("T")[0]}"`,
    `tags: [${autoTags.map((t) => `"${t}"`).join(", ")}]`,
    `stars: ${repoInfo.stargazers_count}`,
    `language: "${langList[0] || "unknown"}"`,
    `---`,
  ].join("\n");

  return obsidianHeader;
}

// ─── Save Files ─────────────────────────────────────────────────
function saveFiles(result, obsidianHeader, config) {
  const { frontMatter, body, filename, slug } = result;
  const fullContent = `${frontMatter}\n\n${body}`;

  // Blog post
  if (!fs.existsSync(BLOG_POSTS_DIR)) {
    fs.mkdirSync(BLOG_POSTS_DIR, { recursive: true });
  }
  const blogPath = path.join(BLOG_POSTS_DIR, filename);
  fs.writeFileSync(blogPath, fullContent);
  console.log(`\n✅ 블로그 포스트 저장: ${blogPath}`);

  // Obsidian note
  if (config.obsidianPath) {
    const obsidianDir = path.resolve(config.obsidianPath);
    if (!fs.existsSync(obsidianDir)) {
      fs.mkdirSync(obsidianDir, { recursive: true });
    }
    const obsidianFile = path.join(obsidianDir, `${slug}.md`);
    const obsidianContent = `${obsidianHeader}\n\n${body}`;
    fs.writeFileSync(obsidianFile, obsidianContent);
    console.log(`✅ 옵시디언 노트 저장: ${obsidianFile}`);
  }

  return blogPath;
}

// ─── Main ───────────────────────────────────────────────────────
async function main() {
  const config = parseArgs();

  if (!config.repoUrl) {
    console.log(`
📖 사용법:
  node scripts/repo-to-post.js <github-repo-url> [options]

옵션:
  --obsidian <path>   옵시디언 볼트 저장 경로
  --category <name>   포스트 카테고리 (기본: "GitHub-Repo")
  --tags <t1,t2,...>  쉼표로 구분된 태그 목록
  --dry-run           파일 저장 없이 미리보기만

예시:
  node scripts/repo-to-post.js https://github.com/alibaba/page-agent
  node scripts/repo-to-post.js https://github.com/user/repo --obsidian ~/Obsidian/Vault --category AI --tags ai,agent
`);
    process.exit(1);
  }

  try {
    const { owner, repo } = parseRepoUrl(config.repoUrl);
    console.log(`\n🔍 리포지토리: ${owner}/${repo}`);

    const data = await fetchRepoData(owner, repo);
    console.log(`   ⭐ ${formatNumber(data.repoInfo.stargazers_count)} stars`);
    console.log(`   💻 ${Object.keys(data.languages).join(", ") || "N/A"}`);
    console.log(`   📄 README: ${data.readme ? "있음" : "없음"}`);
    console.log(`   🌳 파일: ${data.tree?.tree?.length || 0}개`);

    const result = generateMarkdown(data, config);
    const obsidianHeader = generateObsidianNote(data, config);

    if (config.dryRun) {
      console.log("\n--- 미리보기 (처음 80줄) ---\n");
      const preview = `${result.frontMatter}\n\n${result.body}`;
      console.log(preview.split("\n").slice(0, 80).join("\n"));
      console.log("\n... (--dry-run 모드, 파일 저장 안 함)");
    } else {
      const blogPath = saveFiles(result, obsidianHeader, config);

      // Regenerate search index
      console.log("\n🔄 검색 인덱스 재생성 중...");
      const { execSync } = require("child_process");
      execSync("node scripts/generate-search-index.js", { cwd: path.join(__dirname, "..") });
      console.log("✅ 검색 인덱스 업데이트 완료");

      console.log(`\n🎉 완료! 블로그에서 확인: http://localhost:3000/posts/${result.slug}/`);
    }
  } catch (err) {
    console.error(`\n❌ 오류: ${err.message}`);
    process.exit(1);
  }
}

main();
