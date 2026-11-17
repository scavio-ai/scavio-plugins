---
name: zillow-data
description: Answer questions with live Zillow data from Scavio. Use when the user asks about Zillow homes for sale, for rent and sold, listing details and agent reviews.
---

# Zillow data with Scavio

Use Scavio's Zillow tools to answer with current public Zillow data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_zillow` | Search Zillow US real-estate listings. |
| `get_zillow_property` | Get full Zillow listing details. |
| `get_zillow_agent_reviews` | Get a Zillow real-estate agent's profile and reviews (max 5 returned). |

## Work in this order

1. Run the narrowest tool that answers the question. Do not call tools the question does not need.
2. Search first when the user gives a name or keyword, then pass the id the search returns to the detail tool. Do not guess ids.
3. When filtering or sorting, search by city name rather than a bare ZIP. For rentals, prices are monthly rent.
4. Page through more results only when the user asks for more than the first page returns.

## Write the answer

- Answer from the returned data only. Do not invent listings, prices, estimates or dates.
- Link the Zillow page for each item you mention when the data includes it.
- Prices, counts and availability change; say they are current as of the request.
- When nothing matches, say so and suggest a different query.
- If a tool returns an error, tell the user what failed in plain language. If the account has no credits left, say that the request could not run.
