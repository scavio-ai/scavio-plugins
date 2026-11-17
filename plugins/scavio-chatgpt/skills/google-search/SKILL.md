---
name: google-search
description: Answer questions with live Google Search data from Scavio. Use when the user asks about Google Search: organic results, ads, knowledge graph, AI Overview, People Also Ask, related searches, top stories and videos.
---

# Google Search data with Scavio

Use Scavio's Google Search tools to answer with current public Google Search data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_google` | Search Google and return the results page as structured data: organic results with title, link and snippet, the AI Overview, related questions, videos and local results. |
| `google_ai_mode` | Google AI Mode: synthesized answer with cited sources. |

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
