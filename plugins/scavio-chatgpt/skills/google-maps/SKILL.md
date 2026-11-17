---
name: google-maps
description: Answer questions with live Google Maps data from Scavio. Use when the user asks about Google Maps: search places by query and map center, fetch full place detail with address, phone, hours, rating and GPS coordinates, page reviews with sort, and run a local-SEO geo-grid to track where a business ranks across an NxN lattice of points.
---

# Google Maps data with Scavio

Use Scavio's Google Maps tools to answer with current public Google Maps data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `google_maps_search` | Search Google Maps for businesses and places, with rating, review count, address, phone, website, hours and a place_id. |
| `google_maps_place` | Get full details for one Google Maps place by place_id or data_cid: address, phone, website, opening hours, rating, review count and category. |
| `google_maps_reviews` | Get reviews for one Google Maps place by place_id or data_id, with rating, review text and date. |

## Work in this order

1. Run the narrowest tool that answers the question. Do not call tools the question does not need.
2. Search first when the user gives a name or keyword, then pass the id the search returns to the detail tool. Do not guess ids.
3. Put the area in the query ('dentists in Denver CO'), then pass the returned place_id to the place, reviews or company_enrich tools.
4. Page through more results only when the user asks for more than the first page returns.

## Write the answer

- Answer from the returned data only. Do not invent results, prices, ratings, dates or sources.
- Link the source page for each item you mention when the data includes it.
- Prices, counts and availability change; say they are current as of the request.
- When nothing matches, say so and suggest a different query.
- If a tool returns an error, tell the user what failed in plain language. If the account has no credits left, say that the request could not run.
