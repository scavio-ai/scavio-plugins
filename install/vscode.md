# Install Scavio in VS Code

Scavio's hosted MCP server gives VS Code agent mode web search, page extraction, and structured data from e-commerce, social, travel, jobs, real-estate, app-store, ad-library and company-filing sources. Nothing runs locally — VS Code connects to `https://mcp.scavio.dev/mcp` over streamable HTTP, so there is no Node.js prerequisite.

Get an API key at [scavio.dev](https://scavio.dev).

VS Code also implements the [Agent Plugins](https://agent-plugins.org) standard, and `plugins/scavio/` in this repo is a conformant package carrying the twelve Scavio skills alongside the MCP server. Installing it gives the agent guidance on which tool to pick, not just the tools; see the [Agent Plugins section of the README](../README.md#agent-plugins) and VS Code's own documentation for where it reads plugins from. The MCP-only install below is the lighter option and is what the buttons do.

---

## One-click install

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_Scavio-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=scavio&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fmcp.scavio.dev%2Fmcp%22%2C%22headers%22%3A%7B%22x-api-key%22%3A%22%24%7Binput%3Ascavio-api-key%7D%22%7D%7D&inputs=%5B%7B%22type%22%3A%22promptString%22%2C%22id%22%3A%22scavio-api-key%22%2C%22description%22%3A%22Scavio%20API%20key%20from%20scavio.dev%22%2C%22password%22%3Atrue%7D%5D)
[![Install in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Install_Scavio-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://vscode.dev/redirect/mcp/install?name=scavio&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fmcp.scavio.dev%2Fmcp%22%2C%22headers%22%3A%7B%22x-api-key%22%3A%22%24%7Binput%3Ascavio-api-key%7D%22%7D%7D&inputs=%5B%7B%22type%22%3A%22promptString%22%2C%22id%22%3A%22scavio-api-key%22%2C%22description%22%3A%22Scavio%20API%20key%20from%20scavio.dev%22%2C%22password%22%3Atrue%7D%5D&quality=insiders)

The button installs the server into your user profile and registers a prompted input for the key, so VS Code asks for it the first time the server starts instead of putting it in a file. Nothing secret is written anywhere you might commit.

The raw scheme form, for a context that accepts a custom URL scheme rather than an https link:

```
vscode:mcp/install?%7B%22name%22%3A%22scavio%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fmcp.scavio.dev%2Fmcp%22%2C%22headers%22%3A%7B%22x-api-key%22%3A%22%24%7Binput%3Ascavio-api-key%7D%22%7D%2C%22inputs%22%3A%5B%7B%22type%22%3A%22promptString%22%2C%22id%22%3A%22scavio-api-key%22%2C%22description%22%3A%22Scavio%20API%20key%20from%20scavio.dev%22%2C%22password%22%3Atrue%7D%5D%7D
```

For Insiders, use the same payload with the `vscode-insiders:` scheme.

---

## Manual install

### Where the file goes

| Scope | File | How to open it |
| --- | --- | --- |
| Workspace | `.vscode/mcp.json` in your workspace root | Command Palette: **MCP: Open Workspace Folder MCP Configuration** |
| User profile | `mcp.json` in your VS Code user folder | Command Palette: **MCP: Open User Configuration** |
| Remote / SSH | profile `mcp.json` on the remote | Command Palette: **MCP: Open Remote User Configuration** |

Use the command rather than hunting for the path — the user-profile file moves depending on which profile is active. For the default profile it resolves to `~/Library/Application Support/Code/User/mcp.json` on macOS, `%APPDATA%\Code\User\mcp.json` on Windows, and `~/.config/Code/User/mcp.json` on Linux.

Workspace scope is the one to use when you want the whole team to get Scavio on clone.

### Config

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

If the file already has other servers, merge the `scavio` entry into `servers` and append the input object to `inputs`.

---

## The key is prompted, not committed

This is the part worth getting right in a shared repo.

`inputs` is a top-level array of things VS Code will ask you for. Each entry needs a `type` and a unique `id`; a `promptString` also takes a `description` and, for anything secret, `password: true` so the value is masked as you type it. Anywhere in a server config you then write `${input:<id>}` and VS Code substitutes the value.

The flow: the first time the `scavio` server starts, VS Code shows an input box labelled "Scavio API key from scavio.dev". You paste your key, VS Code stores it securely, and it does not ask again. The key never touches `.vscode/mcp.json`, so the file is safe to commit — every teammate gets the server and supplies their own key on first run.

VS Code's own guidance is explicit about this: do not hardcode API keys, use input variables or environment files instead.

To clear or change a stored key, run **MCP: Show Installed Servers**, open the `scavio` entry, and reset its inputs — or delete the input and let VS Code prompt again on next start.

---

## Choosing which tools load

By default the server registers 106 tools: Extract, Google, YouTube, Amazon, Walmart, Reddit, TikTok, TikTok Shop, Instagram, X and LinkedIn, plus `get_usage`. The full surface is 191 tools, which is more than agent mode wants to carry in every request.

`headers` is a free-form string map, so add `x-scavio-platforms` next to the key:

```json
    "scavio": {
      "type": "http",
      "url": "https://mcp.scavio.dev/mcp",
      "headers": {
        "x-api-key": "${input:scavio-api-key}",
        "x-scavio-platforms": "extract,google,youtube,amazon"
      }
    }
```

The header takes a comma-separated list of platform keys plus three keywords:

- `all` — every platform, 191 tools
- `default` — the 11 platforms above, and it is additive: `default,sec,zillow` gives the default set plus SEC and Zillow
- `none` — no platform tools, leaving only `get_usage`

Unknown entries are skipped with a warning rather than breaking the connection.

Platform keys: `extract`, `google`, `youtube`, `tiktok`, `instagram`, `reddit`, `x`, `linkedin`, `threads`, `kuaishou`, `amazon`, `walmart`, `ebay`, `target`, `homedepot`, `tiktok-shop`, `booking`, `airbnb`, `tripadvisor`, `yelp`, `zillow`, `redfin`, `indeed`, `glassdoor`, `appstore`, `googleplay`, `g2`, `capterra`, `googleads`, `metaads`, `sec`, `companieshouse`.

You can also narrow the list VS Code shows the model per-request from the tools picker in the Chat view, without changing the config.

---

## Verify the connection

1. Run **MCP: Show Installed Servers** from the Command Palette. `scavio` should be listed as running, with a tool count.
2. Open the Chat view, switch to agent mode, and click the tools icon. Scavio's tools should appear in the picker.
3. Ask: `what is my Scavio credit balance?` That routes to `get_usage`, which is free and returns your balance. A number back means the key and transport are both good.
4. Then try a real call: `search Google for "structured serp api" and give me the top five results`.

### If it does not connect

- **No prompt for the key.** The `${input:scavio-api-key}` reference does not match an `id` in the `inputs` array, or `inputs` is nested inside `servers` instead of sitting at the top level next to it.
- **Auth error on every call.** The stored key is wrong. Reset the server's inputs and enter it again.
- **Server missing.** The file is in the wrong place — `.vscode/mcp.json` goes in the workspace root, and the user-profile file must be opened through **MCP: Open User Configuration** rather than guessed at.
- **Edits not picked up.** Restart the server from **MCP: Show Installed Servers**.

---

## Local alternative

If you would rather run the server on your own machine over stdio, the npm package works too and needs Node.js 20 or newer:

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
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@scavio/mcp-server"],
      "env": {
        "SCAVIO_API_KEY": "${input:scavio-api-key}"
      }
    }
  }
}
```

The hosted server is the recommended path — it has no runtime dependency and updates without you doing anything.

---

## Reference

Endpoints, parameters, response shapes and credit costs: [scavio.dev/docs](https://scavio.dev/docs).

The REST API is at `https://api.scavio.dev`, authenticated with `Authorization: Bearer $SCAVIO_API_KEY`.
