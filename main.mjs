import Parser from "rss-parser";
import { db } from "./connectDB.mjs";
import { summarize } from "./summary.mjs";
const parser = new Parser();
const feedUrls = [
  "https://css-tricks.com/feed/",
  "https://developer.chrome.com/feed.xml",
  "https://www.smashingmagazine.com/feed/",
  "https://javascriptweekly.com/rss/",
];
const feeds = await getFeeds(feedUrls);
insertFeeds(feeds);
async function getFeeds(urls) {
  let feedsContent = [];
  for (const url of urls) {
    try {
      const listOfFeeds = await parser.parseURL(url);
      feedsContent.push(listOfFeeds);
      // console.log(listOfFeeds.title);
    } catch (error) {
      console.error(`parsing error on ${url}`);
    }
  }
  return feedsContent;
}
async function insertFeeds(feeds) {
  const stmt = db.prepare(
    "INSERT INTO articles (title, desc, content , summarize , link) VALUES (?, ?, ?, ?, ?)"
  );

  for (const feed of feeds) {
    const title = feed.title;
    const desc = feed.description;
    const link = feed.link;
    const content = feed.items
      .map((item) => item.content)
      .join(" ")
      .replaceAll(/<[^>]*>/g, "");
    const summary = await summarize(content);
    stmt.run(title, desc, content, summary, link);
    // console.log(`Inserted feed: ${title}`);
  }
}
