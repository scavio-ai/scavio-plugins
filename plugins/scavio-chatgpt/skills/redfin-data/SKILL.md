---
name: redfin-data
description: Answer questions with live Redfin data from Scavio. Use when the user asks about Redfin listings, property details with estimates, history and schools, and housing market stats.
---

# Redfin data with Scavio

Use Scavio's Redfin tools to answer with current public Redfin data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_redfin` | Search Redfin US real estate listings. |
| `get_redfin_property` | Full Redfin property detail: estimates, MLS facts, history, schools, comps. |
| `get_redfin_market` | Redfin housing-market stats for a US region: prices, inventory, compete score. |

## Work in this order

1. Run the narrowest tool that answers the question. Do not call tools the question does not need.
2. Search first when the user gives a name or keyword, then pass the id the search returns to the detail tool. Do not guess ids.
3. Redfin search and market tools do not accept city names; use a ZIP or a Redfin region.
4. Page through more results only when the user asks for more than the first page returns.

## Write the answer

- Answer from the returned data only. Do not invent listings, prices, estimates or dates.
- Link the Redfin page for each item you mention when the data includes it.
- Prices, counts and availability change; say they are current as of the request.
- When nothing matches, say so and suggest a different query.
- If a tool returns an error, tell the user what failed in plain language. If the account has no credits left, say that the request could not run.
