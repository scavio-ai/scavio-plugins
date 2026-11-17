---
name: nordstrom-data
description: Answer questions with live Nordstrom data from Scavio. Use when the user asks about Nordstrom: search nordstrom.com or list any category, sale section or brand catalog with price, original price, percent off, rating, badges, every color and filter counts, read one product with every size and color as a SKU with UPC, regular, clearance or promotion price.
---

# Nordstrom data with Scavio

Use Scavio's Nordstrom tools to answer with current public Nordstrom data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_nordstrom` | Search nordstrom.com (US) products, 24 per page, sorted by relevance, rating, price, newest or percent off. |
| `get_nordstrom_product` | One nordstrom.com (US) product by URL or style id: name, brand, description, feature bullets, fit notes, final-sale flag, current, original and clearance price ranges, percent off, rating, review count, the star histogram, the size-fit distribution (too small to too big), the AI review summary when the site shows one, the most mentioned praised and criticized features with a quote each, breadcrumbs and images. |
| `get_nordstrom_category` | Browse a nordstrom.com (US) category page, 24 products per page, sorted by relevance, rating, price, newest or percent off. |
| `get_nordstrom_brand` | List a brand's products on nordstrom.com (US) from its brand page, 24 per page, sorted by relevance, rating, price, newest or percent off. |
| `get_nordstrom_stores` | Find Nordstrom stores (full-line stores and Nordstrom Local) near a US ZIP code or latitude/longitude within up to 100 miles, nearest first, or look stores up by store number. |
| `get_nordstrom_availability` | Online and store-pickup availability for every size and color of one nordstrom.com (US) product, by URL or style id, optionally one sku. |
| `get_nordstrom_suggestions` | The search-box autocomplete of nordstrom.com: the queries Nordstrom suggests for a partial search term, most likely first (e.g. |
| `get_nordstrom_reviews` | Customer reviews of one nordstrom.com (US) product by URL or style id, up to 200 per call (default 60), sorted most helpful (default), most recent, highest rated or lowest rated, optionally filtered to star ratings, verified purchases, reviews with photos, or a text search. |

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
