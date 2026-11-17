---
name: aldi-data
description: Answer questions with live ALDI data from Scavio. Use when the user asks about ALDI: search ALDI US at the store you choose with that store's price, sale price, unit price, stock level and in-store location, priced for in-store, pickup or delivery, read one product with ingredients, allergens and dietary labels, and find ALDI stores near a ZIP.
---

# ALDI data with Scavio

Use Scavio's ALDI tools to answer with current public ALDI data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_aldi` | Search ALDI US products at one store (store_id, or the nearest store to a zip). |
| `get_aldi_product` | One ALDI US product at one store (store_id, or the nearest store to a zip): price and was_price in dollars for that store and service_type (in-store shelf price by default), unit price, stock, category, brand, size, description, ingredients, allergen warnings, dietary labels and images. |
| `get_aldi_stores` | ALDI US stores near a ZIP, nearest first: store_id (use it with search_aldi and get_aldi_product), name, street address, city, state, ZIP, coordinates and distance in miles. |

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
