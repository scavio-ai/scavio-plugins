---
name: wayfair-data
description: Answer questions with live Wayfair data from Scavio. Use when the user asks about Wayfair: keyword search and category listings with price, sale price, was price, price label, discount, per-item price for sets, loyalty savings, badge, rating, review count, stock text, open-box price and sponsored flag, sorted by price or customer rating and filtered by sale, closeout, open box.
---

# Wayfair data with Scavio

Use Scavio's Wayfair tools to answer with current public Wayfair data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_wayfair` | Search Wayfair products by keyword, sorted by price or customer rating and filtered by sale, closeout, open box, new arrivals, in stock, brand id, minimum rating, price range or any facet. |
| `get_wayfair_product` | One Wayfair product by SKU or product URL: sku, variant_id, name, brand (id, name, url), url, price, sale_price, was_price, price_label, percent_off, per_item_price, loyalty_savings, prices, badge, limited_time_deal (end date when Wayfair shows one), stock_status, max_quantity, part_number, options (category such as Color or Rug Size, total, the selected choice and every choice with name, option_id, stock_status and url; choices carry no price: call again with option_id for that option's price and stock, one call per option), dimensions, specifications, features, description, image, images, breadcrumbs, documents (manuals), collection, returns (returnable, cancelable), rating, review_count, rating_histogram (5 to 1), review_summary (text and the page's own label), review_aspects and reviews (the 5 reviews the page shows: id, rating, date, verified, badge, text, author, location, options, language; no review paging, sort or star filter). |
| `get_wayfair_category` | One Wayfair category's products (48 per page) by category id or category URL (send one), with the search sorts and filters: category (id, name, url, breadcrumbs) and items with position, sku, variant_id, name, brand (id, name), url, image, price, sale_price, was_price, price_label, discount_percent, per_item_price (sets), loyalty_savings, prices (every price line), badge (e.g. |
| `get_wayfair_deals` | The market's current Wayfair sale events (the Daily Sales list): events (event_id, slug, title, url, image) and count; about 38 on us, 34 on ca, 6 on gb and ie. |

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
