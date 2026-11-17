---
name: macys-data
description: Answer questions with live Macy's data from Scavio. Use when the user asks about Macy's: search macys.com or browse any category, brand page or sale section, 60 products per page with current, regular and sale price, percent off, sale end date, deal label, promotions, rating and colors, filtered by brand, color, special offer, any price range, store pickup or any facet.
---

# Macy's data with Scavio

Use Scavio's Macy's tools to answer with current public Macy's data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_macys` | Search macys.com (US) by keyword, filtered by brand, color, special offer (clearance, Last Act, Today Only, Black Friday deal...), any price range, a pickup store and any other facet, sorted by featured (default), price, top rated, best sellers or newest. |
| `get_macys_product` | One macys.com product by id or URL, or up to 10 by product_ids in one call: title, brand (with brand_page_id for get_macys_brand), type, description, bullets, category path, price, regular and sale price, percent off, on-sale flag, sale end, promotions, rating, review_count and text_review_count (ratings without text count in review_count only), rating_distribution, recommended count, fit slider, AI review summary, purchased message, question and answer counts, images, colors with their prices, sizes and every variant (UPC, color, size, available, availability message, low-stock flag, ship days). |
| `get_macys_reviews` | Customer reviews of one macys.com product by id or URL, newest (default), highest rated, lowest rated or with photos first, up to 100 per page, optionally only one star rating or only reviews mentioning a word: rating, title, text, date, nickname, location as the reviewer gave it, recommended, helpful yes / no votes, incentivized and syndicated flags (and the site it came from), badges, fit and other slider ratings, photo URLs and the brand's response. |
| `get_macys_category` | Browse one macys.com category by id or URL, with the same filters and sorts as search_macys. |
| `get_macys_brand` | Browse one brand's macys.com page by its page id or URL (a product's brand_page_id), with the same filters and sorts as search_macys. |
| `get_macys_deals` | Macy's sale listings: all Sales & Offers (default), Clearance, Today Only, Last Act (final-sale markdowns), Limited-Time Specials or Black Friday Deals, with the same filters and sorts as search_macys (except special_offer). |
| `get_macys_stores` | Macy's stores near a US ZIP code, a point (lat + lng) or a city + state, nearest first (up to 15, within 100 miles by default): store_id (what get_macys_store_availability and pickup_store_id take), name, address, phone, lat / lng, distance in miles, today's and tomorrow's hours, curbside hours and the order cut-off for same-day pickup. |
| `get_macys_store_availability` | Can a macys.com product be picked up in store? Near a ZIP, a point or a city + state: every store with available true / false and available_items_count (how many of the product's items it has). |
| `get_macys_suggestions` | The macys.com search-box autocomplete for a partial query: up to 7 suggested searches. |

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
