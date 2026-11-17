---
name: micro-center-data
description: Answer questions with live Micro Center data from Scavio. Use when the user asks about Micro Center: search Micro Center by keyword or category at the store you choose with price and that store's stock count and open-box units, read one product with specs, UPC, recent reviews, the store's open-box units with condition and price and which stores have it, and list every store id.
---

# Micro Center data with Scavio

Use Scavio's Micro Center tools to answer with current public Micro Center data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_micro_center` | Search Micro Center by keyword or category at one store, up to 96 per page. |
| `get_micro_center_product` | One Micro Center product: SKU, MPN, UPC, name, brand, description, price, original price, availability, ship and pickup flags, images, rating, review count, up to 10 recent reviews, breadcrumbs with category ids and the full spec table. |
| `get_micro_center_stores` | Every Micro Center store with its 3-digit store_id (what search_micro_center and get_micro_center_product take), name, city, state and store page URL; street address and ZIP where known. |

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
