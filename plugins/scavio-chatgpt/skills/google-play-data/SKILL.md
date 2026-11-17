---
name: google-play-data
description: Answer questions with live Google Play data from Scavio. Use when the user asks about Google Play: search Android apps by keyword, pull a full listing with the real install count, rating histogram, permissions, Data safety table, changelog and 20 reviews, and cursor-page reviews by newest, relevance or rating.
---

# Google Play data with Scavio

Use Scavio's Google Play tools to answer with current public Google Play data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_google_play` | Search Google Play (Android apps, NOT web search). |
| `get_google_play_app` | Get full Google Play app listing. |
| `get_google_play_reviews` | Get Google Play reviews. |

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
