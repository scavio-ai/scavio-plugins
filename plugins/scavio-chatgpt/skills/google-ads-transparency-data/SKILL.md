---
name: google-ads-transparency-data
description: Answer questions with live Google Ads Transparency data from Scavio. Use when the user asks about Google Ads Transparency: resolve a brand or domain to a verified advertiser id, pull every ad it runs across Search, YouTube, Shopping, Maps and Play with first-seen and last-seen dates, then open one creative with its region and impression history.
---

# Google Ads Transparency data with Scavio

Use Scavio's Google Ads Transparency tools to answer with current public Google Ads Transparency data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `resolve_google_ads_advertiser` | Resolve a brand or domain to a Google Ads Transparency advertiser_id. |
| `search_google_ads` | List ads for one Google Ads Transparency advertiser. |
| `get_google_ads_creative` | Get one Google Ads Transparency creative with full history and per-region breakdown. |

## Work in this order

1. Run the narrowest tool that answers the question. Do not call tools the question does not need.
2. Search first when the user gives a name or keyword, then pass the id the search returns to the detail tool. Do not guess ids.
3. Page through more results only when the user asks for more than the first page returns.

## Write the answer

- Answer from the returned data only. Do not invent results, prices, ratings, dates or sources.
- Link the source page for each item you mention when the data includes it.
- Prices, counts and availability change; say they are current as of the request.
- When nothing matches, say so and suggest a different query.
- If a tool returns an error, tell the user what failed in plain language. If the account has no credits left, say that the request could not run.
