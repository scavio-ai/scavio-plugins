---
name: ulta-beauty-data
description: Answer questions with live Ulta Beauty data from Scavio. Use when the user asks about Ulta Beauty: search ulta.com or list a category with list and sale price, discount, promo text, rating and review count, read one product with every shade or size, GTIN, ingredients and the five latest reviews, and check whether one shade is in stock for pickup at the 10 Ulta stores nearest a ZIP.
---

# Ulta Beauty data with Scavio

Use Scavio's Ulta Beauty tools to answer with current public Ulta Beauty data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_ulta` | Search Ulta Beauty products by keyword, 64 per page plus sponsored placements. |
| `get_ulta_category` | Products in an Ulta Beauty category, 64 per page plus sponsored placements, with the category title and total_results. |
| `get_ulta_product` | One Ulta Beauty product by page URL, for the selected shade or size: list and sale price, discount, availability, GTIN, rating, review count, badges, summary, description, usage, ingredients, restrictions, category and breadcrumbs, images, every shade or size variant (sku_id, name, shade description, available, swatch), ship / pickup / same-day eligibility, and the five most recent customer reviews. |
| `get_ulta_stores` | In-store pickup availability of one Ulta Beauty shade or size at the 10 stores nearest a US ZIP: store id, name, address, distance in miles, open now and hours label, curbside label, in_stock and the availability label. |

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
