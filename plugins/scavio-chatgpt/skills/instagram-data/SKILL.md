---
name: instagram-data
description: Answer questions with live Instagram data from Scavio. Use when the user asks about Instagram: profiles with follower counts and bio, timeline posts, reels, tagged posts, stories and highlights, single-post detail, comments, replies and likers, follower, following and similar-account lists, and search across users, hashtags, Reels, music and locations.
---

# Instagram data with Scavio

Use Scavio's Instagram tools to answer with current public Instagram data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `get_instagram_profile` | Get an Instagram user's profile: bio, follower/following/post counts, verification and user_id. |
| `get_instagram_user_posts` | List an Instagram user's posts, about 12 per page. |
| `get_instagram_user_reels` | List an Instagram user's Reels. |
| `get_instagram_user_tagged` | List posts an Instagram user is tagged in. |
| `get_instagram_post` | Get a single Instagram post/reel. |
| `get_instagram_post_comments` | Get comments on an Instagram post. |
| `get_instagram_comment_replies` | Get replies to an Instagram comment. |
| `search_instagram_users` | Search Instagram users by keyword. |
| `search_instagram_hashtags` | Search Instagram hashtags by keyword. |
| `get_instagram_user_highlights` | List an Instagram user's story highlights: highlight id, title, cover and media_count. |
| `search_instagram_reels` | Search Instagram Reels by keyword: caption, author, play/like/comment counts and video URL. |
| `search_instagram_music` | Search Instagram audio tracks by song or artist: title, artist, duration and the id get_instagram_music_posts takes. |
| `get_instagram_music_posts` | List the Reels that use an Instagram audio track, plus the track's total reel count. |
| `search_instagram_locations` | Search Instagram places by name: location id, name, address, city and coordinates. |
| `get_instagram_user_similar` | Get accounts similar to an Instagram user. |

## Work in this order

1. Run the narrowest tool that answers the question. Do not call tools the question does not need.
2. Search first when the user gives a name or keyword, then pass the id the search returns to the detail tool. Do not guess ids.
3. Most post tools take a shortcode or the post URL. Comment replies need the media_id from get_instagram_post.
4. Page through more results only when the user asks for more than the first page returns.

## Write the answer

- Answer from the returned data only. Do not invent posts, counts, quotes or dates.
- Link the source page for each item you mention when the data includes it.
- Prices, counts and availability change; say they are current as of the request.
- Report only public content. Do not compile profiles of private individuals beyond what the user asked about.
- When nothing matches, say so and suggest a different query.
- If a tool returns an error, tell the user what failed in plain language. If the account has no credits left, say that the request could not run.
