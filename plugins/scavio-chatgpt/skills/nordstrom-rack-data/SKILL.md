---
name: nordstrom-rack-data
description: Answer questions with live Nordstrom Rack data from Scavio. Use when the user asks about Nordstrom Rack: search nordstromrack.com or list any /shop or /clearance category, Clear the Rack, flash events or a brand catalog with price, compare-at price, percent off, the clearance price and any extra-off promotion price on top, rating, badges, every color and filter counts.
---

# Nordstrom Rack data with Scavio

Use Scavio's Nordstrom Rack tools to answer with current public Nordstrom Rack data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_nordstromrack` | Search nordstromrack.com (US) products, 24 per page, sorted by relevance, rating, price, newest or percent off. |
| `get_nordstromrack_product` | One nordstromrack.com (US) product by URL or style id: name, brand, brand page URL, description, feature bullets, fit notes, final-sale flag, current, compare-at and clearance price ranges, percent off, any promotion on top (promotion_price_range and promotion_percent_off, e.g. |
| `get_nordstromrack_category` | Browse a nordstromrack.com (US) category page, 24 products per page, sorted by relevance, rating, price, newest or percent off. |
| `get_nordstromrack_brand` | List a brand's products on nordstromrack.com (US) from its brand page (/brands/adidas), 24 per page, sorted by relevance, rating, price, newest or percent off. |
| `get_nordstromrack_stores` | Find Nordstrom Rack stores near a US ZIP code or latitude/longitude within up to 100 miles, nearest first, or look Rack stores up by store number. |
| `get_nordstromrack_availability` | Online and Rack store-pickup availability for every size and color of one nordstromrack.com (US) product, by URL or style id, optionally one sku. |
| `get_nordstromrack_suggestions` | The search-box autocomplete of nordstromrack.com: the queries Nordstrom Rack suggests for a partial search term, most likely first (e.g. |
| `get_nordstromrack_reviews` | Customer reviews of one nordstromrack.com (US) product by URL or style id, up to 200 per call (default 60), sorted most helpful (default), most recent, highest rated or lowest rated, optionally filtered to star ratings, verified purchases, reviews with photos, or a text search. |

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
