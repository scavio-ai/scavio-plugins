---
name: youtube-data
description: Answer questions with live YouTube data from Scavio. Use when the user asks about YouTube: search videos, Shorts and channels, then pull video metadata, comments and replies, transcripts, related videos, download streams, channel info, videos and community posts, and a single community post with its comments.
---

# YouTube data with Scavio

Use Scavio's YouTube tools to answer with current public YouTube data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `search_youtube` | Search YouTube videos. |
| `search_youtube_shorts` | Search YouTube Shorts. |
| `youtube_search_suggestions` | YouTube search autocomplete suggestions for a query. |
| `get_youtube_video` | Get YouTube video details: title, channel, stats, description, chapters, captions. |
| `get_youtube_comments` | Get comments on a YouTube video. |
| `get_youtube_comment_replies` | Get replies to a YouTube comment. |
| `get_youtube_transcript` | Get a YouTube video's transcript/captions. |
| `get_youtube_related` | Get related/recommended videos for a YouTube video. |
| `search_youtube_channels` | Search YouTube channels by keyword. |
| `get_youtube_channel` | Get a YouTube channel's profile. |
| `get_youtube_channel_videos` | List a YouTube channel's videos. |
| `get_youtube_channel_shorts` | List a YouTube channel's Shorts. |
| `get_youtube_channel_community` | List a YouTube channel's community posts (data.posts). |
| `resolve_youtube_channel` | Resolve a YouTube @handle or URL to its canonical channel ID. |
| `get_youtube_community_post` | Get a single YouTube community post: text, author and channel id, likes (vote_count), comment count, attachment type and images, and comments_cursor for get_youtube_community_post_comments. |
| `get_youtube_community_post_comments` | Get comments on a YouTube community post (data.comments) with likes, reply counts and author. |

## Work in this order

1. Run the narrowest tool that answers the question. Do not call tools the question does not need.
2. Search first when the user gives a name or keyword, then pass the id the search returns to the detail tool. Do not guess ids.
3. Channel tools accept an @handle directly. Use get_youtube_transcript when the user wants what a video says.
4. Page through more results only when the user asks for more than the first page returns.

## Write the answer

- Answer from the returned data only. Do not invent posts, counts, quotes or dates.
- Link the source page for each item you mention when the data includes it.
- Prices, counts and availability change; say they are current as of the request.
- Report only public content. Do not compile profiles of private individuals beyond what the user asked about.
- When nothing matches, say so and suggest a different query.
- If a tool returns an error, tell the user what failed in plain language. If the account has no credits left, say that the request could not run.
