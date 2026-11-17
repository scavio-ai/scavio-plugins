---
name: best-buy-data
description: Answer questions with live Best Buy data from Scavio. Use when the user asks about Best Buy product search, categories, deals, product details, reviews, prices, stores and pickup availability.
---

# Best Buy data with Scavio

Use Scavio's Best Buy tools to answer with current public Best Buy data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_bestbuy` | Search bestbuy.com (US) products, 18 organic products per page, sorted by best match (default), best selling, best discount, price, rating or newest, filtered by brand, on sale, clearance, open box or a price range. |
| `get_bestbuy_product` | One bestbuy.com (US) product by SKU or URL: name, brand, model, UPC, URL, status, condition, product type, category path, price, regular price, savings, on-sale flag, deal badge, financing offer, every open-box offer by condition (fair, good, excellent) with its price, savings against new (savings_vs_new) and against the regular price (savings_vs_regular), other sellers' and conditions' SKUs of the same product, rating, review count, the AI review summary and what customers love, description, feature list, what's included, the full specification table by group, dimensions, full-size images, manuals and badges. |
| `get_bestbuy_reviews` | Customer reviews of one bestbuy.com (US) product by SKU or URL, 20 per page, sorted most relevant (default), most helpful, newest, oldest, highest or lowest rated, optionally only one star rating. |
| `get_bestbuy_category` | Browse a bestbuy.com (US) category or deals page by category id or URL, 18 products per page, sorted by best selling (the default on most pages), best discount, price, rating or newest, with the same filters as search_bestbuy. |
| `get_bestbuy_deals` | Today's Best Buy Deal of the Day and the more-deals row under it, with live prices: SKU, name, URL, image, rating, review count, price, regular price, savings in dollars and percent, on-sale flag and deal badge, plus the countdown end as the page shows it. |
| `get_bestbuy_stores` | Best Buy stores near a US ZIP code, nearest first (up to 15): store id, name, address, city, state, ZIP, phone, open status, store type, distance in miles, and dated opening hours for the next 35 days (holiday hours and closed days included). |
| `get_bestbuy_availability` | Store pickup availability of one bestbuy.com SKU at up to 8 stores: the stores nearest a ZIP code (max_stores, default 5) or the store ids you pass. |
| `get_bestbuy_suggestions` | The bestbuy.com search-box autocomplete for a partial query (e.g. |
| `get_bestbuy_prices` | Current bestbuy.com prices for up to 15 SKUs in one call: price, regular price, savings in dollars and percent, on-sale flag, deal badge and deal end time per SKU. |

## Work in this order

1. Run the narrowest tool that answers the question. Do not call tools the question does not need.
2. Search first when the user gives a name or keyword, then pass the id the search returns to the detail tool. Do not guess ids.
3. Products are identified by SKU. get_bestbuy_prices checks up to 15 SKUs at once.
4. Page through more results only when the user asks for more than the first page returns.

## Write the answer

- Answer from the returned data only. Do not invent products, prices, ratings or stock.
- Link the Best Buy page for each item you mention when the data includes it.
- Prices, counts and availability change; say they are current as of the request.
- When nothing matches, say so and suggest a different query.
- If a tool returns an error, tell the user what failed in plain language. If the account has no credits left, say that the request could not run.
