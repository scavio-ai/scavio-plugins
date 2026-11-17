---
name: specs-data
description: Answer questions with live Spec's data from Scavio. Use when the user asks about Spec's: search Spec's Wines, Spirits & Finer Foods in Texas, get a product's price and stock at every Spec's store in one call, and list stores by region.
---

# Spec's data with Scavio

Use Scavio's Spec's tools to answer with current public Spec's data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_specs` | Search Spec's Wines, Spirits & Finer Foods (Texas liquor chain). |
| `get_specs_product` | One Spec's product with every store's price and stock in store_prices (about 200 Texas stores in one call), the online price, and details: brand, size, proof, ABV, type, origin, region, vintage, tasting notes, images. |
| `get_specs_stores` | List Spec's stores in a Texas region: store_id, name, status, address, city, zip, phone, coordinates and opening hours per day. |

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
