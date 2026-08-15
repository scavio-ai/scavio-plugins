---
name: scavio-setup
description: Use when setting up or troubleshooting Scavio - getting an API key, connecting the hosted MCP server or direct REST, choosing which platform tools load, checking the credit balance, or interpreting a 401, 402 or 429 error from the Scavio API.
---

# Scavio setup

Scavio is a scraping API: one key, one base URL, structured JSON for search, social, retail, travel, jobs, app stores, reviews, ad libraries and company filings, plus a generic read-any-URL Extract endpoint.

## When to use

- "How do I get a Scavio API key" / "where do I put SCAVIO_API_KEY"
- "Connect the Scavio MCP" / "add Scavio to Claude Code"
- "Which Scavio tools are loaded" / "enable the Zillow tools" / "too many tools"
- "How many credits do I have left"
- Any Scavio call coming back `401`, `402` or `429`

## 1. Get an API key

Create a key at https://scavio.dev, then put it in the environment:

```bash
export SCAVIO_API_KEY=your_key_here
```

Everything below reads that one variable. Never paste the key into a file that gets committed.

## 2. Connect

Two ways, and they can coexist.

### Hosted MCP (recommended)

Streamable HTTP endpoint: `https://mcp.scavio.dev/mcp`, authenticated with the `x-api-key` header.

```bash
claude mcp add --transport http scavio https://mcp.scavio.dev/mcp \
  --header "x-api-key: $SCAVIO_API_KEY"
```

Or as MCP config:

```json
{
  "mcpServers": {
    "scavio": {
      "type": "http",
      "url": "https://mcp.scavio.dev/mcp",
      "headers": {
        "x-api-key": "YOUR_SCAVIO_API_KEY",
        "x-scavio-platforms": "default,zillow,sec"
      }
    }
  }
}
```

`Authorization: Bearer <key>` is also accepted on the MCP endpoint. A missing key returns `401` with `{"error": "Missing SCAVIO_API_KEY. Provide x-api-key or Authorization: Bearer header."}`.

### Direct REST

Base URL `https://api.scavio.dev`, auth header `Authorization: Bearer $SCAVIO_API_KEY`. Endpoint paths, parameters and credit costs live in the per-platform skills.

```bash
curl -X POST https://api.scavio.dev/api/v2/google \
  -H "Authorization: Bearer $SCAVIO_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"query": "scavio api", "gl": "us", "hl": "en"}'
```

## 3. Choose which platforms load

The full tool surface is far too large to register in every session, so the MCP server registers an allowlist. Pick it per connection with the `x-scavio-platforms` header (comma-separated). On a local stdio server the same value comes from the `SCAVIO_PLATFORMS` environment variable. The Claude Code plugin's `.mcp.json` sends the header filled from `${SCAVIO_PLATFORMS:-default}`, so there you set the variable and restart Claude Code rather than editing a header by hand.

Platform keys, in registration order:

```
extract, google, youtube, tiktok, instagram, reddit, x, linkedin, threads,
kuaishou, amazon, walmart, ebay, target, homedepot, tiktok-shop, booking,
airbnb, tripadvisor, yelp, zillow, redfin, indeed, glassdoor, appstore,
googleplay, g2, capterra, googleads, metaads, sec, companieshouse
```

Default set when the header and env var are both unset:

```
extract, google, youtube, amazon, walmart, reddit, tiktok, tiktok-shop,
instagram, x, linkedin
```

Three keywords are accepted alongside the keys:

- `all` - every platform
- `default` - expands to the default set, so `default,sec,g2` is additive
- `none` - no platform tools at all, leaving only `get_usage`

Lookups are case- and punctuation-insensitive (`meta-ads`, `metaads` and `META_ADS` all resolve to the same entry), and these aliases work: `twitter` -> `x`, `facebookads` / `metaadlibrary` -> `metaads`, `googleadstransparency` -> `googleads`. An unknown key is warned about on stderr and skipped, never fatal; a list that is entirely typos falls back to the default set.

`GET https://mcp.scavio.dev/` returns the server version plus the live `platforms` and `default_platforms` lists if you want to confirm what a build supports.

## 4. Check credits

The `get_usage` MCP tool registers unconditionally - it is present even with `x-scavio-platforms: none`, and it costs nothing. It is the fastest way to confirm the key and the connection both work.

The REST equivalent is:

```bash
curl https://api.scavio.dev/api/v1/usage \
  -H "Authorization: Bearer $SCAVIO_API_KEY"
```

```json
{
  "plan": "free",
  "credit_balance": 0,
  "purchased_credits": 0,
  "searches_used": 0,
  "period_start": "2026-08-01T00:00:00.000Z",
  "auto_recharge": { "enabled": false, "threshold": 0, "amount": 0, "cost": 0 }
}
```

`credit_balance` is what every billed call is checked against.

## 5. Errors

| Status | Meaning | What to do |
|---|---|---|
| `401` | Bad or missing key. Body is `{"error": "..."}` with `Missing Authorization header`, `Invalid Authorization header format`, `Invalid API key`, or `User not found`. | Check `SCAVIO_API_KEY` is exported and matches a live key at https://scavio.dev. Header must be `Authorization: Bearer <key>` on REST, `x-api-key` on the hosted MCP. |
| `402` | Not enough credits for this call. Body carries `error` (`Insufficient credits`, or `Payment required` when a subscription is past due), plus `credit_balance`, `state`, `cta`, `message` and `billing_url`. | Stop retrying - a retry costs the same and fails the same. Surface `message` and `billing_url` to the user. |
| `429` | Concurrency limit exceeded. Body carries `plan`, `concurrency` and `in_flight`. | Let in-flight requests finish before sending more; lower parallelism rather than retrying immediately. |
| `400` | Invalid parameter. | Read the `error` message and fix the request. Not billed. |
| `502` / `503` | Upstream provider failed or is unavailable. | Wait a few seconds and retry once. |

Notes that save a debugging round trip:

- The credit check runs before the scrape, so a `402` means nothing was fetched and nothing was charged.
- Auto-recharge only tops up when the account explicitly enabled it; otherwise an exhausted balance is a plain `402`.
- Credit cost is per endpoint and, for `POST /api/v1/extract`, per `mode`. Never quote a single flat per-call price across platforms.
- If `SCAVIO_API_KEY` is not set, prompt the user to export it rather than guessing a key.
