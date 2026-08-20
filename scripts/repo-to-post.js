#!/usr/bin/env node

/**
 * repo-to-post.js
 *
 * GitHub 리포지토리 URL → 블로그 포스트 + 옵시디언 노트 변환 CLI
 *
 * Usage:
 *   node scripts/repo-to-post.js <github-repo-url> [options]
 *
 * Options:
 *   --obsidian <path>   옵시디언 볼트 저장 경로
 *   --category <name>   포스트 카테고리 (기본: "GitHub-Repo")
 *   --tags <t1,t2,...>  쉼표로 구분된 태그 목록
 *   --dry-run           파일 저장 없이 미리보기만
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

const BLOG_POSTS_DIR = path.join(__dirname, "..", "content", "posts");

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
    if (args[i] === "--obsidian" && args[i + 1]) config.obsidianPath = args[++i];
    else if (args[i] === "--category" && args[i + 1]) config.category = args[++i];
    else if (args[i] === "--tags" && args[i + 1]) config.tags = args[++i].split(",").map((t) => t.trim());
    else if (args[i] === "--dry-run") config.dryRun = true;
    else if (!args[i].startsWith("--")) config.repoUrl = args[i];
  }
  return config;
}

// ─── GitHub API ─────────────────────────────────────────────────
function githubFetch(apiPath, raw = false) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.github.com",
      path: apiPath,
      headers: {
        "User-Agent": "repo-to-post-cli",
        Accept: raw ? "application/vnd.github.v3.raw" : "application/vnd.github.v3+json",
      },
    };
    const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
    if (token) options.headers.Authorization = `Bearer ${token}`;

    https.get(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        if (res.statusCode !== 200) {
          reject(new Error(`GitHub API ${res.statusCode}`));
          return;
        }
        resolve(raw ? data : JSON.parse(data));
      });
    }).on("error", reject);
  });
}

function parseRepoUrl(url) {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) throw new Error(`유효하지 않은 GitHub URL: ${url}`);
  return { owner: match[1], repo: match[2].replace(/\.git$/, "") };
}

function formatNumber(n) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return String(n);
}

// ─── Fetch ──────────────────────────────────────────────────────
async function fetchRepoData(owner, repo) {
  console.log(`📡 GitHub API에서 데이터 수집 중...`);
  const [repoInfo, readme] = await Promise.all([
    githubFetch(`/repos/${owner}/${repo}`),
    githubFetch(`/repos/${owner}/${repo}/readme`, true).catch(() => null),
  ]);
  let languages = {};
  try { languages = await githubFetch(`/repos/${owner}/${repo}/languages`); } catch {}
  return { repoInfo, readme, languages };
}

// ─── README 핵심 추출 ──────────────────────────────────────────
function extractReadmeCore(readme, owner, repo, defaultBranch) {
  if (!readme) return { description: "", quickStart: "", features: "", useCases: "" };

  let content = readme;

  // 상대 이미지 → 절대 경로
  content = content.replace(
    /!\[([^\]]*)\]\((?!https?:\/\/)([^)]+)\)/g,
    `![$1](https://raw.githubusercontent.com/${owner}/${repo}/${defaultBranch}/$2)`
  );
  content = content.replace(
    /\[([^\]]*)\]\((?!https?:\/\/)(?!#)([^)]+)\)/g,
    `[$1](https://github.com/${owner}/${repo}/blob/${defaultBranch}/$2)`
  );

  // HTML → MDX 호환
  content = sanitizeForMdx(content);

  // 섹션별 파싱
  const sections = parseSections(content);

  // 핵심 섹션 추출
  const description = extractSection(sections, [/^(?!#)/]) || "";
  const features = extractSection(sections, [/feature/i, /특징/i, /what/i]) || "";
  const quickStart = extractSection(sections, [
    /quick.?start/i, /install/i, /setup/i, /getting.?started/i,
    /usage/i, /how.?to/i, /사용/i, /설치/i, /시작/i,
  ]) || "";
  const useCases = extractSection(sections, [/use.?case/i, /example/i, /활용/i]) || "";

  return { description, features, quickStart, useCases };
}

function parseSections(content) {
  const lines = content.split("\n");
  const sections = [];
  let current = { heading: "", level: 0, lines: [] };

  for (const line of lines) {
    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      if (current.heading || current.lines.length > 0) {
        sections.push({ ...current, body: current.lines.join("\n").trim() });
      }
      current = { heading: headingMatch[2].trim(), level: headingMatch[1].length, lines: [] };
    } else {
      current.lines.push(line);
    }
  }
  if (current.heading || current.lines.length > 0) {
    sections.push({ ...current, body: current.lines.join("\n").trim() });
  }
  return sections;
}

function extractSection(sections, patterns) {
  for (const section of sections) {
    for (const pattern of patterns) {
      if (pattern.test(section.heading)) {
        if (!section.body.trim()) continue;
        // 배지 이미지만 있는 섹션 건너뛰기
        const noBadges = section.body.replace(/\[?!\[[^\]]*\]\([^)]*shields\.io[^)]*\)[^\n]*/g, "").trim();
        if (!noBadges) continue;
        return `${"#".repeat(section.level)} ${section.heading}\n\n${section.body}`;
      }
    }
  }
  return null;
}

