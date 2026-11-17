---
name: fanatics-data
description: Answer questions with live Fanatics data from Scavio. Use when the user asks about Fanatics: search fanatics.com, 7 international Fanatics storefronts in local language and currency, or the US league stores, browse a team, player, league section, department, brand or collection, or list the Sale, Clearance and Under-25 deals, up to 72 products per page with current, regular, sale.
---

# Fanatics data with Scavio

Use Scavio's Fanatics tools to answer with current public Fanatics data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_fanatics` | Search Fanatics merchandise (jerseys, hats, fan gear, collectibles; product data, not odds or betting) by keyword on 8 storefronts and 4 US league stores. |
| `get_fanatics_product` | One Fanatics product by id or URL: title, brand, league, team, player, gender, categories, breadcrumb, description, details, images, the price block (price, regular_price, sale_price, clearance_price, with_code_price, code_percent_off, percent_off, price_label), on_sale (true for sale and clearance markdowns), the site's current promo code (code, percent_off, tiered, ends_on, applies_to_product), in_stock, every size (item_id, available, stock_level low / out, price, with_code_price, ship_by, estimated delivery window, promise_ship_days), every colorway, personalization (name / number fields with their rules and the team roster; the price already includes personalization), flags (jersey_assurance, non_returnable, exclusive, authentic for autographed / authenticated items), the rating (average, count, distribution, fit, value, quality), review_count and data_as_of. |
| `browse_fanatics` | Browse a Fanatics listing by its URL or by ids: a team (Lakers 5,000+ products), a player (Mahomes), a league section (NFL hats), a department, a brand ('47, Nike, New Era) or a collection, with price_band, on_sale, gender and any facet as filters (sizes, color style, autographed). |
| `get_fanatics_deals` | Fanatics deal listings: sale (default: the site's Sale listing, coupon-eligible items and clearance markdowns), clearance (each sale page's clearance-priced items; total counts the whole sale listing) or under_25 (items under 25 in the storefront's currency, by the site's lowest price; not on jp), optionally for one league, team, department or brand. |
| `get_fanatics_reviews` | Customer reviews of one Fanatics (fanatics.com, US) product by id or URL, 1-50 per call (default 10), sorted highest rated (default, the site's order), lowest rated, most recent or most helpful, optionally only one star rating. |

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
