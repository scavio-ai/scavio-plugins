---
name: sephora-data
description: Answer questions with live Sephora data from Scavio. Use when the user asks about Sephora: search sephora.com and list any category with price, list and sale price, rating, review count and bestseller, new and exclusive flags, then read one product with every shade or size, stock per shade, ingredients, and Sephora's review summary with pro and con sentiment counts.
---

# Sephora data with Scavio

Use Scavio's Sephora tools to answer with current public Sephora data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_sephora` | Search sephora.com (US) products, 60 per page. |
| `get_sephora_category` | Products in a sephora.com (US) category, 60 per page, same fields as search_sephora, plus the category's id, name and URL, total product count, parent category, subcategories with product counts and breadcrumbs. |
| `get_sephora_product` | One sephora.com (US) product: name, brand, rating, review count, loves count, price range, description, suggested usage, category and breadcrumbs, a summary of what reviews say with pro and con sentiment counts (no review text), and every shade or size as a sku with sku_id, shade, size, price, list and sale price, in_stock, only_few_left, ingredients, images, swatch, and pickup and same-day eligibility. |

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
