---
name: x-twitter-data
description: Answer questions with live X (Twitter) data from Scavio. Use when the user asks about X (Twitter) posts, replies, user profiles and timelines, Communities and trending topics.
---

# X (Twitter) data with Scavio

Use Scavio's X (Twitter) tools to answer with current public X (Twitter) data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_x` | Search X tweets and people. |
| `get_tweet` | Get a single tweet's full details. |
| `get_tweet_comments` | Get replies to a tweet. |
| `get_x_user` | Get an X user's profile. |
| `get_x_user_tweets` | List an X user's tweets. |
| `get_x_user_replies` | List an X user's tweets and replies. |
| `get_x_user_media` | List an X user's media tweets. |
| `get_x_trending` | Get trending topics on X for a country. |
| `search_x_communities` | Find X Communities by keyword (data.communities): community_id, name, member count, primary topic, NSFW flag. |
| `get_x_community` | Get an X Community's details: name, description, creation date, member count, primary topic, NSFW flag and rules. |
| `get_x_community_tweets` | List posts in an X Community (data.timeline) by relevance or recency, with text, author and engagement counts. |

## Work in this order

1. Run the narrowest tool that answers the question. Do not call tools the question does not need.
2. Search first when the user gives a name or keyword, then pass the id the search returns to the detail tool. Do not guess ids.
3. Search with search_x, then open a post with get_tweet and its replies with get_tweet_comments.
4. Page through more results only when the user asks for more than the first page returns.

## Write the answer

- Answer from the returned data only. Do not invent posts, counts, quotes or dates.
- Link the X (Twitter) page for each item you mention when the data includes it.
- Prices, counts and availability change; say they are current as of the request.
- Report only public content. Do not compile profiles of private individuals beyond what the user asked about.
- When nothing matches, say so and suggest a different query.
- If a tool returns an error, tell the user what failed in plain language. If the account has no credits left, say that the request could not run.
