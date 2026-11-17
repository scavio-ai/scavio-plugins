---
name: home-depot-data
description: Answer questions with live Home Depot data from Scavio. Use when the user asks about Home Depot: keyword search returning price, promotions, brand, model, ratings and per-store pickup and delivery.
---

# Home Depot data with Scavio

Use Scavio's Home Depot tools to answer with current public Home Depot data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_home_depot` | Search Home Depot products. |
| `get_home_depot_product` | Get full Home Depot product detail. |
| `get_home_depot_reviews` | Get Home Depot product reviews. |

## Work in this order

1. Run the narrowest tool that answers the question. Do not call tools the question does not need.
2. Search first when the user gives a name or keyword, then pass the id the search returns to the detail tool. Do not guess ids.
3. Page through more results only when the user asks for more than the first page returns.

## Write the answer

- Answer from the returned data only. Do not invent products, prices, ratings, stock or store details.
- Link the source page for each item you mention when the data includes it.
- Prices, counts and availability change; say they are current as of the request.
- When nothing matches, say so and suggest a different query.
- If a tool returns an error, tell the user what failed in plain language. If the account has no credits left, say that the request could not run.
