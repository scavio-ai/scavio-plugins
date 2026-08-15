---
description: Set up Scavio - get an API key, export SCAVIO_API_KEY, and verify the MCP connection with one live call
allowed-tools: Bash(curl:*), Bash(sh:*), mcp__plugin_scavio_scavio__get_usage
---

Walk the user through connecting the Scavio MCP server. Do the steps in order and stop at the first one that fails.

1. Check whether the key is already in this environment without ever printing it:
   `if [ -n "$SCAVIO_API_KEY" ]; then echo present; else echo missing; fi`

2. If it is missing, tell the user to get an API key at https://scavio.dev, then add it to their shell profile (`~/.zshrc` or `~/.bashrc`):
   `export SCAVIO_API_KEY="your_key_here"`
   The plugin's MCP server reads the variable from the environment Claude Code was launched in, so they must open a new shell and restart Claude Code (or run `/reload-plugins`) before it takes effect.

3. Mention the tool surface: this plugin talks to the hosted server at `https://mcp.scavio.dev/mcp`, which picks the allowlist from the `x-scavio-platforms` request header. The plugin's `.mcp.json` fills that header from `${SCAVIO_PLATFORMS:-default}`, so with the variable unset it sends `default` - 11 platforms plus `get_usage`, 106 tools. To widen it, export the variable the same way as the key and restart Claude Code: `export SCAVIO_PLATFORMS=default,zillow,sec` (the `default` keyword is additive), or `all` for every platform. Warn that `all` is 191 tools and a large payload in every session. Unknown keys are skipped with a warning rather than breaking the connection.

4. Verify with one live call. Prefer the `get_usage` tool from the scavio MCP server. If that server is not connected, fall back to:
   `curl -s https://api.scavio.dev/api/v1/usage -H "Authorization: Bearer $SCAVIO_API_KEY"`

5. Report the `plan` and `credit_balance` fields from the response and confirm the connection works. `get_usage` costs no credits.

6. If the call returns an auth error, the most likely cause is that `SCAVIO_API_KEY` was unset when Claude Code started, in which case the server received the literal text `${SCAVIO_API_KEY}` as its `x-api-key` header. Have the user export the key and restart, then retry step 4.
