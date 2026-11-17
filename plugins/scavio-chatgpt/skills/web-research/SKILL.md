---
name: web-research
description: Answer questions with the content of public web pages and sites, and a company's published contact details, from Scavio. Use when the user gives a URL, asks what a page or site says, wants many pages of a site read, or wants a company's published emails, phones and social profiles.
---

# Web pages and company contacts with Scavio

Use Scavio's tools to read public web pages and sites, find a company's published contact details, and cite where each fact came from. The user's explicit instructions always take priority over this workflow: if they name a tool, a source, a number of results or an output format, follow that.

For Google search, news, shopping, Maps, Flights, Hotels, Trends, Google Play or Ads Transparency, a retailer, TikTok, YouTube, Instagram, Zillow, Redfin or Realtor.com, use that skill and its tools instead.

## Pick the tool for the question

| The user wants | Use |
| --- | --- |
| What a specific page says | `extract_url` |
| Which pages a site has | `map_website`, then `extract_url` or `batch_extract` on the pages that matter |
| Many pages of one site | `crawl_website`, then `get_crawl_status` if it returns a job id |
| A list of known URLs | `batch_extract`, then `get_batch_status` if it returns a job id |
| A company's published emails, phones and social profiles | `company_enrich` with the company's website or a Google Maps `place_id` |
| How much of their Scavio balance is left | `get_usage` |

## Work in this order

1. Run the narrowest tool that answers the question. Do not call tools the question does not need.
2. For a page that comes back empty because it builds its content with JavaScript, retry `extract_url` once with `mode: "advanced"`.
3. Start a crawl or batch only when the user wants many pages. If the job is still running, check it with the status tool rather than starting a new job. Cancel a job only when the user asks.

## Write the answer

- Answer from the returned data only. Do not invent facts, contact details or dates.
- Link the source page for every fact you state.
- Report contact details only for the business the user asked about, as published by that business.
- If a tool returns an error, tell the user what failed in plain language. If the account has no credits left, say that the request could not run.
