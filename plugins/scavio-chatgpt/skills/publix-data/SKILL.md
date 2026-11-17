---
name: publix-data
description: Answer questions with live Publix data from Scavio. Use when the user asks about Publix: the weekly ad with its start and end dates, deal type, sale price, multi-buy bundle, save-up-to text and coupon stacking, filtered by department, BOGO only or text.
---

# Publix data with Scavio

Use Scavio's Publix tools to answer with current public Publix data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_publix` | Search Publix products at one store by keyword: sort by name, popularity, savings or views; filter to items on sale. |
| `get_publix_product` | One Publix product by item code at one store: the product card (item_code (for get_publix_product), base_product_id, title, brand, size, description, image, url, category_path, aisle (where it sits in that store), on_sale, price, price_unit, bundle, starting_price, regular_price, price_text, regular_price_text, promo (type single, bogo or multi; message, conditions, savings, valid_from, valid_through), has_coupon and is_order_ahead; order-ahead items also short_description, lead_time, serves, calories) and its nutrition facts (labels with serving size, servings per container and every nutrient with amount, unit and percent daily value; a deli sub has one label per component and size; null when Publix has none). |
| `get_publix_category` | One Publix category's products at one store, by category_url or category_id (send one), with the search sorts and filters: category (id, name, path), store and items with item_code (for get_publix_product), base_product_id, title, brand, size, description, image, url, category_path, aisle (where it sits in that store), on_sale, price, price_unit, bundle, starting_price, regular_price, price_text, regular_price_text, promo (type single, bogo or multi; message, conditions, savings, valid_from, valid_through), has_coupon and is_order_ahead. |
| `get_publix_categories` | The Publix product category tree: departments (Bakery, Dairy, Meat, Produce ...) with their categories and sub-categories, each with id (for get_publix_category), name, url, parent_id, level and children; plus count. |
| `get_publix_weekly_ad` | The store's current Publix weekly ad (English), about 700 items: BOGO deals (about 230 a week), sale prices, multi-buys and percent-off deals, with ad (start_date, end_date), total, count, applied_filters and departments. |
| `get_publix_extra_savings` | The store's Publix Extra Savings (temporary price reductions), several hundred items: id, base_product_id, title, size, brand, categories, savings_text (the amount saved as shown), savings, additional_savings, final_price (the reduced price, as the site lists it), min_quantity, image and url; plus store, count and period (start_date, end_date of the current Extra Savings period). |
| `get_publix_coupons` | The store's Publix digital coupons as every visitor sees them (about 100-130): id, title, description, brand, savings_text, value (the dollar amount when the coupon states one), min_quantity, limit_per_transaction, categories, valid_from, valid_to, terms and image; plus store and count. |
| `search_publix_savings` | Find a keyword across the store's Publix weekly ad, Extra Savings and digital coupons in one call: query, store, count and items, each with saving_type (weekly_ad, extra_savings or coupon) and that feed's fields. |
| `get_publix_order_ahead` | The store's Publix deli and bakery order-ahead (in-store pickup) menu with this store's prices: Pub Subs (section subs, default) or the whole catalog of subs, platters, cakes, wings and meals (section all, about 1,150 items, 60 per page). |
| `find_publix_stores` | Find Publix stores near a ZIP code or in a city (city + state), or read one store by store_id. |
| `get_publix_suggestions` | The suggestions the Publix search box shows for what a user typed: up to 10 popular searches (suggestions: text, type) and, with store_id, up to 4 products (item_code, base_product_id, title, description, saving_text, image, url); plus query, store_id and count. |

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
