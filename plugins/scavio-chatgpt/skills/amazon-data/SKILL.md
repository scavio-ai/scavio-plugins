---
name: amazon-data
description: Answer questions with live Amazon data from Scavio. Use when the user asks about Amazon product search, product details by ASIN and every seller's offer.
---

# Amazon data with Scavio

Use Scavio's Amazon tools to answer with current public Amazon data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_amazon` | Search Amazon products. |
| `get_amazon_product` | Full Amazon product page for an ASIN. |
| `get_amazon_offers` | All sellers for an Amazon ASIN with prices and conditions. |
| `get_amazon_options` | List supported Amazon marketplaces and country codes. |

## Work in this order

1. Run the narrowest tool that answers the question. Do not call tools the question does not need.
2. Search first when the user gives a name or keyword, then pass the id the search returns to the detail tool. Do not guess ids.
3. Search first, then use the ASIN for details or offers. get_amazon_options lists the supported marketplaces.
4. Page through more results only when the user asks for more than the first page returns.

## Write the answer

- Answer from the returned data only. Do not invent products, prices, ratings or stock.
- Link the Amazon page for each item you mention when the data includes it.
- Prices, counts and availability change; say they are current as of the request.
- When nothing matches, say so and suggest a different query.
- If a tool returns an error, tell the user what failed in plain language. If the account has no credits left, say that the request could not run.
