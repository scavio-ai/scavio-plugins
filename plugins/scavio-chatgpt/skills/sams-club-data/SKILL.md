---
name: sams-club-data
description: Answer questions with live Sam's Club data from Scavio. Use when the user asks about Sam's Club: search Sam's Club, read an item's club shelf price, Instant Savings, stock and aisle at the club you choose, find clubs near a ZIP, list every Instant Savings item and any category including clearance, and page member reviews.
---

# Sam's Club data with Scavio

Use Scavio's Sam's Club tools to answer with current public Sam's Club data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_sams_club` | Search Sam's Club. |
| `get_sams_club_product` | One Sam's Club item: online price and the club shelf price (club_price) with was price, savings and unit price, Instant Savings (amount, end date, limit), rating histogram, images, UPC, model, specifications, and fulfillment per method with stock status and aisle. |
| `get_sams_club_clubs` | Sam's Club clubs near a US ZIP, nearest first, within 100 miles: club_id, name, address, coordinates, distance in miles, phone, opening hours, services and whether the club is temporarily closed. |
| `get_sams_club_savings` | Every item on Sam's Club Instant Savings, paged (up to 45 per page): price, was price and savings amount, plus each offer's amount, end date, purchase limit and the channels (shipping, pickup, delivery) it applies to. |
| `get_sams_club_category` | Products in a Sam's Club category, paged, with the same fields as search_sams_club. |
| `get_sams_club_reviews` | Customer reviews for a Sam's Club item, 10 per page: rating, title, text, author, date, verified purchase and helpful votes, plus the average rating, total count and 1-5 star breakdown. |

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
