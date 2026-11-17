# Scavio for ChatGPT and Codex

The Scavio plugin for the ChatGPT and Codex plugin directory. It connects to Scavio's hosted MCP server at `https://mcp.scavio.dev/chatgpt` and adds one skill per data source that guides the model through its tools.

| Path | What it is |
| --- | --- |
| `plugin.json` | Agent Plugins manifest with the OpenAI listing, review cases and publication settings under `extensions.com.openai` |
| `mcp.json` | The remote MCP server (streamable HTTP). Authentication is OAuth, discovered from the server |
| `skills/web-research/` | Google, company contacts and web pages: choosing a tool, ordering calls and citing sources |
| `skills/<platform>-data/` | One skill per platform (TikTok, Instagram, YouTube, Reddit, X, LinkedIn, Amazon, Walmart, Target, Home Depot, eBay, Best Buy, Zillow, Redfin, Realtor.com), generated from the live tool list by `scripts/gen-chatgpt-skills.mjs` |
| `assets/` | Listing logo and composer icon |

## Tools

Google search, news, shopping and Maps (search, place details, reviews); social media (TikTok, Instagram, YouTube, Reddit, X, LinkedIn); retailers (Amazon, Walmart, Target, Home Depot, eBay, Best Buy); real estate (Zillow, Redfin, Realtor.com); published company contact details from a website or Maps listing; and reading public web pages, site maps, crawls and batches of URLs. Every tool reads public data; crawl and batch start a job on your account and can be cancelled.

## Connect

Install Scavio from the plugin directory in ChatGPT or Codex and sign in with your Scavio account when asked. No API key to copy. To use the same server from another MCP client, see the [MCP docs](https://scavio.dev/docs/mcp).

## Support

[scavio.dev/support](https://scavio.dev/support) · [Privacy](https://scavio.dev/privacy) · [Terms](https://scavio.dev/terms)
