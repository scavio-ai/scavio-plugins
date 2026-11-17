---
name: mercari-data
description: Answer questions with live Mercari data from Scavio. Use when the user asks about Mercari: search by keyword, category or brand with status on sale, sold or all.
---

# Mercari data with Scavio

Use Scavio's Mercari tools to answer with current public Mercari data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_mercari` | Search Mercari listings by keyword (Mercari US or Mercari Japan): items (item_id, title, url, price, original_price, discount_percent, currency, status (on_sale, trading = sold and in transit, sold), condition (new, like_new, good, fair, poor, bad) and condition_name, brand, category_id, size, thumbnail, seller_id, free_shipping (us: set only when you filter by shipping; jp: null on Mercari Shops rows), created_at; jp adds is_shop, shop_id, is_auction and updated_at. |
| `get_mercari_item` | One Mercari listing by item_id or link: item_id, title, description, url, price, original_price, discount_percent (us also price_with_buyer_fee: price plus buyer fees, plus shipping when the buyer pays it), currency, status, sold_at (when it sold, if Mercari shows it), condition and condition_name, brand, category with its path, size, color, shipping (payer, method, service, days_to_ship, ships_from: US state or Japanese prefecture), likes, photos, created_at, updated_at, seller (seller_id, public display name, rating, review_count, listings_count, badges; us sold_count, jp good / normal / bad ratings). |
| `get_mercari_category` | Listings in one Mercari category (category_id from get_mercari_categories), paged and sorted, optionally with keywords: category (category_id, name on us), items (item_id, title, url, price, original_price, discount_percent, currency, status (on_sale, trading = sold and in transit, sold), condition (new, like_new, good, fair, poor, bad) and condition_name, brand, category_id, size, thumbnail, seller_id, free_shipping (us: set only when you filter by shipping; jp: null on Mercari Shops rows), created_at; jp adds is_shop, shop_id, is_auction and updated_at. |
| `get_mercari_categories` | Mercari's category tree: categories (category_id, name, parent_id, level, has_children; us adds title). |
| `get_mercari_brands` | Mercari's brand list (us about 28,800 brands, jp about 52,600), filtered by name with query and paged by 1,000: brands (brand_id, name; jp adds subname and the katakana reading), total, brands_in_market, page, has_more. |
| `get_mercari_brand` | Listings of one Mercari brand (brand_id from get_mercari_brands), paged and sorted, optionally within a category or with keywords: brand (brand_id, name), items (item_id, title, url, price, original_price, discount_percent, currency, status (on_sale, trading = sold and in transit, sold), condition (new, like_new, good, fair, poor, bad) and condition_name, brand, category_id, size, thumbnail, seller_id, free_shipping (us: set only when you filter by shipping; jp: null on Mercari Shops rows), created_at; jp adds is_shop, shop_id, is_auction and updated_at. |
| `get_mercari_deals` | Listings on Mercari's deals filter (Mercari US): listings whose price the seller dropped, each with original_price (the earlier price) and discount_percent, optionally narrowed by keywords, category_id, brand_id and the search filters, paged and sorted (50 per page, up to page 20): items (item_id, title, url, price, original_price, discount_percent, currency, status (on_sale, trading = sold and in transit, sold), condition (new, like_new, good, fair, poor, bad) and condition_name, brand, category_id, size, thumbnail, seller_id, free_shipping (us: set only when you filter by shipping; jp: null on Mercari Shops rows), created_at; jp adds is_shop, shop_id, is_auction and updated_at. |
| `get_mercari_trending` | What is trending on Mercari US as its trending page lists it: keywords (position, keyword, search_rank, rank_change, search_volume_change_percent, trend) and brands (position, brand_id, name, demand, demand_change, sold_rate_7d, recent_listings), as Mercari shows them. |
| `get_mercari_seller` | A Mercari Japan seller's public profile by seller_id or link: seller (seller_id, name, rating, ratings good / normal / bad, review_count, listings_count, followers, following, badges, is_official, phone_verified, joined, bio, url) and listings (the first 30 as the profile shows them: item_id, title, url, price, status, likes, comment_count, created_at), listings_has_more. |
| `get_mercari_seller_reviews` | The most recent 100 reviews of a Mercari Japan user by seller_id or link: seller_id, name, summary (rating, good / normal / bad counts, review_count), reviews (rating good, normal or bad; text; date; role: whether the user was the seller or the buyer), has_more. |
| `get_mercari_shop` | A Mercari Shops shop (a business seller on Mercari Japan) by shop_id or link: shop (shop_id, name, description, rating, review_count, followers, is_open, has_time_sale, badges, thumbnail, created_at, url). |

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
