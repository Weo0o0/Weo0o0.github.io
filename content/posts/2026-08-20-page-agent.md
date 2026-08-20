---
title: "page-agent - JavaScript in-page GUI agent. Control web interfaces with natural language."
date: "2026-08-20"
categories: [AI-Agent]
tags: [ai, browser-automation, vibe-coding, typescript, javascript, css, agent, ai-agents]
toc: true
author_profile: false
---

# page-agent

> JavaScript in-page GUI agent. Control web interfaces with natural language.

⭐ **28.8k**  ·  🍴 2.6k  ·  📝 MIT  ·  💻 TypeScript · JavaScript · CSS

[GitHub](https://github.com/alibaba/page-agent)  ·  [홈페이지](https://alibaba.github.io/page-agent/)  ·  [Issues](https://github.com/alibaba/page-agent/issues)  ·  [Releases](https://github.com/alibaba/page-agent/releases)

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
