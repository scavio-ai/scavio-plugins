---
name: foot-locker-data
description: Answer questions with live Foot Locker data from Scavio. Use when the user asks about Foot Locker: the Foot Locker release calendar for the US, Canada and the UK as monitoring data, filtered by upcoming or launched, dates and brand.
---

# Foot Locker data with Scavio

Use Scavio's Foot Locker tools to answer with current public Foot Locker data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_footlocker` | Search Foot Locker by keyword on any of 13 storefronts (us (footlocker.com, USD, default), ca (CAD, language en or fr), gb (GBP), de, fr, it, es, nl, be (language nl or fr), at, ie (EUR), au (AUD) or nz (NZD)), filtered by brand, gender, color, price bucket, on_sale and any facet (shoe size per gender, style, sport, rating...), sorted by relevance, price, new arrivals, top rated, name or brand. |
| `get_footlocker_product` | One Foot Locker product by SKU or URL on any of the 13 storefronts: title, brand, description, genders, sports, category, color, style code, images, rating, review_count, the price block (price, list_price, percent_off, lowest_price_30d on European storefronts), availability online / to ship / for pickup, launch info (is_launch, launch_type, launch_date, web_only), flags, the size chart, every colorway (sku, color, price, availability) and every size: available, ship, pickup, stores_available (how many stores show that size as available: a store count, not units), UPC and store SKU. |
| `get_footlocker_category` | Browse one Foot Locker category by its page path, URL or collection id (Men's Shoes, Women's Clothing, Kids...), in the site's order by default, with the same filters and sorts as search_footlocker. |
| `get_footlocker_brand` | Every Foot Locker product of one brand by name or brand page URL (Nike, Jordan, adidas, New Balance, HOKA...), optionally narrowed by a keyword, with the same filters and sorts as search_footlocker (except brand). |
| `get_footlocker_deals` | Foot Locker deal listings: sale (default; every storefront), Foot Locker Exclusives (us and ca only) or discount_eligible (the items a promo code applies to), with the same filters and sorts as search_footlocker. |
| `get_footlocker_releases` | The Foot Locker sneaker release calendar as monitoring data (us, ca, gb): sku, title, brand, colorway (style), style_code, gender, launch_at, online_at, heat_level, in_stock, image, url, retail_price and currency (us and ca; gb has no prices), the reservation status and windows where the storefront runs them (status open / closed / store_only, starts_at, ends_at, assignment_at, awarding_at, online_reveal_at, store procedures; not on gb) and sizes (us, eu, uk, participating channels). |
| `get_footlocker_stores` | Foot Locker stores near a US ZIP code, a city + state or a point (lat + lng), nearest first (up to 50, default 10, within 25 miles by default, up to 120): store_id, name, name_secondary, address, city, state, ZIP, phone, lat / lng, distance_miles, weekly hours, opened_at, alert and closure notices, and the store page URL. |
| `get_footlocker_store_availability` | Which Foot Locker stores near a US ZIP code or a point (lat + lng) show a product (or one size) as available: each store (as in get_footlocker_stores) with available and sizes_available, plus per size whether it ships online, can be picked up and in how many of the listed stores it shows (stores_in_results), and stores_with_availability. |
| `get_footlocker_reviews` | Customer reviews of one Foot Locker (US) product by SKU or URL, 1-98 per call (default 38), sorted most recent (default), most helpful, highest or lowest rating, or relevance, optionally only one star rating. |
| `get_footlocker_questions` | Shopper questions about one Foot Locker (US) product by SKU or URL, 1-50 per call (default 10), newest answered first, with every answer: question, details, author, submitted_at, answer_count, helpful votes, and per answer its text, author, author_type (brand, retailer or customer), best-answer flag, date and votes. |

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
