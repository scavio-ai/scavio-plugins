---
name: tcgplayer-data
description: Answer questions with live TCGplayer data from Scavio. Use when the user asks about TCGplayer: search tcgplayer.com cards and sealed products across Pokemon, Magic: The Gathering, Yu-Gi-Oh!, One Piece, Lorcana and every other game, read one product with the market price of every SKU and the low, high and count of the recent sales behind it, page every live seller listing with price.
---

# TCGplayer data with Scavio

Use Scavio's TCGplayer tools to answer with current public TCGplayer data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_tcgplayer` | Search TCGplayer (US marketplace, USD) for trading cards and sealed products across every game (Pokemon, Magic: The Gathering, Yu-Gi-Oh!, One Piece, Lorcana and 60+ more), up to 50 per page, sorted by relevance, best match, best selling, name or market price, filtered by game, set, rarity and cards vs sealed. |
| `get_tcgplayer_product` | Near Mint / Normal / English) with its market price, lowest_sale_price and highest_sale_price over recent sales, sale_count (the sales behind the market price) and when it was calculated. |
| `get_tcgplayer_listings` | Live marketplace listings for one TCGplayer product (US, USD), cheapest first by price plus shipping (default) or by item price, up to 50 per page, filtered by condition, printing, language, verified sellers or TCGplayer Direct. |
| `get_tcgplayer_price_history` | Sales price history for one TCGplayer product (US, USD) over a month, quarter (default), half year or year, per SKU (condition, printing, language): total quantity sold, transaction count, average daily sales, and buckets newest first (daily for month, 3-day for quarter, weekly for semi_annual and annual) with market price, quantity sold, transaction count and the low and high sale price with and without shipping (null for a bucket with no sales). |
| `get_tcgplayer_sales` | The 5 most recent sales of one TCGplayer product (US, USD), optionally only in some conditions: order date, condition, printing, language, quantity, sale price, shipping, total and listing type. |
| `get_tcgplayer_games` | Every game (product line) on TCGplayer, 70+ (Magic: The Gathering, Yu-Gi-Oh!, Pokemon, One Piece, Lorcana...): game_id, name, url_name (what search_tcgplayer, get_tcgplayer_sets and get_tcgplayer_seller_products accept as game) and whether TCGplayer Direct carries it. |
| `get_tcgplayer_sets` | Every set of one TCGplayer game, newest release first: set_id (for get_tcgplayer_price_guide), name, url_name (for search_tcgplayer's set filter), abbreviation, release date and the supplemental flag. |
| `get_tcgplayer_price_guide` | The TCGplayer price guide for one whole set (US, USD): one row per product per condition and printing with product id, name, URL, card number, rarity, market price and low price, for cards (default) or sealed products, up to 500 rows per page. |
| `get_tcgplayer_suggestions` | The TCGplayer search-box autocomplete for a partial query (no game filter): suggested products (product id, name, URL, set, game, score), matching sets and the games the matches come from with counts. |
| `get_tcgplayer_trending` | What shoppers are searching on TCGplayer right now, overall or for Pokemon, Magic or Yu-Gi-Oh!: up to 10 terms with a popularity score. |
| `get_tcgplayer_seller` | One TCGplayer seller by seller key (a listing's seller.key): store name, URL, location, member since, lifetime sales band, completed sales rank, rating percent, gold star, Direct, Pro, US and international shipping, store hours, games sold, social links, and the last 365 days of buyer feedback summarized (total, percent positive, count per star, as described / arrived when expected / good communication). |
| `get_tcgplayer_seller_feedback` | Individual buyer feedback on one TCGplayer seller from the last 365 days, newest first, up to 50 per page, optionally only one star rating or only feedback with a comment: date, rating, comment, as described / arrived when expected / good communication, and the buyer's masked nickname as the site shows it. |
| `get_tcgplayer_seller_products` | The products one TCGplayer seller has listed (US, USD), optionally matching keywords or one game, up to 50 per page, sorted like search_tcgplayer. |

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
