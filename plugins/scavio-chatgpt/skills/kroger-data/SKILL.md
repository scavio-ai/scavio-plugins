---
name: kroger-data
description: Answer questions with live Kroger data from Scavio. Use when the user asks about Kroger: product search and category listings with price, promo price, multi-buy, unit price, stock level, SNAP eligibility and star ratings, each priced at a store the site chooses and names.
---

# Kroger data with Scavio

Use Scavio's Kroger tools to answer with current public Kroger data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_kroger` | Search Kroger, QFC or Fred Meyer products by keyword (banner). |
| `get_kroger_product` | One Kroger, QFC or Fred Meyer product by product_url or upc: the search fields plus description, nutrition facts, ingredients, allergens, images, country of origin, dimensions, weight, dietary flags, the aisle at the store (store_location) and breadcrumbs. |
| `get_kroger_prices` | Price, promotion, stock and aisle for 1 to 25 UPCs at one Kroger, QFC or Fred Meyer store you choose (store_id from find_kroger_stores). |
| `find_kroger_stores` | Kroger, QFC or Fred Meyer stores near a ZIP or a city / address (nearest first), or one store by store_id. |
| `get_kroger_category` | A Kroger, QFC or Fred Meyer category listing by /pl/ URL or taxonomy_id (send one, not both): category (id, name, url) and banner, store, total (all matches, the site counts up to 1000), count and products with upc (for get_kroger_product and get_kroger_prices), name, brand, url, image, price, list_price, promo_price with promo_ends_at, price_display, unit_price_display, nfor / nfor_price (multi-buy), size, in_stock (null when the store has no stock record), stock_level, SNAP eligibility, dietary info, category and rating (average, count, star distribution; no review text). |
| `get_kroger_deals` | This week's weekly digital deals of Kroger, QFC or Fred Meyer: deals_week (id, ends_at: the promotion end most deal items share) and banner, store, total (all matches, the site counts up to 1000), count and products with upc (for get_kroger_product and get_kroger_prices), name, brand, url, image, price, list_price, promo_price with promo_ends_at, price_display, unit_price_display, nfor / nfor_price (multi-buy), size, in_stock (null when the store has no stock record), stock_level, SNAP eligibility, dietary info, category and rating (average, count, star distribution; no review text). |
| `get_kroger_coupons` | The digital coupons offered at one Kroger, QFC or Fred Meyer store (store_id, or the banner's store nearest a zip; send one, not both), 24 per page, optionally one department (category) or a text match (query). |
| `get_kroger_suggestions` | Kroger, QFC or Fred Meyer search box suggestions for a partial query: suggestions (text, type), count and the store they were asked for. |

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
