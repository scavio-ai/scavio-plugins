---
name: kohls-data
description: Answer questions with live Kohl's data from Scavio. Use when the user asks about Kohl's: search kohls.com or browse any catalog page, a brand, or the Clearance, Sale, Earn Kohl's Cash and Sephora at Kohl's lists, 120 products per page with current, regular and sale price, sale or clearance label, percent off, the price after a public coupon code with the code, BOGO promotions, rating.
---

# Kohl's data with Scavio

Use Scavio's Kohl's tools to answer with current public Kohl's data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_kohls` | Search kohls.com (US) by keyword, filtered by brand, color, size, on sale, clearance and any facet value (price buckets, gender, rating, store pickup...), sorted by featured (default), new arrivals, best sellers, price, highest rated or percent off. |
| `get_kohls_product` | One kohls.com product by id or URL: title, brand, status, dept (what get_kohls_store_availability can take), breadcrumbs, Sephora at Kohl's flag, average rating, review_count and recommended_percent (review text is not available), is_new / best_seller / top_rated, badges, description, details, ingredients (beauty), images, videos, return policy, the price block (regular, sale, sale_status, percent_off, lowest_applicable_price, price_suppressed with price_note for cart-only prices, with_code_price with its savings and offer codes), kohls_cash (earn and redeem windows, amount earned) when the product has it, the public offers that apply (code, description, terms, start and end dates), pickup / ship-to-store eligibility, online_units, and every variant: sku, UPC, color, size, availability, online_units, max_per_order, price, sale price, with-code price, Kohl's Cash earned and pickup eligibility. |
| `get_kohls_category` | Browse one Kohl's catalog listing by its path or URL (Small Appliances, Women's Clothing, Men's Shoes...), with the same filters and sorts as search_kohls. |
| `get_kohls_brand` | Browse one brand at Kohl's by name or URL (Nike, Hamilton Beach, Levi's...), with the same filters and sorts as search_kohls (except brand). |
| `get_kohls_deals` | Kohl's deal listings: Clearance (default), Sale, items that earn Kohl's Cash right now, or Sephora at Kohl's, with the same filters and sorts as search_kohls. |
| `get_kohls_stores` | Kohl's stores near a US ZIP code, a city + state or a point (lat + lng), within 25 miles by default (up to 100): store_id (what get_kohls_product store_id takes), name, address, city, state, ZIP, phone, lat / lng, distance in miles, weekly opening hours with the UTC offset, store badges (Sephora, Fine Jewelry, Lands' End...), services (In-Store Pickup, Amazon Returns...) and the store page URL. |
| `get_kohls_store_availability` | Pickup stock for one Kohl's SKU at every store within about 50 miles of a US ZIP code, with unit counts: per store pickup_units, stock_level (In Stock, Low Stock, Out of Stock), in_stock, ship_to_store_units with the ship-to-store pickup window, pickup and ship-to-store eligibility, clearance and Sephora flags, and the store's address, phone, distance and hours for the week. |
| `get_kohls_suggestions` | The kohls.com search-box suggestions for a partial query: keyword completions (type terms, default), or matching products with id, title, URL and image (type products). |
| `get_kohls_coupons` | Today's public Kohl's coupon codes: code, description (the offer, minimum purchase and exclusions as stated), end date, whether it needs a Kohl's Card (requires_kohls_card), the terms page URL and the URL of the eligible products. |

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
