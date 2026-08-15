# Scavio Plugins

[Scavio](https://scavio.dev) is a unified web data API that gives AI agents web search, page extraction, and structured data from e-commerce, social, travel, jobs, real-estate, app-store, ad-library and company-filing sources behind one API key. This repository packages that surface for coding agents: a Claude Code plugin, plus one-click install links and copy-pasteable config for Cursor and VS Code.

All three targets talk to the same hosted MCP server at `https://mcp.scavio.dev/mcp` (streamable HTTP, authenticated with the `x-api-key` header). Get an API key at [scavio.dev](https://scavio.dev).

---

## Contents

| Path | What it is |
| --- | --- |
| `plugins/scavio/` | The Claude Code plugin: skills, commands, and the MCP server config |
| `install/cursor.md` | Cursor install guide (deeplink and manual config) |
| `install/vscode.md` | VS Code install guide (deeplink and `mcp.json`) |

---

## Claude Code

The plugin ships skills and slash commands alongside the MCP tools, so Claude knows which Scavio tool to reach for instead of guessing.

### 1. Set your API key

The plugin's MCP config reads `SCAVIO_API_KEY` from your shell environment. Set it before starting Claude Code:

```bash
export SCAVIO_API_KEY=your_key_here
```

Put that line in `~/.zshrc` or `~/.bashrc` so it survives a new terminal. If the variable is unset, Claude Code still loads the plugin but sends the literal text `${SCAVIO_API_KEY}` as the header, and every Scavio tool call comes back as an auth error.

### 2. Install the plugin

From inside a Claude Code session:

```
/plugin marketplace add scavio-ai/scavio-plugins
/plugin install scavio@scavio-plugins
```

Or from a terminal:

```bash
claude plugin marketplace add scavio-ai/scavio-plugins
claude plugin install scavio@scavio-plugins
```

Add `--scope project` to either command to write the plugin into `.claude/settings.json` so everyone who clones the repo gets it.

### 3. Verify

```
/scavio:credits
```

That calls `get_usage`, which reports your credit balance and costs nothing. If it returns a balance, the server is connected and authenticated.

See [`plugins/scavio/README.md`](plugins/scavio/README.md) for the full list of skills and commands.

---

## Cursor

One click to add the server, then swap the placeholder `YOUR_SCAVIO_API_KEY` for your real key in Cursor Settings:

[![Add scavio MCP server to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/install-mcp?name=scavio&config=eyJ1cmwiOiJodHRwczovL21jcC5zY2F2aW8uZGV2L21jcCIsImhlYWRlcnMiOnsieC1hcGkta2V5IjoiWU9VUl9TQ0FWSU9fQVBJX0tFWSJ9fQ%3D%3D)

Or add it by hand. Project scope is `.cursor/mcp.json` in your repo root; global scope is `~/.cursor/mcp.json`.

```json
{
  "mcpServers": {
    "scavio": {
      "url": "https://mcp.scavio.dev/mcp",
      "headers": {
        "x-api-key": "YOUR_SCAVIO_API_KEY"
      }
    }
  }
}
```

To keep the key out of a committed file, Cursor resolves `${env:NAME}` inside `headers`, so `"x-api-key": "${env:SCAVIO_API_KEY}"` works too. Full walkthrough: [`install/cursor.md`](install/cursor.md).

---

## VS Code

VS Code prompts for the key and stores it securely rather than writing it into the file, so this button is safe to use in a shared repo:

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Scavio-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=scavio&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fmcp.scavio.dev%2Fmcp%22%2C%22headers%22%3A%7B%22x-api-key%22%3A%22%24%7Binput%3Ascavio-api-key%7D%22%7D%7D&inputs=%5B%7B%22type%22%3A%22promptString%22%2C%22id%22%3A%22scavio-api-key%22%2C%22description%22%3A%22Scavio%20API%20key%20from%20scavio.dev%22%2C%22password%22%3Atrue%7D%5D)
[![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Scavio-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=scavio&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fmcp.scavio.dev%2Fmcp%22%2C%22headers%22%3A%7B%22x-api-key%22%3A%22%24%7Binput%3Ascavio-api-key%7D%22%7D%7D&inputs=%5B%7B%22type%22%3A%22promptString%22%2C%22id%22%3A%22scavio-api-key%22%2C%22description%22%3A%22Scavio%20API%20key%20from%20scavio.dev%22%2C%22password%22%3Atrue%7D%5D&quality=insiders)

Or create `.vscode/mcp.json` in your workspace:

```json
{
  "inputs": [
    {
      "type": "promptString",
      "id": "scavio-api-key",
      "description": "Scavio API key from scavio.dev",
      "password": true
    }
  ],
  "servers": {
    "scavio": {
      "type": "http",
      "url": "https://mcp.scavio.dev/mcp",
      "headers": {
        "x-api-key": "${input:scavio-api-key}"
      }
    }
  }
}
```

VS Code prompts for the key the first time the server starts and stores it after that, so this file is safe to commit. Full walkthrough: [`install/vscode.md`](install/vscode.md).

---

## Platform coverage

191 tools across 31 platforms plus Extract, all on one key.

| Category | Platforms | Tools |
| --- | --- | --- |
| Any web page | Extract | 1 |
| Search | Google (web, AI Mode, Maps, Shopping, Flights, Hotels, News, Trends) | 14 |
| Social and video | YouTube, TikTok, Instagram, Reddit, X, LinkedIn, Threads, Kuaishou | 91 |
| Retail and marketplaces | Amazon, Walmart, eBay, Target, Home Depot, TikTok Shop | 29 |
| Travel and local | Booking, Airbnb, Tripadvisor, Yelp | 13 |
| Real estate | Zillow, Redfin | 6 |
| Jobs and employers | Indeed, Glassdoor | 8 |
| App stores | Apple App Store, Google Play | 6 |
| Software reviews | G2, Capterra | 6 |
| Ad libraries | Google Ads Transparency, Meta Ad Library | 6 |
| Company filings | SEC, Companies House | 10 |

That is 190 platform tools. The 191st is `get_usage`, which reports your credit balance, costs nothing, and is always registered regardless of which platforms you enable.

The hosted server does not register all 191 tools by default. Loading everything puts roughly 262KB of tool definitions into a session before you type anything, so the default set is 106 tools: Extract, Google, YouTube, Amazon, Walmart, Reddit, TikTok, TikTok Shop, Instagram, X and LinkedIn, plus `get_usage`. That is what the Claude Code plugin installs.

You can change it on any of the three. The server reads the set from the `x-scavio-platforms` header, so in Cursor and VS Code you add that header to your config directly. The Claude Code plugin already sends it, filled from `${SCAVIO_PLATFORMS:-default}`, so there you export the variable alongside the key: `export SCAVIO_PLATFORMS=default,sec,zillow`.

The value is a comma-separated list of platform keys plus three keywords — `all` (every platform, 191 tools), `default` (expands to the 11 above, so `default,sec,zillow` is additive), and `none` (leaves only `get_usage`). Unknown entries are skipped with a warning rather than failing the connection.

Platform keys: `extract`, `google`, `youtube`, `tiktok`, `instagram`, `reddit`, `x`, `linkedin`, `threads`, `kuaishou`, `amazon`, `walmart`, `ebay`, `target`, `homedepot`, `tiktok-shop`, `booking`, `airbnb`, `tripadvisor`, `yelp`, `zillow`, `redfin`, `indeed`, `glassdoor`, `appstore`, `googleplay`, `g2`, `capterra`, `googleads`, `metaads`, `sec`, `companieshouse`.

---

## Documentation

Endpoint reference, parameters, response shapes and credit costs: [scavio.dev/docs](https://scavio.dev/docs).

The REST API behind all of this is at `https://api.scavio.dev`, authenticated with `Authorization: Bearer $SCAVIO_API_KEY`.

---

## License

MIT. See [LICENSE](LICENSE).
