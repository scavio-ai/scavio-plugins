---
name: heb-data
description: Answer questions with live HEB data from Scavio. Use when the user asks about HEB: product search with price, unit price, rating and availability, full item detail with nutrition facts and ingredients, and store locator for HEB and Central Market locations.
---

# HEB data with Scavio

Use Scavio's HEB tools to answer with current public HEB data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_heb` | Search HEB grocery products by keyword. |
| `get_heb_product` | Full HEB product detail: nutrition facts (serving size, calories, nutrients with daily values), ingredients, description, images, similar products, coupons, EBT/SNAP eligibility, breadcrumbs, aisle location. |
| `get_heb_stores` | Find HEB stores near a US ZIP code or city (US only; HEB Mexico stores are not covered). |

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
