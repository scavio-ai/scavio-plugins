---
name: dicks-sporting-goods-data
description: Answer questions with live Dick's Sporting Goods data from Scavio. Use when the user asks about Dick's Sporting Goods: search dickssportinggoods.com or browse any category, a brand, or the Clearance, Sale and This Week's Deals lists, 48 products per page by default with the current and list price range, percent off, rating, review count, badge, colors.
---

# Dick's Sporting Goods data with Scavio

Use Scavio's Dick's Sporting Goods tools to answer with current public Dick's Sporting Goods data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_dicks` | Search dickssportinggoods.com (Dick's Sporting Goods, US) by keyword, filtered by brand, an approximate price range and any facet (gender, size, color, rating, sale...), sorted by relevance, top sellers, savings, price, featured, new arrivals or brand A-Z. |
| `get_dicks_product` | One Dick's Sporting Goods product by id or URL with every SKU: title, brand, description, features, specs, attributes, product type, category, images, rating, review_count, question and answer counts, the price block (min, max, list_min, list_max, percent_off, map_price_applies), clearance flag, the option axes (color, size, width...) and every variant: sku, UPC, options, color, size, price, list_price, percent_off, map_price_applies (the price only shows in the cart), is_clearance, online_units (units available to ship), buyable, ship_class and lead_time. |
| `get_dicks_products` | Up to 5 Dick's Sporting Goods products in one call: the fast, cheap style-level check of title, brand, URL, image, price and list-price ranges, percent_off, map_price_applies, clearance, buyable, option axes, attributes, specs, product type, rating, review_count and description. |
| `get_dicks_reviews` | The 15 newest customer reviews of one Dick's Sporting Goods product by id or URL, with its review statistics: total, average, distribution (1-5 stars), recommended and not-recommended counts, photo count, first and last review dates, question and answer counts, and the average of each secondary rating (fit, comfort, quality, value...). |
| `get_dicks_category` | Browse one Dick's Sporting Goods category by its page path, URL or id (Men's Running Shoes, Golf Drivers, Kayaks...), in the site's featured order by default, with the same filters and sorts as search_dicks. |
| `get_dicks_brand` | Every Dick's Sporting Goods product of one brand by name (Nike, YETI, Callaway, Under Armour...), optionally narrowed by a keyword, with the same filters and sorts as search_dicks (except brand). |
| `get_dicks_deals` | Dick's Sporting Goods deal listings: Clearance (default), Sale or This Week's Deals, in the site's featured order by default (sort savings for the biggest discounts first), with the same filters and sorts as search_dicks. |
| `get_dicks_store_availability` | Store unit counts for 1-20 Dick's Sporting Goods SKUs at up to 100 stores near a US ZIP code or a point (lat + lng), nearest first, within 25 miles by default (up to 250). |
| `get_dicks_suggestions` | The dickssportinggoods.com search-box suggestions for a partial query: keyword completions, brands, categories (id, name, path, URL, product_count) and products (id, title, brand, URL, image, color, price and list-price ranges, percent_off). |

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
