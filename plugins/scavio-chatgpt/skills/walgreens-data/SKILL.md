---
name: walgreens-data
description: Answer questions with live Walgreens data from Scavio. Use when the user asks about Walgreens: search walgreens.com retail products with regular and sale price, unit price, coupons, rewards and rebates, read one product with UPC, ingredients and offers, find Walgreens and Duane Reade stores near a ZIP, and get live unit counts of one product at up to 20 stores in one call.
---

# Walgreens data with Scavio

Use Scavio's Walgreens tools to answer with current public Walgreens data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_walgreens` | Search Walgreens retail products (no pharmacy), up to 70 per page. |
| `get_walgreens_product` | One Walgreens retail product: SKU, UPC, GTIN, name, brand, size, regular and sale price, savings, unit price, offers (rewards and rebates), description, ingredients, warnings, rating and review count, category path, images, ship and pickup availability, clearance flag. |
| `get_walgreens_stores` | Walgreens and Duane Reade stores near a US ZIP or coordinates, nearest first: store number, name, brand, address, phone, coordinates, distance in miles, opening and closing time, time zone and store page URL. |
| `get_walgreens_stock` | Live in-store stock of one Walgreens product at up to 20 stores in one call: per store the status (In Stock, Out of Stock, or Not Available when the store does not carry it), the unit count and in_stock. |

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
