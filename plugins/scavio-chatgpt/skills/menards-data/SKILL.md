---
name: menards-data
description: Answer questions with live Menards data from Scavio. Use when the user asks about Menards: search menards.com at the store you choose with each result's price, sale price, the 11% mail-in rebate, final price after rebate and that store's stock count, read one product by item id or URL with the full price ladder, specifications and that store's stock and aisle.
---

# Menards data with Scavio

Use Scavio's Menards tools to answer with current public Menards data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_menards` | Search menards.com at one store, 40 products a page. |
| `get_menards_product` | One Menards product by item id or URL (find item ids with search_menards): name, brand, model number, SKU, description, bullets, specifications, images, videos and documents, with the full price ladder: everyday price, sale price and its end date, mail-in rebates (text such as "11% REBATE*", amount, dates), final_price after rebates and the you-save amount. |
| `get_menards_stores` | Menards stores near a US ZIP code or a city and state, nearest first: store number (store_id), name, address, coordinates, distance in miles and services (garden center, grocery, rental center, propane and more). |

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
