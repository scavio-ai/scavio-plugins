---
name: cvs-data
description: Answer questions with live CVS data from Scavio. Use when the user asks about CVS: search cvs.com front-store products with regular and sale price, ExtraBucks rewards and manufacturer coupons, and units in store, for pickup and for same-day delivery at the store you choose, read one product with UPC, ingredients and warnings, and check stock for up to 20 SKUs at one store.
---

# CVS data with Scavio

Use Scavio's CVS tools to answer with current public CVS data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_cvs` | Search CVS front-store products (no pharmacy). |
| `get_cvs_product` | One CVS product by URL or id: regular and sale price, unit price, promotion and its end date, rating, review count, UPC, size, description, highlights, ingredients, directions, warnings, attributes, breadcrumbs, images and every variant (sku_id, UPC, size, price, rating). |
| `get_cvs_stock` | Units available at one CVS store for up to 20 SKUs in one call: in_store (on the shelf), pickup (order online, pick up there) and ship (online stock, chain-wide). |

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
