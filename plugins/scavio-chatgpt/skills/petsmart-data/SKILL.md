---
name: petsmart-data
description: Answer questions with live PetSmart data from Scavio. Use when the user asks about PetSmart: search petsmart.com with national price, sale price, rating, promotions and how many stores stock each item, read one product with every size and flavor, UPC, sale end date and Autoship first-order and recurring price, find the 12 stores nearest a ZIP.
---

# PetSmart data with Scavio

Use Scavio's PetSmart tools to answer with current public PetSmart data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_petsmart` | Search PetSmart products, up to 40 per page. |
| `get_petsmart_product` | One PetSmart product by web_style_id, SKU or URL, with every variant (size/flavor): SKU, UPC, price, original price, sale price and end date, Autoship discount with first-order and recurring price, ship-to-home stock, pickup and same-day purchase options, images and promotions. |
| `get_petsmart_stores` | The 12 PetSmart stores nearest a US ZIP code: store number (store_id), name, address, phone, coordinates, distance in miles, time zone, the next 7 days of opening hours and services (grooming, PetsHotel, veterinary, adoptions...). |
| `get_petsmart_store_stock` | Stock of up to 20 SKUs at one PetSmart store in one call: units available for in-store pickup at that store, units available to ship to home, and an alternate nearby store with its count when the store has none. |
| `get_petsmart_availability` | Unit counts for up to 20 PetSmart store and SKU pairs in one call, mixing stores and SKUs freely. |
| `get_petsmart_deals` | Products in PetSmart's Sale section, up to 40 per page, in the same shape as search_petsmart, plus the current sale events with approximate product counts. |

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
