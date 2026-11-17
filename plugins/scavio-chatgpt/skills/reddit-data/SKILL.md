---
name: reddit-data
description: Answer questions with live Reddit data from Scavio. Use when the user asks about Reddit posts, comments, subreddits, users and trending searches.
---

# Reddit data with Scavio

Use Scavio's Reddit tools to answer with current public Reddit data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_reddit` | Search Reddit posts. |
| `get_reddit_post` | Get a Reddit post by URL or post id. |
| `get_reddit_search_suggestions` | Get Reddit search autocomplete suggestions. |
| `get_reddit_post_comments` | Get top-level comments for a Reddit post. |
| `get_reddit_comment_replies` | Get replies to a Reddit comment. |
| `get_reddit_subreddit` | Get subreddit metadata (description, subscribers, type, etc). |
| `get_reddit_subreddit_posts` | List posts in a subreddit. |
| `get_reddit_user` | Get a Reddit user's profile. |
| `get_reddit_user_posts` | List a Reddit user's submitted posts. |
| `get_reddit_user_comments` | List a Reddit user's comments. |
| `get_reddit_popular` | Get Reddit's site-wide popular feed. |
| `get_reddit_trending` | Get Reddit's current trending search queries. |
| `search_reddit_comments` | Search Reddit comments by keyword (data.results): comment text, author, score, date, permalink, plus the post and subreddit it was left on. |
| `search_reddit_subreddits` | Find subreddits by keyword (data.results): name, description, subscriber count, NSFW and quarantine flags, URL. |

## Work in this order

1. Run the narrowest tool that answers the question. Do not call tools the question does not need.
2. Search first when the user gives a name or keyword, then pass the id the search returns to the detail tool. Do not guess ids.
3. get_reddit_post does not return comments; call get_reddit_post_comments for them. Reddit calls can take 5 to 15 seconds.
4. Page through more results only when the user asks for more than the first page returns.

## Write the answer

- Answer from the returned data only. Do not invent posts, counts, quotes or dates.
- Link the Reddit page for each item you mention when the data includes it.
- Prices, counts and availability change; say they are current as of the request.
- Report only public content. Do not compile profiles of private individuals beyond what the user asked about.
- When nothing matches, say so and suggest a different query.
- If a tool returns an error, tell the user what failed in plain language. If the account has no credits left, say that the request could not run.
