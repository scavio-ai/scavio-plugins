---
name: lowes-data
description: Answer questions with live Lowe's data from Scavio. Use when the user asks about Lowe's: search Lowe's by keyword or category at the store you choose with that store's price, was-price, sale end date and stock, item detail with on-hand quantity, aisle and bay and stock at nearby stores, a store locator by ZIP, and paged customer reviews with the star breakdown.
---

# Lowe's data with Scavio

Use Scavio's Lowe's tools to answer with current public Lowe's data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_lowes` | Search Lowe's by keyword or category at one store. |
| `get_lowes_product` | One Lowe's item at one store: price, was-price and savings, on-hand stock with lead time per fulfillment method, stock at nearby stores, aisle and bay, grouped specifications, bullets, UPC, dimensions, weight, rating, images, and the store's address and hours. |
| `get_lowes_stores` | Find Lowe's stores near a US ZIP, nearest first: store_id, name, address, phone, coordinates, distance, time zone, opening hours and features. |
| `get_lowes_reviews` | Customer reviews for a Lowe's item, 10 per page: rating, title, text, date, reviewer, recommended, helpful votes, verified and incentivized flags, photos and brand replies, plus the average rating, total and count per star. |

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
