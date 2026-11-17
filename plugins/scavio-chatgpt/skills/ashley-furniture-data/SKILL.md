---
name: ashley-furniture-data
description: Answer questions with live Ashley Furniture data from Scavio. Use when the user asks about Ashley Furniture: keyword search and category and deal grids with price, Ashley's Regular Price, discount, sale, clearance, doorbuster, outlet and hot buy badges, rating, review count and stock.
---

# Ashley Furniture data with Scavio

Use Scavio's Ashley Furniture tools to answer with current public Ashley Furniture data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_ashley` | Search Ashley Furniture by keyword. |
| `get_ashley_product` | One Ashley product. |
| `get_ashley_category` | One ashleyfurniture.com category's products by path or category URL (send one), sorted and filtered. |
| `get_ashley_deals` | The products of one Ashley deal event: black_friday (Black Friday furniture deals, the default), clearance (clearance furniture) or hot_buys (Ashley's Hot Buys), with the category sorts and filters. |
| `get_ashley_stores` | Ashley stores near a point (lat and lng are required; there is no address or ZIP lookup): latitude, longitude, radius_miles, count and stores with store_id, name and url, in the order Ashley lists them (alphabetical, not by distance). |
| `get_ashley_store` | One Ashley store by store_id or store page URL (send one): store_id, name, url, phone, address (street, city, state, zip, country), latitude, longitude, hours (day, opens, closes), payment_accepted, services, rating, image and map_url. |

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
