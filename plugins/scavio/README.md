# Scavio

Web search, page extraction, and structured data from e-commerce, social, retail, jobs and company-filing sources, available to your coding agent as MCP tools with skills that tell it when to use them.

Get an API key at [scavio.dev](https://scavio.dev).

This directory ships two manifests over one set of components:

- `.claude-plugin/plugin.json` + `.mcp.json` — Claude Code, using the hosted MCP server at `https://mcp.scavio.dev/mcp`
- `plugin.json` + `mcp.json` — [Agent Plugins 1.0.0](https://agent-plugins.org), which Cursor, VS Code, GitHub Copilot, ChatGPT and Codex, Kiro and others load, running `@scavio/mcp-server` over stdio

The `skills/` folder is shared by both. `commands/` is Claude Code only and other clients ignore it. See the [repo README](../../README.md) for install instructions per client.

---

## What this plugin adds

**MCP tools.** Connects Claude Code to Scavio's hosted MCP server at `https://mcp.scavio.dev/mcp` over streamable HTTP. The plugin registers the server's default platform set: 106 tools covering Extract, Google, YouTube, Amazon, Walmart, Reddit, TikTok, TikTok Shop, Instagram, X and LinkedIn, plus `get_usage`. Tools land in the session namespaced as `mcp__plugin_scavio_scavio__<tool>`, for example `mcp__plugin_scavio_scavio__search_google`.

**Skills.** Twelve skills, one for setup and one per platform. They teach Claude which tool to pick for a given request, what the parameters mean, and what comes back — so "find the top-rated cordless drills on Amazon under $100" resolves to `search_amazon` with the right filters instead of a guess or a web scrape.

**Commands.** Four slash commands for the things you do by hand rather than through conversation.

---

## Setup

### 1. Set your API key

The plugin's MCP config reads `SCAVIO_API_KEY` from your shell environment:

```bash
export SCAVIO_API_KEY=your_key_here
```

Add that to `~/.zshrc` or `~/.bashrc` so it persists. Claude Code expands the variable when it loads the plugin's `.mcp.json` and sends it as the `x-api-key` header.

If the variable is not set, the plugin still loads — but Claude Code passes the literal text `${SCAVIO_API_KEY}` through as the header, and every call fails with an auth error rather than something self-explanatory. `claude mcp list` will also warn about the missing variable. If Scavio tools are erroring, check this first.

Environment variables are read when Claude Code starts. If you exported the key in an already-running shell, restart Claude Code or run `/reload-plugins`.

### 2. Confirm it works

```
/scavio:credits
```

This calls `get_usage`, which returns your credit balance and costs nothing. A balance means the server is reachable and your key is valid.

---

## Commands

| Command | What it does |
| --- | --- |
| `/scavio:setup` | Walks through connecting the plugin: checks `SCAVIO_API_KEY`, calls the server, and reports what is wrong if it is not working |
| `/scavio:search` | Runs a Google search through Scavio and returns structured results rather than a scraped page |
| `/scavio:extract` | Reads a URL and returns it as clean Markdown, plain text, or raw HTML |
| `/scavio:credits` | Reports your current Scavio credit balance and usage |

The short forms `/setup`, `/search`, `/extract` and `/credits` also work when nothing else in your setup claims those names.

---

## Skills

Skills load on their own when a request matches. You can also invoke one directly by name.

| Skill | Covers |
| --- | --- |
| `scavio-setup` | Getting connected and diagnosing a broken connection: API key, headers, which tools should be present |
| `scavio-extract` | Reading any http(s) URL as Markdown, plain text, or raw HTML — the general read-a-page primitive (1 tool) |
| `scavio-google` | Google web search: `search_google` / `POST /api/v2/google`. The `google` platform loads 13 more tools (AI Mode, Maps, Maps reviews, Shopping, Flights, Hotels, News, Trends) that this skill names but does not document |
| `scavio-youtube` | Video and Shorts search, video detail, metadata, comments and replies, transcripts, channels and their uploads (16 tools) |
| `scavio-tiktok` | Profiles, user posts, video detail, comments and replies, video and user search, hashtags, followers and followings (11 tools) |
| `scavio-tiktok-shop` | Product search and suggestions, product detail, product reviews, categories, category and shop catalogues, URL resolution (8 tools) |
| `scavio-instagram` | Profiles, posts, reels, tagged media, stories, post detail, comments and replies, user and hashtag search, follow graph (12 tools) |
| `scavio-x` | Post search, single posts, replies and retweeters, user profiles, timelines, media, follow graph, trending (11 tools) |
| `scavio-linkedin` | Person profiles and posts, company profiles and posts, job search, job detail, post detail and comments (9 tools) |
| `scavio-amazon` | Marketplace search, full product pages by ASIN, all sellers offering an ASIN, and the list of supported marketplaces (4 tools) |
| `scavio-walmart` | Search, product detail, reviews, category browse, offers, sellers and seller catalogues (7 tools) |
| `scavio-reddit` | Search and suggestions, post detail, comments and replies, subreddits and their posts, users and their history, popular and trending (12 tools) |

---

## Notes

Credit costs are per tool and stated in each tool's description. `get_usage` is free. Full endpoint reference, parameters and response shapes: [scavio.dev/docs](https://scavio.dev/docs).

The same data is available over REST at `https://api.scavio.dev` with `Authorization: Bearer $SCAVIO_API_KEY`, which is what to reach for when you want Claude to write code against Scavio rather than call it directly.

MIT licensed.
