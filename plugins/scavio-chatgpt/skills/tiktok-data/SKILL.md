---
name: tiktok-data
description: Answer questions with live TikTok data from Scavio. Use when the user asks about TikTok videos, creators, hashtags, sounds, comments, trending searches and live status.
---

# TikTok data with Scavio

Use Scavio's TikTok tools to answer with current public TikTok data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `get_tiktok_profile` | Get a TikTok user's profile. |
| `get_tiktok_user_posts` | List a TikTok user's videos. |
| `get_tiktok_video` | Get TikTok video details: caption, stats, play URLs, author, music. |
| `get_tiktok_video_comments` | Get comments on a TikTok video. |
| `get_tiktok_comment_replies` | Get replies to a TikTok comment. |
| `search_tiktok_videos` | Search TikTok videos by keyword. |
| `search_tiktok_users` | Search TikTok users by keyword. |
| `get_tiktok_hashtag` | Get TikTok hashtag stats. |
| `get_tiktok_hashtag_videos` | List TikTok videos for a hashtag. |
| `get_tiktok_trending_searches` | Get the search terms trending on TikTok right now (data.trending_search_words, about 90 per call). |
| `get_tiktok_trending_videos` | Get a sample of videos trending on TikTok now (data.itemList) with author, stats, sound and hashtags. |
| `get_tiktok_search_suggestions` | Get TikTok search autocomplete suggestions for a keyword (data.data[].word). |
| `get_tiktok_music` | Get a TikTok sound by id (data.music_info): title, artist, album, duration, how many videos use it (user_count), original vs commercial, play URL, cover, and chart rank when charting. |
| `get_tiktok_music_videos` | List videos that use a TikTok sound (data.aweme_list). |
| `search_tiktok_music` | Search TikTok sounds by keyword (data.music): id_str, title, artist, duration, usage count and play URL. |
| `get_tiktok_music_chart` | Get TikTok's Top 50 or Viral 50 sound chart (data.music_list) with each sound's details and trend. |
| `get_tiktok_user_similar` | Get creators similar to a TikTok user (data.users, about 30 per page) with follower, following, video and like counts, bio and verification. |
| `get_tiktok_user_playlists` | List a TikTok user's playlists (series) in data.playList: mixId, name, video count, cover. |
| `get_tiktok_playlist_videos` | List the videos in a TikTok playlist (data.itemList). |
| `get_tiktok_user_live` | Check whether a TikTok user is live now: user, live room status (2 = live, 4 = not live), title, start time and current viewer counts. |

## Work in this order

1. Run the narrowest tool that answers the question. Do not call tools the question does not need.
2. Search first when the user gives a name or keyword, then pass the id the search returns to the detail tool. Do not guess ids.
3. Look up a profile first when a tool needs sec_user_id. Get a hashtag's id with get_tiktok_hashtag before listing its videos.
4. Page through more results only when the user asks for more than the first page returns.

## Write the answer

- Answer from the returned data only. Do not invent posts, counts, quotes or dates.
- Link the TikTok page for each item you mention when the data includes it.
- Prices, counts and availability change; say they are current as of the request.
- Report only public content. Do not compile profiles of private individuals beyond what the user asked about.
- When nothing matches, say so and suggest a different query.
- If a tool returns an error, tell the user what failed in plain language. If the account has no credits left, say that the request could not run.
