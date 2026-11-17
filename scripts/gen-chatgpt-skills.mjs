#!/usr/bin/env node
/**
 * Generate the per-platform skills of the ChatGPT/Codex plugin from the live
 * /chatgpt tool list, so each skill names exactly the tools the plugin serves.
 *
 *   node scripts/gen-chatgpt-skills.mjs <tools.json> <by-platform.json>
 *
 * tools.json is the /chatgpt tools/list result (an array of tools);
 * by-platform.json maps each mcp platform key to the tool names it registers.
 * Platform names and the "use when" text come from the portable skills repo
 * (../scavio-skills), with pricing removed. Writes
 * plugins/scavio-chatgpt/skills/<slug>/SKILL.md, deletes skills for platforms
 * no longer served, and fails if a served tool belongs to no skill.
 * web-research (web pages, site crawls, company contacts) is hand-written.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "plugins", "scavio-chatgpt", "skills");
const skillsRepo = join(root, "..", "scavio-skills");
const tools = JSON.parse(readFileSync(process.argv[2], "utf8"));
const byPlatform = JSON.parse(readFileSync(process.argv[3], "utf8"));
const naming = JSON.parse(readFileSync(join(skillsRepo, "naming.json"), "utf8")).naming;
const toolByName = new Map(tools.map((t) => [t.name, t]));

const HAND_WRITTEN = new Set(["web-research"]);
const WEB_RESEARCH_TOOLS = new Set([
  "extract_url", "map_website", "crawl_website", "get_crawl_status", "cancel_crawl",
  "batch_extract", "get_batch_status", "cancel_batch", "company_enrich", "get_usage",
]);

const PRICING = /\b\d+\s*cr\b|\bcredits?\b|\bfree\b(?! shipping)|\bbill(ed|ing)?\b|\bendpoints?\b|\bcost\b/i;
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const slugify = (s) => s.toLowerCase().replace(/['\u2019]/g, "").replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/**
 * The capability list from the skills-repo description, kept short: the text
 * after "X API: " up to the first sentence or semicolon, parentheticals and
 * pricing clauses removed, cut at a comma near 300 characters.
 */
function useText(skillSlug) {
  const file = join(skillsRepo, "skills", skillSlug, "SKILL.md");
  const desc = readFileSync(file, "utf8").match(/^description:\s*"?(.*?)"?\s*$/m)[1];
  let t = desc.includes(": ") ? desc.slice(desc.indexOf(": ") + 2) : desc;
  t = t.split(/(?<=\.)\s+/)[0].split("; ")[0].replace(/\s*\([^)]*\)/g, "");
  t = t.split(", ").filter((c) => !PRICING.test(c)).join(", ");
  if (t.length > 300) t = t.slice(0, t.lastIndexOf(", ", 300));
  return t.replace(/[.,;:]+$/, "").trim();
}

function entryFor(key) {
  return naming.find((e) => norm(e.dir.replace(/^scavio-/, "")) === key || norm(e.platform) === key);
}

const KIND = {
  social: new Set(["tiktok", "youtube", "instagram"]),
  realEstate: new Set(["zillow", "redfin", "realtor"]),
  google: new Set(["googleplay", "googleads"]),
};
const kindOf = (key) =>
  KIND.social.has(key) ? "social" : KIND.realEstate.has(key) ? "real estate" : KIND.google.has(key) ? "google" : "retail";

/** Platform-specific ordering hints, where the tools need ids from another tool. */
const FLOW = {
  tiktok: "Look up a profile first when a tool needs sec_user_id. Get a hashtag's id with get_tiktok_hashtag before listing its videos.",
  instagram: "Most post tools take a shortcode or the post URL. Comment replies need the media_id from get_instagram_post.",
  youtube: "Channel tools accept an @handle directly. Use get_youtube_transcript when the user wants what a video says.",
  amazon: "Search first, then use the ASIN for details or offers. get_amazon_options lists the supported marketplaces.",
  walmart: "Seller tools need the numeric seller_catalog_id from get_walmart_product. For one store's stock, get a store_id from get_walmart_stores.",
  target: "Products are identified by TCIN. Target calls can take 10 to 40 seconds.",
  ebay: "For what an item actually sold for, call search_ebay with sold set to true.",
  bestbuy: "Products are identified by SKU. get_bestbuy_prices checks up to 15 SKUs at once.",
  zillow: "When filtering or sorting, search by city name rather than a bare ZIP. For rentals, prices are monthly rent.",
  redfin: "Redfin search and market tools do not accept city names; use a ZIP or a Redfin region.",
  realtor: "Use get_realtor_locations to turn a place name into the slug_id or property_id the other tools take.",
};

