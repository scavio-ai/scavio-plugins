---
name: dollar-general-data
description: Answer questions with live Dollar General data from Scavio. Use when the user asks about Dollar General: search Dollar General at the store you choose with that store's price and units on hand, look up a product by UPC, get one product's unit count at up to 25 nearby stores in one call, list on-sale and clearance items, and page the current digital coupons.
---

# Dollar General data with Scavio

Use Scavio's Dollar General tools to answer with current public Dollar General data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_dollar_general` | Search Dollar General products at one store. |
| `get_dollar_general_product` | One Dollar General product by UPC at one store: price, original price, available_quantity (units on hand), nearby_stores_with_stock, rating, review count, SKU, brand, description, highlights, images, category hierarchy, digital coupons and promotions. |
| `get_dollar_general_stores` | Dollar General stores near a US ZIP or coordinates, nearest first (up to 25): store number, address, phone, coordinates, distance in miles, opening hours and services. |
| `get_dollar_general_deals` | Dollar General products on sale or on clearance, priced and stocked at one store, 24 per page. |
| `get_dollar_general_coupons` | Dollar General's current digital coupons, 30 per page: offer id and code, summary, description, brand, company, value, offer type, category, minimum quantity, start and expiration dates, and whether it is a manufacturer coupon. |

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
