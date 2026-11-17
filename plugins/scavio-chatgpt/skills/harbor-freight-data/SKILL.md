---
name: harbor-freight-data
description: Answer questions with live Harbor Freight data from Scavio. Use when the user asks about Harbor Freight: search harborfreight.com or list clearance with the national price, sale price and end date, public coupon price, Inside Track member price and competitor compare-at price, read one product with UPC, specs and manuals, batch prices for up to 50 items, find stores near a ZIP, check in-stock.
---

# Harbor Freight data with Scavio

Use Scavio's Harbor Freight tools to answer with current public Harbor Freight data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_harbor_freight` | Search Harbor Freight by keyword and/or category, with brand and clearance filters and 7 sorts. |
| `get_harbor_freight_clearance` | Harbor Freight clearance items, optionally narrowed by keyword, category or brand. |
| `get_harbor_freight_product` | One Harbor Freight product by item number, id or URL: title, brand, UPC, price (what the shelf charges now), regular_price, on_sale and clearance flags, sale (sale price, end date, savings, banner code; CLR is clearance), coupon (public coupon price, code, expiry and per-customer limit), member_deal (Inside Track Club member price) and compare_at (the competitor brand, model and price Harbor Freight quotes). |
| `get_harbor_freight_prices` | Current national prices for up to 50 Harbor Freight item numbers in one call: price (what the shelf charges now), regular_price, on_sale and clearance flags, sale (sale price, end date, savings, banner code; CLR is clearance), coupon (public coupon price, code, expiry and per-customer limit), member_deal (Inside Track Club member price) and compare_at (the competitor brand, model and price Harbor Freight quotes). |
| `get_harbor_freight_stores` | Harbor Freight stores near a ZIP code, "City, ST" or coordinates, nearest first: store number (store_id), name, address, phone, coordinates, distance in miles, status, opening date and hours. |
| `get_harbor_freight_availability` | In-store stock for up to 20 Harbor Freight items at chosen stores, or at the stores nearest a ZIP code or coordinates. |
| `get_harbor_freight_reviews` | Customer reviews for one Harbor Freight item, newest first, with limit/offset paging: title, text, star rating, author, review and purchase dates, incentivized flag, helpful votes and the reviewer's answers (would recommend, what they liked). |

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
