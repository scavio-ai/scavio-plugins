---
name: saks-fifth-avenue-data
description: Answer questions with live Saks Fifth Avenue data from Scavio. Use when the user asks about Saks Fifth Avenue: search saksfifthavenue.com, browse any category, a designer's page or the Sale, Women's Clothing Sale, Men's Sale and New Arrivals lists, 24 grid positions per page with price, regular and sale price, percent off, badge, final-sale, clearance and returnable flags, promotions and colors.
---

# Saks Fifth Avenue data with Scavio

Use Scavio's Saks Fifth Avenue tools to answer with current public Saks Fifth Avenue data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_saks` | Search saksfifthavenue.com (US) by keyword, filtered by designer, color, size (the facet label, e.g. |
| `get_saks_product` | One saksfifthavenue.com product by id or URL: title, brand, type (master or variant), UPC (for a variant), price, price_max, regular and sale price, percent off, on-sale flag, is_new / is_sale / is_clearance / is_final_sale, badge, returnable, promotions, description, style code, images, colors and sizes (each with availability IN_STOCK / NOT_AVAILABLE, selectable and waitlist), every SKU in variants[] with its online warehouse unit count, in-stock and available counts, availability (units available to sell, message such as Limited Inventory, in_stock_date), available_in_store, marketplace, drop_ship, preorder, merchandising attributes (category, gender, material, length...), the average star rating and review_count. |
| `get_saks_category` | Browse one Saks category by its /c/ path or URL (women's dresses, men's sweaters, beauty...), with the same filters and sorts as search_saks. |
| `get_saks_brand` | Browse one designer's Saks page by slug (from get_saks_designers) or URL, with the same filters and sorts as search_saks (except brand). |
| `get_saks_deals` | Saks sale and new-arrival listings: all Sale (default), Women's Clothing Sale, Men's Sale, Women's New Arrivals or Men's New Arrivals, with the same filters and sorts as search_saks. |
| `get_saks_stores` | Saks Fifth Avenue stores near a US ZIP code or a point (lat + lng), within 15 / 30 / 50 / 100 / 300 miles (default 50): store_id, name, address, city, state, ZIP, lat / lng, distance in miles (pickup stores), today's opening and closing times, hours as listed, closed flag, and pickup (true for stores that offer in-store pickup; other Saks locations are listed with pickup false). |
| `get_saks_store_availability` | Can one Saks variant (sku) be picked up near a US ZIP code or a point? For each pickup store: the site's availability message (In Stock, Limited Inventory, Not Available), in_stock, limited, units_at_store when the site gives a count (it does for stores that have the item; otherwise null), and the store's address, distance and today's hours. |
| `get_saks_suggestions` | The saksfifthavenue.com search-box suggestions for a partial query: the result count, matching designers, suggested categories (name, parent, path for get_saks_category), up to 5 featured products (id, title, brand, URL, image) and the site's popular searches. |
| `get_saks_designers` | The Saks A-Z designer index (about 1,200 designers): name, slug (what get_saks_brand takes), URL and letter, optionally only one letter. |

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
