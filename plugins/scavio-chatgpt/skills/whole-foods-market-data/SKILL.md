---
name: whole-foods-market-data
description: Answer questions with live Whole Foods Market data from Scavio. Use when the user asks about Whole Foods Market: search and browse Whole Foods Market at the store you choose with that store's shelf price, sale price and Prime member price with sale dates, list every product on sale at a store, read one product with ingredients, nutrition facts, diets and its in-store and online prices side by side.
---

# Whole Foods Market data with Scavio

Use Scavio's Whole Foods Market tools to answer with current public Whole Foods Market data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_whole_foods` | Search Whole Foods Market products at one store, up to 60 per page. |
| `get_whole_foods_category` | Browse one Whole Foods Market category at one store, with sort and filters, up to 60 per page. |
| `get_whole_foods_deals` | Every product on sale at one Whole Foods Market store, store-wide or in one category, up to 60 per page. |
| `get_whole_foods_product` | One Whole Foods Market product by ASIN, URL or slug: name, brand, description, highlights, ingredients, nutrition facts, diets, SNAP EBT eligibility and images. |
| `get_whole_foods_stores` | Whole Foods Market stores near a US ZIP code, nearest first, within 15 miles widening to 50: store_id, name, address, phone, coordinates, distance in miles, time zone, and seven days of in-store and pickup hours (UTC times). |
| `get_whole_foods_store` | One Whole Foods Market store by id: name, status, phone, Prime eligibility, opening date, address, coordinates, time zone and its store page and sales flyer URLs. |
| `get_whole_foods_sales_flyer` | The current weekly sales flyer of one Whole Foods Market store: each promotion's product name, brand, headline, description, terms, regular, sale and Prime price as printed in the flyer (text such as "$3.99/lb" or "44% off"), start and end dates, image, rank and the ASINs it covers. |

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
