---
name: jcpenney-data
description: Answer questions with live JCPenney data from Scavio. Use when the user asks about JCPenney: search jcpenney.com or browse any category, a brand, or the Clearance, Sale, Black Friday, Big Buy, Limited Time Special, Closeout and Buy 1 Get 1 deal lists, 48 products per page with the current and regular price range, price type, percent off, deal label.
---

# JCPenney data with Scavio

Use Scavio's JCPenney tools to answer with current public JCPenney data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_jcpenney` | Search jcpenney.com (US) by keyword, filtered by brand, color, size, price range, deal label (SALE, CLEARANCE...) and any facet value (gender, store availability, rating, rise...), sorted by relevance (default), new arrivals, best sellers, rating or price. |
| `get_jcpenney_product` | One jcpenney.com product by id or URL, or up to 20 by product_ids in one call: title, brand, description, features, category and breadcrumbs, product and item type, images, average rating, review_count, question and answer counts (review text and Q&A: get_jcpenney_reviews and get_jcpenney_questions), the price block (regular, sale and clearance min / max ranges, percent off, price type, deal label, the after-coupon price with its coupon code, and when the price window starts and ends), channel (Omnichannel / OnlineOnly), in-store pickup, marketplace flag, and every variant: sku, UPC, color, size, all options, status, max per order and online_stock (high, low or out; single product only, a level, not a count). |
| `get_jcpenney_category` | Browse one JCPenney category by its path or URL (Dresses, Sheets, Women's Boots...), with the same filters and sorts as search_jcpenney. |
| `get_jcpenney_brand` | Every JCPenney product of one brand by name (Nike, St. |
| `get_jcpenney_deals` | JCPenney deal listings across all products or one department: Clearance (default), Sale, Black Friday deals, Big Buy, Limited Time Special, Best Value, Gotta Have It, Closeout, Buy 1 Get 1, or any Deals & Promotions label, with the same filters and sorts as search_jcpenney. |
| `get_jcpenney_stores` | JCPenney stores near a US or Puerto Rico ZIP code, a city + state or a point (lat + lng), within 25 miles by default (up to 100), paged: store_id, name, address, city, state, ZIP, phone, lat / lng, distance in miles, weekly opening hours, timezone, services (Curbside Pickup, salon, portrait studio, JCPenney Beauty...), curbside and in-store pickup directions, bookable appointments (Sephora, salon) and the store page URL. |
| `get_jcpenney_store_availability` | Real unit counts for one JCPenney SKU at the 5 nearest stores to a US or Puerto Rico ZIP code (or lat + lng): per store quantity, status (in_stock, low, out_of_stock, not_stocked), when the count was refreshed (updated_at), and the store's address, phone, distance and hours. |
| `get_jcpenney_suggestions` | The jcpenney.com search-box suggestions for a partial query: keyword completions with their search URL and, where JCPenney offers them, department refinements (nike shoes women -> sneakers, running shoes...). |
| `get_jcpenney_coupons` | Today's public JCPenney coupons: code (null for in-store offers that need none), channel (online, in store or both), headline and details of each offer, start and end dates, the full disclaimer with its exclusions, and the URL of the eligible products. |
| `get_jcpenney_reviews` | Real customer review text of one jcpenney.com (US) product by id or URL, up to 98 per call (default 38), sorted most recent (default), most helpful, highest or lowest rating, or relevance, optionally only one star rating. |
| `get_jcpenney_questions` | Customer questions and every answer for one jcpenney.com (US) product by id or URL, up to 50 questions per call (default 10), newest answers first (JCPenney's order; there is no sort option). |

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
