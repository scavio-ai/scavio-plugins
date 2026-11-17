# Scavio for ChatGPT and Codex

The Scavio plugin for the ChatGPT and Codex plugin directory. It connects to Scavio's hosted MCP server at `https://mcp.scavio.dev/chatgpt` and adds one skill per data source that guides the model through its tools.

| Path | What it is |
| --- | --- |
| `plugin.json` | Agent Plugins manifest with the OpenAI listing, review cases and publication settings under `extensions.com.openai` |
| `mcp.json` | The remote MCP server (streamable HTTP). Authentication is OAuth, discovered from the server |
| `skills/web-research/` | Web pages, site crawls and company contacts (hand-written) |
| `skills/<name>/` | One skill per Google product and per platform: Google Search, News, Shopping, Maps, Flights, Hotels, Trends, Play, Ads Transparency; 40 US retailers; TikTok, YouTube, Instagram; Zillow, Redfin, Realtor.com. Generated from the live tool list by `scripts/gen-chatgpt-skills.mjs` |
| `assets/` | Listing logo and composer icon |

## Tools

Every Google product Scavio covers (Search, AI Mode, News, Shopping, Maps, Flights, Hotels, Trends, Google Play, Ads Transparency); 40 US retailers (Amazon, Walmart, Target, Costco, Home Depot, Best Buy and more); TikTok, YouTube and Instagram; Zillow, Redfin and Realtor.com; published company contact details from a website or Maps listing; and reading public web pages, site maps, crawls and batches of URLs. Every tool reads public data; crawl and batch start a job on your account and can be cancelled.

## Connect

Install Scavio from the plugin directory in ChatGPT or Codex and sign in with your Scavio account when asked. No API key to copy. To use the same server from another MCP client, see the [MCP docs](https://scavio.dev/docs/mcp).

## Support

[scavio.dev/support](https://scavio.dev/support) · [Privacy](https://scavio.dev/privacy) · [Terms](https://scavio.dev/terms)
