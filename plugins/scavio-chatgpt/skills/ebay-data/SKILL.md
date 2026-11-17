---
name: ebay-data
description: Answer questions with live eBay data from Scavio. Use when the user asks about eBay: search live listings with price, condition, bids, units sold, watchers, shipping and seller feedback, read one listing in full with item specifics, shipping, returns and auction state, and pull a seller's feedback score, items sold and location.
---

# eBay data with Scavio

Use Scavio's eBay tools to answer with current public eBay data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_ebay` | Search eBay live or sold listings. |
| `get_ebay_product` | Get full eBay listing details: specs, images, shipping, auction state, seller info. |
| `get_ebay_seller` | Get eBay seller profile. |

## Work in this order

1. Run the narrowest tool that answers the question. Do not call tools the question does not need.
2. Search first when the user gives a name or keyword, then pass the id the search returns to the detail tool. Do not guess ids.
3. For what an item actually sold for, call search_ebay with sold set to true.
4. Page through more results only when the user asks for more than the first page returns.

## Write the answer

- Answer from the returned data only. Do not invent products, prices, ratings, stock or store details.
- Link the source page for each item you mention when the data includes it.
- Prices, counts and availability change; say they are current as of the request.
- When nothing matches, say so and suggest a different query.
- If a tool returns an error, tell the user what failed in plain language. If the account has no credits left, say that the request could not run.
