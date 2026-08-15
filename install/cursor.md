# Install Scavio in Cursor

Scavio's hosted MCP server gives Cursor's agent web search, page extraction, and structured data from e-commerce, social, travel, jobs, real-estate, app-store, ad-library and company-filing sources. There is nothing to install locally — Cursor connects to `https://mcp.scavio.dev/mcp` over HTTP.

Get an API key at [scavio.dev](https://scavio.dev).

There are two ways in. The **MCP server** below connects Cursor to the hosted endpoint and gives it the tools. The **Agent Plugin** additionally gives it the twelve Scavio skills, which tell the agent which tool to reach for. If you want both, install the plugin.

---

## As an Agent Plugin (tools plus skills)

Cursor supports the [Agent Plugins](https://agent-plugins.org) standard, and `plugins/scavio/` in this repo is a conformant package.

```bash
git clone https://github.com/scavio-ai/scavio-plugins.git
ln -s "$PWD/scavio-plugins/plugins/scavio" ~/.cursor/plugins/local/scavio
export SCAVIO_API_KEY=your_key_here
```

Restart Cursor, or run **Developer: Reload Window**. Open **Customize** in the sidebar to confirm the skills and the `scavio` MCP server are listed.

This path runs `npx -y @scavio/mcp-server` over stdio and reads the key from your environment, because the Agent Plugins specification forbids credentials in `mcp.json` headers. For the hosted server with an `x-api-key` header, use the MCP install below instead.

---

## As an MCP server (tools only)

### One-click install

[![Add scavio MCP server to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/install-mcp?name=scavio&config=eyJ1cmwiOiJodHRwczovL21jcC5zY2F2aW8uZGV2L21jcCIsImhlYWRlcnMiOnsieC1hcGkta2V5IjoiWU9VUl9TQ0FWSU9fQVBJX0tFWSJ9fQ%3D%3D)

Direct link, if the button does not render:

```
https://cursor.com/install-mcp?name=scavio&config=eyJ1cmwiOiJodHRwczovL21jcC5zY2F2aW8uZGV2L21jcCIsImhlYWRlcnMiOnsieC1hcGkta2V5IjoiWU9VUl9TQ0FWSU9fQVBJX0tFWSJ9fQ%3D%3D
```

The canonical deeplink, for contexts that accept a custom URL scheme (a docs page button, `open` on macOS, `xdg-open` on Linux):

```
cursor://anysphere.cursor-deeplink/mcp/install?name=scavio&config=eyJ1cmwiOiJodHRwczovL21jcC5zY2F2aW8uZGV2L21jcCIsImhlYWRlcnMiOnsieC1hcGkta2V5IjoiWU9VUl9TQ0FWSU9fQVBJX0tFWSJ9fQ%3D%3D
```

The link installs the server with the placeholder `YOUR_SCAVIO_API_KEY` in the `x-api-key` header. **You still have to replace it with your real key** — open the entry in Cursor Settings, or edit `~/.cursor/mcp.json` directly. Until you do, every Scavio call returns an auth error.

If you would rather Cursor read the key from your environment, use this variant instead. It installs `"x-api-key": "${env:SCAVIO_API_KEY}"`, so nothing secret is written to disk:

```
cursor://anysphere.cursor-deeplink/mcp/install?name=scavio&config=eyJ1cmwiOiJodHRwczovL21jcC5zY2F2aW8uZGV2L21jcCIsImhlYWRlcnMiOnsieC1hcGkta2V5IjoiJHtlbnY6U0NBVklPX0FQSV9LRVl9In19
```

That form requires `SCAVIO_API_KEY` to be exported in the environment Cursor inherits, which on macOS means setting it before Cursor launches (a shell export in an already-running terminal will not reach an app started from the Dock).

---

## Manual install

### Where the file goes

| Scope | Path | Applies to |
| --- | --- | --- |
| Project | `.cursor/mcp.json` in your repo root | That project only |
| Global | `~/.cursor/mcp.json` | Every project |

Create the file if it does not exist. If it does, merge the `scavio` entry into the existing `mcpServers` object rather than replacing the file.

### Config

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

Replace `YOUR_SCAVIO_API_KEY` with your key. A remote server is identified by the presence of `url` — there is no `type` field to set.

### Keeping the key out of the file

Cursor resolves variables inside `url` and `headers`, so this works and is the better choice for a `.cursor/mcp.json` you intend to commit:

```json
{
  "mcpServers": {
    "scavio": {
      "url": "https://mcp.scavio.dev/mcp",
      "headers": {
        "x-api-key": "${env:SCAVIO_API_KEY}"
      }
    }
  }
}
```

Then export the key where Cursor will see it:

```bash
export SCAVIO_API_KEY=your_key_here
```

If you are on macOS and launch Cursor from the Dock or Spotlight, set the variable in your login environment rather than a terminal session, or start Cursor from a shell that already has it.

---

## Choosing which tools load

By default the server registers 106 tools: Extract, Google, YouTube, Amazon, Walmart, Reddit, TikTok, TikTok Shop, Instagram, X and LinkedIn, plus `get_usage`. The full surface is 191 tools, which is a lot of tool definitions to carry in every session.

Add the `x-scavio-platforms` header to change the set:

```json
{
  "mcpServers": {
    "scavio": {
      "url": "https://mcp.scavio.dev/mcp",
      "headers": {
        "x-api-key": "${env:SCAVIO_API_KEY}",
        "x-scavio-platforms": "google,youtube,tiktok,instagram"
      }
    }
  }
}
```

The header takes a comma-separated list of platform keys plus three keywords:

- `all` — every platform, 191 tools
- `default` — the 11 platforms above, and it is additive: `default,sec,zillow` gives you the default set plus SEC and Zillow
- `none` — no platform tools, leaving only `get_usage`

Unknown entries are skipped with a warning rather than breaking the connection, and a list that is entirely typos falls back to the default set.

Platform keys: `extract`, `google`, `youtube`, `tiktok`, `instagram`, `reddit`, `x`, `linkedin`, `threads`, `kuaishou`, `amazon`, `walmart`, `ebay`, `target`, `homedepot`, `tiktok-shop`, `booking`, `airbnb`, `tripadvisor`, `yelp`, `zillow`, `redfin`, `indeed`, `glassdoor`, `appstore`, `googleplay`, `g2`, `capterra`, `googleads`, `metaads`, `sec`, `companieshouse`.

A ready-made deeplink for the four-platform example above:

```
cursor://anysphere.cursor-deeplink/mcp/install?name=scavio&config=eyJ1cmwiOiJodHRwczovL21jcC5zY2F2aW8uZGV2L21jcCIsImhlYWRlcnMiOnsieC1hcGkta2V5IjoiWU9VUl9TQ0FWSU9fQVBJX0tFWSIsIngtc2NhdmlvLXBsYXRmb3JtcyI6Imdvb2dsZSx5b3V0dWJlLHRpa3RvayxpbnN0YWdyYW0ifX0%3D
```

---

## Verify the connection

1. Open **Cursor Settings** and find the MCP section. The `scavio` server should be listed with a green or connected indicator and a tool count.
2. In the agent, ask: `what is my Scavio credit balance?` That routes to `get_usage`, which is free and returns your balance. A number back means the key is valid and the transport works.
3. Then try a real call: `search Google for "structured serp api" and give me the top five results`.

### If it does not connect

- **Auth error on every call.** The key is wrong, or `${env:SCAVIO_API_KEY}` did not expand because Cursor did not inherit the variable. Swap in the literal key temporarily to tell the two apart.
- **Server not listed.** The JSON is malformed, or the file is in the wrong place. `.cursor/mcp.json` goes in the repo root, not in `.cursor/rules/` or the home directory.
- **Nothing changed after editing.** Reload the Cursor window, or toggle the server off and on in Settings.
- **Fewer tools than expected.** Check `x-scavio-platforms` for a typo — unknown keys are skipped silently apart from a warning.

---

## Reference

Endpoints, parameters, response shapes and credit costs: [scavio.dev/docs](https://scavio.dev/docs).

The REST API is at `https://api.scavio.dev`, authenticated with `Authorization: Bearer $SCAVIO_API_KEY`.
