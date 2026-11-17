---
name: petco-data
description: Answer questions with live Petco data from Scavio. Use when the user asks about Petco: search petco.com or list any category with price, list price and Repeat Delivery autoship price, rating, review count and every size or flavor variation, read one product with each variant's UPC, first-autoship price, ingredients and guaranteed analysis, find Petco stores near a ZIP.
---

# Petco data with Scavio

Use Scavio's Petco tools to answer with current public Petco data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_petco` | Search Petco products. |
| `get_petco_category` | Products in a Petco category, e.g. |
| `get_petco_product` | One Petco product by part number or URL, with every variant (size, flavor): cat_entry_id, part number, SKU, UPC, price, list price, autoship (Repeat Delivery) price, first-autoship promo price, online quantity and status, fulfillment flags, ingredients, guaranteed analysis, directions, specifications, dimensions and images. |
| `get_petco_stores` | Petco stores nearest a US ZIP code (up to 10): store_id (what get_petco_store_inventory takes), store number, name, address, phone, coordinates, distance in miles, in-store pickup and opening hours per weekday. |
| `get_petco_store_inventory` | Units on hand at one Petco store for up to 10 products: qty_available, alert_level (GREEN, YELLOW, RED) and in_stock per cat_entry_id. |

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
