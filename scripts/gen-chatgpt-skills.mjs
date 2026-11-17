#!/usr/bin/env node
/**
 * Generate the per-platform skills of the ChatGPT/Codex plugin from the live
 * /chatgpt tool list, so each skill names exactly the tools the plugin serves.
 *
 *   # in ../mcp: npm run build, then dump /chatgpt tools/list to a JSON array
 *   node scripts/gen-chatgpt-skills.mjs <tools.json>
 *
 * Writes plugins/scavio-chatgpt/skills/<slug>/SKILL.md for every platform below
 * and fails if a served tool belongs to no skill. web-research (Google, web
 * pages, company contacts) is hand-written and not touched.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "plugins", "scavio-chatgpt", "skills");
const tools = JSON.parse(readFileSync(process.argv[2], "utf8"));

const CORE = new Set([
  "search_google", "google_news", "google_shopping", "google_maps_search", "google_maps_place",
  "google_maps_reviews", "company_enrich", "extract_url", "map_website", "crawl_website",
  "get_crawl_status", "cancel_crawl", "batch_extract", "get_batch_status", "cancel_batch", "get_usage",
]);

const PLATFORMS = [
  { slug: "tiktok-data", name: "TikTok", match: /tiktok/, kind: "social",
    use: "TikTok videos, creators, hashtags, sounds, comments, trending searches and live status",
    flow: "Look up a profile first when a tool needs sec_user_id. Get a hashtag's id with get_tiktok_hashtag before listing its videos." },
  { slug: "instagram-data", name: "Instagram", match: /instagram/, kind: "social",
    use: "Instagram profiles, posts, Reels, comments, hashtags, audio and places",
    flow: "Most post tools take a shortcode or the post URL. Comment replies need the media_id from get_instagram_post." },
  { slug: "youtube-data", name: "YouTube", match: /youtube/, kind: "social",
    use: "YouTube videos, Shorts, channels, comments, transcripts and community posts",
    flow: "Channel tools accept an @handle directly. Use get_youtube_transcript when the user wants what a video says." },
  { slug: "reddit-data", name: "Reddit", match: /reddit/, kind: "social",
    use: "Reddit posts, comments, subreddits, users and trending searches",
    flow: "get_reddit_post does not return comments; call get_reddit_post_comments for them. Reddit calls can take 5 to 15 seconds." },
  { slug: "x-twitter-data", name: "X (Twitter)", match: /tweet|(^|_)x(_|$)/, kind: "social",
    use: "X (Twitter) posts, replies, user profiles and timelines, Communities and trending topics",
    flow: "Search with search_x, then open a post with get_tweet and its replies with get_tweet_comments." },
  { slug: "linkedin-data", name: "LinkedIn", match: /linkedin/, kind: "social",
    use: "LinkedIn company pages and posts, single posts and their comments, and job listings",
    flow: "search_linkedin_jobs returns most job fields; open get_linkedin_job only when the user needs the full description." },
  { slug: "amazon-data", name: "Amazon", match: /amazon/, kind: "retail",
    use: "Amazon product search, product details by ASIN and every seller's offer",
    flow: "Search first, then use the ASIN for details or offers. get_amazon_options lists the supported marketplaces." },
  { slug: "walmart-data", name: "Walmart", match: /walmart/, kind: "retail",
    use: "Walmart product search, categories, product details, reviews, sellers and stores",
    flow: "Seller tools need the numeric seller_catalog_id from get_walmart_product. For one store's stock, get a store_id from get_walmart_stores." },
  { slug: "target-data", name: "Target", match: /target/, kind: "retail",
    use: "Target.com product search, categories, product details, reviews and in-store stock near a ZIP",
    flow: "Products are identified by TCIN. Target calls are slow (10 to 40 seconds); tell the user when a call may take a while." },
  { slug: "home-depot-data", name: "Home Depot", match: /home_depot/, kind: "retail",
    use: "Home Depot product search, product details and reviews",
    flow: "Search first, then use the item id for details or reviews." },
  { slug: "ebay-data", name: "eBay", match: /ebay/, kind: "retail",
    use: "eBay live and sold listings, listing details and seller profiles",
    flow: "For what an item actually sold for, call search_ebay with sold set to true." },
  { slug: "best-buy-data", name: "Best Buy", match: /bestbuy/, kind: "retail",
    use: "Best Buy product search, categories, deals, product details, reviews, prices, stores and pickup availability",
    flow: "Products are identified by SKU. get_bestbuy_prices checks up to 15 SKUs at once." },
  { slug: "zillow-data", name: "Zillow", match: /zillow/, kind: "real estate",
    use: "Zillow homes for sale, for rent and sold, listing details and agent reviews",
    flow: "When filtering or sorting, search by city name rather than a bare ZIP. For rentals, prices are monthly rent." },
  { slug: "redfin-data", name: "Redfin", match: /redfin/, kind: "real estate",
    use: "Redfin listings, property details with estimates, history and schools, and housing market stats",
    flow: "Redfin search and market tools do not accept city names; use a ZIP or a Redfin region." },
  { slug: "realtor-data", name: "Realtor.com", match: /realtor/, kind: "real estate",
    use: "Realtor.com listings for sale, rent and sold, property details, home value estimates, market stats and agents",
    flow: "Use get_realtor_locations to turn a place name into the slug_id or property_id the other tools take." },
];

const firstSentence = (d) => (d.match(/^.*?\.(?=\s|$)/)?.[0] ?? d).trim();
const assigned = new Set();

for (const p of PLATFORMS) {
  const mine = tools.filter((t) => !CORE.has(t.name) && p.match.test(t.name));
  if (!mine.length) throw new Error(`no tools for ${p.name}`);
  mine.forEach((t) => assigned.add(t.name));
  const rows = mine.map((t) => `| \`${t.name}\` | ${firstSentence(t.description).replace(/\|/g, "\\|")} |`).join("\n");
  const body = `---
name: ${p.slug}
description: Answer questions with live ${p.name} data from Scavio. Use when the user asks about ${p.use}.
---

# ${p.name} data with Scavio

Use Scavio's ${p.name} tools to answer with current public ${p.name} data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
${rows}

## Work in this order

1. Run the narrowest tool that answers the question. Do not call tools the question does not need.
2. Search first when the user gives a name or keyword, then pass the id the search returns to the detail tool. Do not guess ids.
3. ${p.flow}
4. Page through more results only when the user asks for more than the first page returns.

## Write the answer

- Answer from the returned data only. Do not invent ${p.kind === "social" ? "posts, counts, quotes or dates" : p.kind === "retail" ? "products, prices, ratings or stock" : "listings, prices, estimates or dates"}.
- Link the ${p.name} page for each item you mention when the data includes it.
- Prices, counts and availability change; say they are current as of the request.
${p.kind === "social" ? "- Report only public content. Do not compile profiles of private individuals beyond what the user asked about.\n" : ""}- When nothing matches, say so and suggest a different query.
- If a tool returns an error, tell the user what failed in plain language. If the account has no credits left, say that the request could not run.
`;
  mkdirSync(join(out, p.slug), { recursive: true });
  writeFileSync(join(out, p.slug, "SKILL.md"), body);
}

const orphan = tools.filter((t) => !CORE.has(t.name) && !assigned.has(t.name)).map((t) => t.name);
if (orphan.length) throw new Error(`tools in no skill: ${orphan.join(", ")}`);
console.log(`${PLATFORMS.length} skills, ${assigned.size} tools`);