// ─── MDX 호환 처리 ──────────────────────────────────────────────
function sanitizeForMdx(content) {
  let result = content;

  // HTML 코멘트 제거
  result = result.replace(/<!--[\s\S]*?-->/g, "");

  // <picture>/<source>/<img> → 마크다운 이미지
  result = result.replace(
    /<picture>[\s\S]*?<img\s+[^>]*?src="([^"]+)"[^>]*?alt="([^"]*)"[^>]*?>[\s\S]*?<\/picture>/gi,
    "![$2]($1)"
  );
  result = result.replace(/<\/?picture>/gi, "");
  result = result.replace(/<img\s+[^>]*?src="([^"]+)"[^>]*?alt="([^"]*)"[^>]*?>/gi, "![$2]($1)");
  result = result.replace(/<img\s+[^>]*?alt="([^"]*)"[^>]*?src="([^"]+)"[^>]*?>/gi, "![$1]($2)");

  // <a> → 마크다운 링크
  result = result.replace(/<a\s+[^>]*?href="([^"]+)"[^>]*?>([\s\S]*?)<\/a>/gi, (_, href, text) => {
    const clean = text.replace(/<[^>]+>/g, "").trim();
    return `[${clean}](${href})`;
  });

  // <script>, <source>, <br>, <div> 등 제거
  result = result.replace(/<script[\s\S]*?<\/script>/gi, "");
  result = result.replace(/<script[^>]*?\/?>/gi, "");
  result = result.replace(/<(source|br|hr|wbr)\s*[^>]*?\/?>/gi, "");
  result = result.replace(/<\/?(div|span|p|section|details|summary|header|footer|nav|main|article|aside)\s*[^>]*?>/gi, "");

  // {} 이스케이프 (코드 블록 외)
  const lines = result.split("\n");
  let inCode = false;
  result = lines.map((line) => {
    if (line.trim().startsWith("```")) inCode = !inCode;
    if (inCode) return line;
    return line.replace(/(?<!`[^`]*)\{(?![/*])/g, "\\{").replace(/(?<![/*])(?<![^`]*`)}/g, "\\}");
  }).join("\n");

  // 연속 빈 줄 정리
  result = result.replace(/\n{4,}/g, "\n\n\n");

  return result;
}

// ─── 마크다운 생성 (새 템플릿) ──────────────────────────────────
function generateMarkdown(data, config) {
  const { repoInfo, readme, languages } = data;
  const { owner, repo } = parseRepoUrl(config.repoUrl);
  const today = new Date().toISOString().split("T")[0];
  const slug = repo;
  const langList = Object.keys(languages);

  const autoTags = [...new Set([
    ...(config.tags.length > 0 ? config.tags : []),
    ...langList.slice(0, 3).map((l) => l.toLowerCase()),
    ...(repoInfo.topics || []).slice(0, 5),
  ])];

  const readmeCore = extractReadmeCore(readme, owner, repo, repoInfo.default_branch);

  // ─── Front Matter
  const frontMatter = [
    "---",
    `title: "${repoInfo.name} - ${(repoInfo.description || "").replace(/"/g, '\\"')}"`,
    `date: "${today}"`,
    `categories: [${config.category}]`,
    `tags: [${autoTags.join(", ")}]`,
    `toc: true`,
    `author_profile: false`,
    "---",
  ].join("\n");

  // ─── Body
  const body = [];

  // ── 헤더: 이름 + 설명 + 링크 배지
  body.push(`# ${repoInfo.name}\n`);
  body.push(`> ${repoInfo.description || "GitHub Repository"}\n`);

  // 핵심 정보를 한 줄 배지로
  const badges = [];
  badges.push(`⭐ **${formatNumber(repoInfo.stargazers_count)}**`);
  badges.push(`🍴 ${formatNumber(repoInfo.forks_count)}`);
  if (repoInfo.license) badges.push(`📝 ${repoInfo.license.spdx_id}`);
  badges.push(`💻 ${langList.slice(0, 3).join(" · ") || "N/A"}`);
  body.push(badges.join("  ·  ") + "\n");

  // 링크 라인
  const links = [`[GitHub](${repoInfo.html_url})`];
  if (repoInfo.homepage) links.push(`[홈페이지](${repoInfo.homepage})`);
  links.push(`[Issues](${repoInfo.html_url}/issues)`);
  links.push(`[Releases](${repoInfo.html_url}/releases)`);
  body.push(links.join("  ·  ") + "\n");

  body.push("---\n");

  // ── Features
  if (readmeCore.features) {
    body.push(readmeCore.features);
    body.push("");
  }

  // ── Use Cases
  if (readmeCore.useCases) {
    body.push(readmeCore.useCases);
    body.push("");
  }

  // ── Quick Start / 사용 방법
  if (readmeCore.quickStart) {
    body.push(readmeCore.quickStart);
    body.push("");
  }

  // Features/UseCases/QuickStart 중 아무것도 없으면 README 핵심만 표시
  if (!readmeCore.features && !readmeCore.useCases && !readmeCore.quickStart && readme) {
    body.push("## 📖 소개\n");
    // README에서 배지, 기여, 라이선스 섹션 제외한 핵심만
    const cleaned = extractCleanReadme(readme, owner, repo, repoInfo.default_branch);
    body.push(cleaned);
    body.push("");
  }

  return { frontMatter, body: body.join("\n"), slug, today, filename: `${today}-${slug}.md` };
}

// README에서 배지/기여/라이선스 제거한 핵심 내용
function extractCleanReadme(readme, owner, repo, defaultBranch) {
  let content = readme;

  // 상대 경로 수정
  content = content.replace(
    /!\[([^\]]*)\]\((?!https?:\/\/)([^)]+)\)/g,
    `![$1](https://raw.githubusercontent.com/${owner}/${repo}/${defaultBranch}/$2)`
  );

  content = sanitizeForMdx(content);

  // 배지 줄 제거 (shields.io 포함 줄)
  content = content.replace(/^.*shields\.io.*$/gm, "");
  content = content.replace(/^.*img\.shields\.io.*$/gm, "");

  // Contributing, License, Acknowledgments 섹션 제거
  const skipPatterns = [/contribut/i, /license/i, /acknowledgment/i, /감사/i];
  const sections = parseSections(content);
  const kept = sections.filter((s) => {
    if (!s.heading) return true;
    return !skipPatterns.some((p) => p.test(s.heading));
  });

  return kept.map((s) => {
    if (s.heading) return `${"#".repeat(s.level)} ${s.heading}\n\n${s.body}`;
    return s.body;
  }).join("\n\n").trim();
}

// ─── 옵시디언 노트 ─────────────────────────────────────────────
function generateObsidianHeader(data, config) {
  const { repoInfo, languages } = data;
  const langList = Object.keys(languages);
  const autoTags = [...new Set([
    ...(config.tags.length > 0 ? config.tags : []),
    ...langList.slice(0, 3).map((l) => l.toLowerCase()),
    ...(repoInfo.topics || []).slice(0, 5),
    "github-repo",
  ])];

  return [
    "---",
    `title: "${repoInfo.name}"`,
    `description: "${(repoInfo.description || "").replace(/"/g, '\\"')}"`,
    `source: "${repoInfo.html_url}"`,
    `homepage: "${repoInfo.homepage || ""}"`,
    `created: "${new Date().toISOString().split("T")[0]}"`,
    `tags: [${autoTags.map((t) => `"${t}"`).join(", ")}]`,
    `stars: ${repoInfo.stargazers_count}`,
    `language: "${langList[0] || "unknown"}"`,
    "---",
  ].join("\n");
}

// ─── 파일 저장 ──────────────────────────────────────────────────
function saveFiles(result, obsidianHeader, config) {
  const { frontMatter, body, filename, slug } = result;
  const fullContent = `${frontMatter}\n\n${body}`;

  if (!fs.existsSync(BLOG_POSTS_DIR)) fs.mkdirSync(BLOG_POSTS_DIR, { recursive: true });
  const blogPath = path.join(BLOG_POSTS_DIR, filename);
  fs.writeFileSync(blogPath, fullContent);
  console.log(`\n✅ 블로그 포스트 저장: ${blogPath}`);

  if (config.obsidianPath) {
    const obsidianDir = path.resolve(config.obsidianPath);
    if (!fs.existsSync(obsidianDir)) fs.mkdirSync(obsidianDir, { recursive: true });
    const obsidianFile = path.join(obsidianDir, `${slug}.md`);
    fs.writeFileSync(obsidianFile, `${obsidianHeader}\n\n${body}`);
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
    console.log(`   ⭐ ${formatNumber(data.repoInfo.stargazers_count)} stars · 💻 ${Object.keys(data.languages).join(", ") || "N/A"}`);

    const result = generateMarkdown(data, config);
    const obsidianHeader = generateObsidianHeader(data, config);

    if (config.dryRun) {
      console.log("\n--- 미리보기 ---\n");
      console.log(`${result.frontMatter}\n\n${result.body}`);
      console.log("\n(--dry-run 모드, 파일 저장 안 함)");
    } else {
      saveFiles(result, obsidianHeader, config);

      console.log("\n🔄 검색 인덱스 재생성 중...");
      require("child_process").execSync("node scripts/generate-search-index.js", { cwd: path.join(__dirname, "..") });
      console.log("✅ 검색 인덱스 업데이트 완료");
      console.log(`\n🎉 완료! → http://localhost:3000/posts/${result.slug}/`);
    }
  } catch (err) {
    console.error(`\n❌ 오류: ${err.message}`);
    process.exit(1);
  }
}

main();
