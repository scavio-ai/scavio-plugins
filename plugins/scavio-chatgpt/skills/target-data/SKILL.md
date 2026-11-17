---
name: target-data
description: Answer questions with live Target data from Scavio. Use when the user asks about Target: keyword search, category browsing, product detail by TCIN with price, rating, images, specifications, variants and fulfillment, reviews with the star breakdown and per-attribute averages, and in-store stock at every Target near a ZIP with units available and pickup status.
---

# Target data with Scavio

Use Scavio's Target tools to answer with current public Target data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_target_products` | Search Target.com products. |
| `get_target_category` | List Target.com products in a category. |
| `get_target_product` | Get full Target.com product detail by TCIN. |
| `get_target_reviews` | Get Target.com product reviews. |
| `get_target_availability` | Target.com, the US retailer: in-store stock for one product at every Target store near a ZIP - units, in-store/pickup/curbside/ship-to-store status, distance, address, hours. |

## Work in this order

1. Run the narrowest tool that answers the question. Do not call tools the question does not need.
2. Search first when the user gives a name or keyword, then pass the id the search returns to the detail tool. Do not guess ids.
3. Products are identified by TCIN. Target calls can take 10 to 40 seconds.
4. Page through more results only when the user asks for more than the first page returns.

## Write the answer

- Answer from the returned data only. Do not invent products, prices, ratings, stock or store details.
- Link the source page for each item you mention when the data includes it.
- Prices, counts and availability change; say they are current as of the request.
- When nothing matches, say so and suggest a different query.
- If a tool returns an error, tell the user what failed in plain language. If the account has no credits left, say that the request could not run.
