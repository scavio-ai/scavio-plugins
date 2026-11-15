---
name: web-research
description: Answer questions with live web data from Scavio. Use when the user asks for current search results, recent news, product prices, local businesses and their reviews, a company's published contact details, or the content of a specific web page or site.
---

# Web research with Scavio

Use Scavio's tools to answer with current information from the web, and cite where each fact came from. The user's explicit instructions always take priority over this workflow: if they name a tool, a source, a number of results or an output format, follow that.

## Pick the tool for the question

| The user wants | Use |
| --- | --- |
| General web results on a topic | `search_google` |
| Recent news or coverage of an event | `google_news` |
| Products and prices across stores | `google_shopping` |
| Businesses or places in an area | `google_maps_search`, with the area in the query ("dentists in Denver CO") |
| Full details or reviews for one place | `google_maps_place` or `google_maps_reviews`, using the `place_id` from the search |
| A company's published emails, phones and social profiles | `company_enrich` with the company's website or a Maps `place_id` |
| What a specific page says | `extract_url` |
| Which pages a site has | `map_website`, then `extract_url` or `batch_extract` on the pages that matter |
| Many pages of one site | `crawl_website`, then `get_crawl_status` if it returns a job id |
| A list of known URLs | `batch_extract`, then `get_batch_status` if it returns a job id |
| How much of their Scavio balance is left | `get_usage` |

## Work in this order

1. Run the narrowest tool that answers the question. Do not call tools the question does not need.
2. For local businesses, search first, then use the returned `place_id` for details, reviews or contact details. Do not guess a `place_id`.
3. For a page that comes back empty because it builds its content with JavaScript, retry `extract_url` once with `mode: "advanced"`.
4. Start a crawl or batch only when the user wants many pages. If the job is still running, check it with the status tool rather than starting a new job. Cancel a job only when the user asks.

## Write the answer

- Answer from the returned data only. Do not invent results, prices, ratings, contact details or dates.
- Link the source page for every fact you state.
- When nothing matches, say so and suggest a narrower or different query.
- Report contact details only for the business the user asked about, as published by that business.
- If a tool returns an error, tell the user what failed in plain language. If the account has no credits left, say that the request could not run.
