---
name: costco-data
description: Answer questions with live Costco data from Scavio. Use when the user asks about Costco: search and category listings with per-warehouse shelf price and stock, full item detail for up to 20 items, online vs in-warehouse prices at up to 10 warehouses with promotion dates, warehouse stock status, gas prices, the member coupon book, deal feeds, a clearance finder and reviews.
---

# Costco data with Scavio

Use Scavio's Costco tools to answer with current public Costco data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_costco` | Search Costco products by keyword or item number: online price, original price, rating, member-only and stock flags, promotions, facets. |
| `get_costco_category` | List products in a Costco category, same shape, filters and per-warehouse pricing as search_costco. |
| `get_costco_categories` | Get Costco departments, or the full subcategory tree under one department. |
| `get_costco_product` | Get full Costco product detail for up to 20 items: description, features, specs, variants, member-only flag, purchase limits, delivery fee, promotions with dates. |
| `get_costco_prices` | Compare Costco online vs in-warehouse price for up to 20 items at up to 10 warehouses: price, discount, final price, promotion start/end dates, per-order/per-member limits, price code. |
| `get_costco_availability` | Get in-warehouse stock status for one Costco item at up to 10 warehouses, plus pickup and same-day delivery availability. |
| `get_costco_reviews` | Get Costco product reviews with rating distribution and recommend count. |
| `get_costco_warehouses` | Find Costco warehouses near a US zip or coordinates: warehouse_id, address, hours, departments, services, gas station hours and prices. |
| `get_costco_gas_prices` | Get current regular, premium and diesel prices at Costco gas stations near a location or at specific warehouses. |
| `get_costco_coupons` | Get the current Costco member coupon book (US): offers with item number, amount off, final price, warehouse/online scope, limits, and the book's valid dates. |
| `get_costco_deals` | List Costco deal feeds: new, while_supplies_last, treasure_hunt, member_favorites, online_only, on_sale. |
| `get_costco_clearance` | Find Costco clearance and markdown items at one warehouse by scanning a query or category: .97 clearance and .00/.88 manager markdown by default, .49/.79/.89 special buy on request. |
| `get_costco_search_suggestions` | Get Costco search suggestions for a partial query, plus matching warehouse locations. |

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