const GOOGLE_GROUPS = [
  { slug: "google-search", name: "Google Search", skill: "google-search-api", tools: ["search_google", "google_ai_mode"] },
  { slug: "google-news", name: "Google News", skill: "google-news-api", tools: ["google_news"] },
  { slug: "google-shopping", name: "Google Shopping", skill: "google-shopping-api", tools: ["google_shopping", "google_shopping_product", "google_shopping_stores"] },
  { slug: "google-maps", name: "Google Maps", skill: "google-maps-api", tools: ["google_maps_search", "google_maps_place", "google_maps_reviews"],
    flow: "Put the area in the query ('dentists in Denver CO'), then pass the returned place_id to the place, reviews or company_enrich tools." },
  { slug: "google-flights", name: "Google Flights", skill: "google-flights-api", tools: ["google_flights"] },
  { slug: "google-hotels", name: "Google Hotels", skill: "google-hotels-api", tools: ["google_hotels", "google_hotels_detail"],
    flow: "Pass a hotel's detail_token from google_hotels to google_hotels_detail for rooms and prices." },
  { slug: "google-trends", name: "Google Trends", skill: "google-trends-api", tools: ["google_trends", "google_trending"] },
];

const groups = [];
for (const g of GOOGLE_GROUPS) groups.push({ ...g, kind: "google", use: useText(g.skill), tools: g.tools.filter((n) => toolByName.has(n)) });
for (const [key, names] of Object.entries(byPlatform)) {
  if (["extract", "company", "google"].includes(key)) continue;
  const e = entryFor(key);
  if (!e) throw new Error(`no skills-repo entry for ${key}`);
  groups.push({ slug: `${slugify(e.platform)}-data`, name: e.platform, kind: kindOf(key), use: useText(e.slug), flow: FLOW[key], tools: names });
}

const invent = {
  social: "posts, counts, quotes or dates",
  retail: "products, prices, ratings, stock or store details",
  "real estate": "listings, prices, estimates or dates",
  google: "results, prices, ratings, dates or sources",
};

const assigned = new Set();
const written = new Set();
for (const g of groups) {
  if (!g.tools.length) throw new Error(`no tools for ${g.name}`);
  g.tools.forEach((n) => assigned.add(n));
  const rows = g.tools
    .map((n) => {
      const d = toolByName.get(n).description;
      const first = (d.match(/^.*?\.(?=\s|$)/)?.[0] ?? d).trim();
      return `| \`${n}\` | ${first.replace(/\|/g, "\\|")} |`;
    })
    .join("\n");
  const steps = [
    "Run the narrowest tool that answers the question. Do not call tools the question does not need.",
    "Search first when the user gives a name or keyword, then pass the id the search returns to the detail tool. Do not guess ids.",
    ...(g.flow ? [g.flow] : []),
    "Page through more results only when the user asks for more than the first page returns.",
  ].map((x, i) => `${i + 1}. ${x}`).join("\n");
  const body = `---
name: ${g.slug}
description: Answer questions with live ${g.name} data from Scavio. Use when the user asks about ${g.name}: ${g.use}.
---

# ${g.name} data with Scavio

Use Scavio's ${g.name} tools to answer with current public ${g.name} data. The user's explicit instructions always take priority over this workflow: if they name a tool, a number of results or an output format, follow that.

## Tools

| Tool | What it returns |
| --- | --- |
${rows}

## Work in this order

${steps}

## Write the answer

- Answer from the returned data only. Do not invent ${invent[g.kind]}.
- Link the source page for each item you mention when the data includes it.
- Prices, counts and availability change; say they are current as of the request.
${g.kind === "social" ? "- Report only public content. Do not compile profiles of private individuals beyond what the user asked about.\n" : ""}- When nothing matches, say so and suggest a different query.
- If a tool returns an error, tell the user what failed in plain language. If the account has no credits left, say that the request could not run.
`;
  if (body.length > 0 && !/^name: [a-z0-9-]{1,64}$/m.test(body)) throw new Error(`bad skill name ${g.slug}`);
  mkdirSync(join(out, g.slug), { recursive: true });
  writeFileSync(join(out, g.slug, "SKILL.md"), body);
  written.add(g.slug);
}

for (const dir of readdirSync(out)) {
  if (!written.has(dir) && !HAND_WRITTEN.has(dir) && existsSync(join(out, dir, "SKILL.md"))) rmSync(join(out, dir), { recursive: true });
}

const orphan = tools.map((t) => t.name).filter((n) => !assigned.has(n) && !WEB_RESEARCH_TOOLS.has(n));
if (orphan.length) throw new Error(`tools in no skill: ${orphan.join(", ")}`);
console.log(`${written.size} generated skills + web-research, ${assigned.size} tools`);
