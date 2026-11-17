---
name: realtor-com-data
description: Answer questions with live Realtor.com data from Scavio. Use when the user asks about Realtor.com: search listings for sale, pending, property type, sold-within days and listing-text keywords, pull one property in full with price and tax history, home value estimates, schools and flood/fire risk, get area market stats, and find agents with every review.
---

# Realtor.com data with Scavio

Use Scavio's Realtor.com tools to answer with current public Realtor.com data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_realtor` | Search Realtor.com US listings for sale, pending, for rent or sold, by location, lat/lng radius or agent. |
| `get_realtor_property` | Get one Realtor.com property by property_id or URL: description and details, price history, tax history with assessed and market values, three home value estimates with ranges, history and forecast, schools with ratings, flood/wildfire/noise risk, popularity, the listing agent and office with contact details, mortgage estimate and photos. |
| `get_realtor_locations` | Autocomplete a partial US place name on Realtor.com: cities, counties, ZIPs, neighborhoods, schools and addresses, each with its slug_id (for get_realtor_market) and, for an address, the property_id (for get_realtor_property). |
| `get_realtor_market` | Get Realtor.com housing market stats for a US city, county or ZIP: median listing, sold and rent price, price per sqft, days on market, lot size, listing and rental counts, year-over-year and month-over-month change, and a breakdown by property type. |
| `search_realtor_agents` | Find US real estate agents on Realtor.com by city, ZIP or name: rating, review and recommendation counts, active listing count and price range, homes sold last year, broker, office, first year in business and services. |
| `get_realtor_agent` | Get one Realtor.com agent's profile with every review: bio, phones, website, license number and state, MLS memberships, languages, specializations, served areas, designations, office, social links, listing and sales stats, and each review with responsiveness, market expertise, negotiation and professionalism sub-ratings and the agent's reply. |

## Work in this order

1. Run the narrowest tool that answers the question. Do not call tools the question does not need.
2. Search first when the user gives a name or keyword, then pass the id the search returns to the detail tool. Do not guess ids.
3. Use get_realtor_locations to turn a place name into the slug_id or property_id the other tools take.
4. Page through more results only when the user asks for more than the first page returns.

## Write the answer

- Answer from the returned data only. Do not invent listings, prices, estimates or dates.
- Link the source page for each item you mention when the data includes it.
- Prices, counts and availability change; say they are current as of the request.
- When nothing matches, say so and suggest a different query.
- If a tool returns an error, tell the user what failed in plain language. If the account has no credits left, say that the request could not run.
