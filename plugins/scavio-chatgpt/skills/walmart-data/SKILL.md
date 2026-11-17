---
name: walmart-data
description: Answer questions with live Walmart data from Scavio. Use when the user asks about Walmart product search, categories, product details, reviews, sellers and stores.
---

# Walmart data with Scavio

Use Scavio's Walmart tools to answer with current public Walmart data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_walmart` | Search Walmart products. |
| `get_walmart_product` | Get full Walmart product detail. |
| `get_walmart_stores` | Find Walmart stores near a US ZIP (walmart.com) or Canadian postal code (domain 'ca'), nearest first: store_id, name, distance_miles, address, coordinates, hours. |
| `get_walmart_reviews` | Get Walmart product reviews. |
| `get_walmart_category` | Browse Walmart category products (no query). |
| `get_walmart_offers` | Get the buy-box offer for a Walmart product. |
| `get_walmart_seller` | Get a Walmart seller's storefront. |
| `get_walmart_seller_products` | List a Walmart seller's products. |

## Work in this order

1. Run the narrowest tool that answers the question. Do not call tools the question does not need.
2. Search first when the user gives a name or keyword, then pass the id the search returns to the detail tool. Do not guess ids.
3. Seller tools need the numeric seller_catalog_id from get_walmart_product. For one store's stock, get a store_id from get_walmart_stores.
4. Page through more results only when the user asks for more than the first page returns.

## Write the answer

- Answer from the returned data only. Do not invent products, prices, ratings or stock.
- Link the Walmart page for each item you mention when the data includes it.
- Prices, counts and availability change; say they are current as of the request.
- When nothing matches, say so and suggest a different query.
- If a tool returns an error, tell the user what failed in plain language. If the account has no credits left, say that the request could not run.
