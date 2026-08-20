---
layout: single
title: "page-agent - JavaScript in-page GUI agent. Control web interfaces with natural language."
date: "2026-08-20"
categories: [AI-Agent]
tags: [ai, browser-automation, vibe-coding, typescript, javascript, css, agent, ai-agents]
toc: true
author_profile: false
---

# page-agent

> JavaScript in-page GUI agent. Control web interfaces with natural language.

## 📊 리포지토리 정보

| 항목 | 값 |
|------|-----|
| **GitHub** | [alibaba/page-agent](https://github.com/alibaba/page-agent) |
| **⭐ Stars** | 28.8k |
| **🍴 Forks** | 2.6k |
| **📝 License** | MIT License |
| **💻 주요 언어** | TypeScript, JavaScript, CSS, HTML |
| **🌐 홈페이지** | [https://alibaba.github.io/page-agent/](https://alibaba.github.io/page-agent/) |
| **📅 생성일** | 2025-09-23 |
| **🔄 최근 업데이트** | 2026-08-20 |

### 🏷️ 토픽

`agent`  `ai`  `ai-agents`  `browser-automation`  `javascript`  `mcp`  `typescript`  `web`

## 📁 프로젝트 구조

```
📁 .agents
  📁 skills
    📁 git-cleanup
    📁 maintain-model-list
    📁 pre-impl-discussion
    📁 submit-pr-from-current-changes
    📁 update-changelog
📁 .github
  📁 ISSUE_TEMPLATE
    📄 bug_report.yml
    📄 config.yml
    📄 feature_request.yml
  📄 PULL_REQUEST_TEMPLATE.md
  📄 dependabot.yml
  📁 workflows
    📄 ci.yml
    📄 deploy-website.yml
    📄 main-ci.yml
    📄 release.yml
📄 .gitignore
📁 .husky
  📄 commit-msg
  📄 pre-commit
📄 .prettierignore
📁 .vscode
  📄 cspell.json
  📄 extensions.json
  📄 settings.json
📄 AGENTS.md
📄 CLAUDE.md
📄 CONTRIBUTING.md
📄 LICENSE
📄 README.md
📁 docs
  📄 CHANGELOG.md
  📄 CODE_OF_CONDUCT.md
  📄 README-zh.md
  📄 SECURITY.md
  📄 developer-guide.md
  📄 terms-and-privacy.md
📄 eslint.config.js
📄 package-lock.json
📄 package.json
📁 packages
  📁 core
    📄 package.json
    📁 src
    📄 tsconfig.json
    📄 vite.config.js
    📄 vitest.config.js
  📁 extension
    📄 PRIVACY.md
    📄 components.json
    📁 docs
    📄 package.json
    📁 public
    📁 src
    📄 tsconfig.json
    📄 vitest.config.js
    📄 wxt.config.js
  📁 llms
    📄 package.json
    📁 src
    📄 tsconfig.json
    📄 vite.config.js
    📄 vitest.config.js
  📁 mcp
    📄 README.md
    📄 package.json
    📁 src
  📁 page-agent
    📄 package.json
    📁 src
    📄 tsconfig.json
    📄 vite.config.js
    📄 vite.iife.config.js
  📁 page-controller
    📄 package.json
    📁 src
    📄 tsconfig.json
    📄 vite.config.js
    📄 vitest.config.js
  📁 ui
    📄 package.json
    📁 src
    📄 tsconfig.json
    📄 vite.config.js
  📁 website
    📄 AGENTS.md
    📄 components.json
    📄 index.html
    📄 package.json
    📁 public
    📁 src
    📄 tailwind.config.js
    📄 tsconfig.json
    📄 vite.config.js
📁 scripts
  📄 build-libs.js
  📄 build.js
  📄 ci.js
  📄 parallel-task.js
  📄 post-publish.js
  📄 pre-publish.js
  📄 sync-version.js
📄 tsconfig.base.json
📄 tsconfig.typecheck.json
```

## 📖 README

# Page Agent


  
  ![Page Agent Banner](https://page-agent.github.io/assets/readme/banner-light.png)


[![CI](https://img.shields.io/github/actions/workflow/status/alibaba/page-agent/main-ci.yml?branch=main&style=flat-square&label=ci)](https://github.com/alibaba/page-agent/actions/workflows/main-ci.yml)
[![npm](https://img.shields.io/npm/v/page-agent?style=flat-square&label=npm)](https://www.npmjs.com/package/page-agent)
[![downloads](https://img.shields.io/npm/dt/page-agent?style=flat-square)](https://www.npmjs.com/package/page-agent)
[![size](https://img.shields.io/bundlephobia/minzip/page-agent?style=flat-square&label=size)](https://bundlephobia.com/package/page-agent)
[![license](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](https://opensource.org/licenses/MIT)
[![typescript](https://img.shields.io/badge/%3C%2F%3E-typescript-blue?style=flat-square)](http://www.typescriptlang.org/)
[![Chrome Web Store Rating](https://img.shields.io/chrome-web-store/rating/akldabonmimlicnjlflnapfeklbfemhj?style=flat-square&label=chrome%20rating)](https://chromewebstore.google.com/detail/page-agent-ext/akldabonmimlicnjlflnapfeklbfemhj)
[![GitHub stars](https://img.shields.io/github/stars/alibaba/page-agent.svg)](https://github.com/alibaba/page-agent)

The GUI Agent Living in Your Webpage. One script gives any web page its own AI agent.

[![alibaba%2Fpage-agent | Trendshift](https://trendshift.io/api/badge/repositories/22551)](https://trendshift.io/repositories/22551?utm_source=repository-badge&amp;utm_medium=badge&amp;utm_campaign=badge-repository-22551)

🌐 **English** | [中文](https://github.com/alibaba/page-agent/blob/main/./docs/README-zh.md)

[🚀 Demo](https://alibaba.github.io/page-agent/) | [📖 Docs](https://alibaba.github.io/page-agent/docs/introduction/overview) | [📢 HN Discussion](https://news.ycombinator.com/item?id=47264138) | [𝕏 Follow on X](https://x.com/simonluvramen)


[![Watch the demo](https://page-agent.github.io/assets/readme/poster.jpg)](https://github.com/user-attachments/assets/a1f2eae2-13fb-4aae-98cf-a3fc1620a6c2)

---

## ✨ Features

- **🎯 Easy integration**
    - No need for `browser extension` / `python` / `headless browser`.
    - Just in-page javascript. Everything happens in your web page.
- **📖 Text-based DOM manipulation**
    - No screenshots. No multi-modal LLMs or special permissions needed.
- **🧠 Bring your own LLMs**
    - Works with most mainstream models, including locally deployed ones. See [supported models](https://alibaba.github.io/page-agent/docs/features/models).
- **🐙 Optional [chrome extension](https://alibaba.github.io/page-agent/docs/features/chrome-extension) for multi-page tasks.**
    - And an [MCP Server (Beta)](https://alibaba.github.io/page-agent/docs/features/mcp-server) to control it from outside

## 💡 Use Cases

- **SaaS AI Copilot** — Ship an AI copilot in your product in lines of code. No backend rewrite.
- **Smart Form Filling** — Turn 20-click workflows into one sentence. Perfect for ERP, CRM, and admin systems.
- **Accessibility** — Make any web app accessible through natural language. Voice commands, screen readers, zero barrier.
- **Multi-page Agent** — Extend your own web agent's reach across browser tabs via the [Chrome extension](https://alibaba.github.io/page-agent/docs/features/chrome-extension).
- **MCP** - Allow your agent clients to control your browser.

## 🚀 Quick Start

### One-line integration

Fastest way to try PageAgent with our free Demo LLM:

```html


```

> **⚠��� For technical evaluation only.** This demo CDN uses our free [testing LLM API](https://alibaba.github.io/page-agent/docs/features/models#free-testing-api). By using it, you agree to its [terms](https://github.com/alibaba/page-agent/blob/main/docs/terms-and-privacy.md).
>
> Add `?autoInit=false` to load the script without creating the demo agent automatically. You can then instantiate it with `new window.PageAgent(...)` and your own LLMs.

### NPM Installation

```bash
npm install page-agent
```

```javascript
import { PageAgent } from 'page-agent'

const agent = new PageAgent({
    model: 'qwen3.5-plus',
    baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    apiKey: 'YOUR_API_KEY',
    language: 'en-US',
})

await agent.execute('Click the login button')
```

For more programmatic usage, see [📖 Documentations](https://alibaba.github.io/page-agent/docs/introduction/overview).

## 🤝 Contributing

We welcome contributions from the community! See [CONTRIBUTING.md](https://github.com/alibaba/page-agent/blob/main/CONTRIBUTING.md) for guidelines and [docs/developer-guide.md](https://github.com/alibaba/page-agent/blob/main/docs/developer-guide.md) for local development workflows.

Built something cool with PageAgent? Share it in [Show and Tell](https://github.com/alibaba/page-agent/discussions/categories/show-and-tell). 🙌

Please read the [maintainer's note](https://github.com/alibaba/page-agent/issues/349) on principles and current state.

Contributions generated entirely by **bots or AI** without substantial human involvement will **not be accepted**.

## ⚖️ License

[MIT License](https://github.com/alibaba/page-agent/blob/main/LICENSE)

## 👏 Acknowledgments

This project builds upon the excellent work of **[`browser-use`](https://github.com/browser-use/browser-use)**.

`PageAgent` is designed for **client-side web enhancement**, not server-side automation.

```
DOM processing components and prompt are derived from browser-use:

Browser Use <https://github.com/browser-use/browser-use>
Copyright (c) 2024 Gregor Zunic
Licensed under the MIT License

We gratefully acknowledge the browser-use project and its contributors for their
excellent work on web automation and DOM interaction patterns that helped make
this project possible.
```

**⭐ Star this repo if you find PageAgent helpful!**


## 🚀 사용 방법 (README에서 추출)

## 🚀 Quick Start

### NPM Installation

```bash
npm install page-agent
```

```javascript
import { PageAgent } from 'page-agent'

const agent = new PageAgent({
    model: 'qwen3.5-plus',
    baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    apiKey: 'YOUR_API_KEY',
    language: 'en-US',
})

await agent.execute('Click the login button')
```

For more programmatic usage, see [📖 Documentations](https://alibaba.github.io/page-agent/docs/introduction/overview).

---

## 🔗 참고 링크

- [GitHub Repository](https://github.com/alibaba/page-agent)
- [공식 홈페이지](https://alibaba.github.io/page-agent/)
- [Issues](https://github.com/alibaba/page-agent/issues)
- [Releases](https://github.com/alibaba/page-agent/releases)
