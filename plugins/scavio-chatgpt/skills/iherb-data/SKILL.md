---
name: iherb-data
description: Answer questions with live iHerb data from Scavio. Use when the user asks about iHerb: search iherb.com by keyword or brand with price, list price, discount, rating, review count, stock and recent sales, read one product with UPC, price per serving, supplement facts, ingredients, variants and best-seller rankings, check price and stock for up to 50 products in one call.
---

# iHerb data with Scavio

Use Scavio's iHerb tools to answer with current public iHerb data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_iherb` | Search iHerb (US store, USD) by keyword, 48 products per page. |
| `get_iherb_product` | One iHerb product by id or URL (US store, USD): name, brand, part number, UPC, price, list price, discount, price per serving or unit, stock status, discontinued and coming-soon flags, quantity limit, expiration date, first-available date, package quantity, weight and dimensions, rating and review count, category breadcrumbs, best-seller rankings by category, badges, variants (size, potency, flavor) with their product ids and prices, supplement facts (serving size, servings per container, nutrients with amount and % daily value), description, suggested use, ingredients, warnings and images. |
| `get_iherb_prices` | Current price, list price, discount, in-stock flag, rating and review count for up to 50 iHerb products in one call (US store, USD). |
| `get_iherb_reviews` | The review summary for one iHerb product: average rating, total review count, star histogram (count and percent per star), review counts per language, and the full text of the top positive and top critical review with rating, title, author, country, date, verified-purchase flag, helpful votes and images. |

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
