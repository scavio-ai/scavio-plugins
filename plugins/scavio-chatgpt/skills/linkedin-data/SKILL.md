---
name: linkedin-data
description: Answer questions with live LinkedIn data from Scavio. Use when the user asks about LinkedIn company pages and posts, single posts and their comments, and job listings.
---

# LinkedIn data with Scavio

Use Scavio's LinkedIn tools to answer with current public LinkedIn data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
| `get_linkedin_company` | Get a LinkedIn company profile. |
| `get_linkedin_company_posts` | Get a LinkedIn company's posts. |
| `search_linkedin_jobs` | Search LinkedIn jobs. |
| `get_linkedin_job` | Get full LinkedIn job details. |
| `get_linkedin_post` | Get a single LinkedIn post's full details. |
| `get_linkedin_post_comments` | Get comments on a LinkedIn post. |

## Work in this order

1. Run the narrowest tool that answers the question. Do not call tools the question does not need.
2. Search first when the user gives a name or keyword, then pass the id the search returns to the detail tool. Do not guess ids.
3. search_linkedin_jobs returns most job fields; open get_linkedin_job only when the user needs the full description.
4. Page through more results only when the user asks for more than the first page returns.

## Write the answer

- Answer from the returned data only. Do not invent posts, counts, quotes or dates.
- Link the LinkedIn page for each item you mention when the data includes it.
- Prices, counts and availability change; say they are current as of the request.
- Report only public content. Do not compile profiles of private individuals beyond what the user asked about.
- When nothing matches, say so and suggest a different query.
- If a tool returns an error, tell the user what failed in plain language. If the account has no credits left, say that the request could not run.
