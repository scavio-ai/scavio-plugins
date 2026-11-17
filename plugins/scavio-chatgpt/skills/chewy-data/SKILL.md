---
name: chewy-data
description: Answer questions with live Chewy data from Scavio. Use when the user asks about Chewy: search chewy.com or browse a category, 36 products per page, with the one-time price, Autoship price and discount, first-Autoship price and savings cap, MAP price, rating and rating count, and read one product with the star distribution, review count, GTIN, specifications, ingredients.
---

# Chewy data with Scavio

Use Scavio's Chewy tools to answer with current public Chewy data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_chewy` | Search Chewy products by keyword, or browse a category, 36 per page. |
| `get_chewy_product` | One Chewy product by id or URL: one-time price, offer price, list and strike-through price with savings, MAP price and whether it is enforced, Autoship price and discount, first-Autoship price, discount and savings cap, per-unit price, in-stock flag, rating, rating count, review count and star distribution, brand, GTIN, description, key benefits, specifications, ingredients and feeding details where Chewy lists them, breadcrumbs, images, promotions, and every variant (size, flavor) with its own id, price, Autoship price and stock. |

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
