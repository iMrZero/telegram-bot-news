# Tech News Aggregator + AI Summarizer

This project is a **Tech News Aggregator** that collects the latest updates from popular tech blogs and websites (CSS, HTML, JS, Frameworks), summarizes them using Google Gemini AI, and sends updates to a Telegram bot.

## Features

- Aggregates news from multiple RSS feeds (CSS-Tricks, Chrome Developers, Smashing Magazine, JavaScript Weekly)
- Summarizes articles using Google Gemini AI
- Stores articles and summaries in a local SQLite database
- Telegram bot to display articles and summaries to users
- and you can edit the list of RSS to get more news because it flexable

## Project Structure

- `main.mjs` — Fetches RSS feeds, summarizes content, and inserts into the database
- `summary.mjs` — Handles AI summarization using Google Gemini
- `connectDB.mjs` — Sets up and connects to the SQLite database
- `telegram_bot.mjs` — Telegram bot for interacting with users and displaying news
- `articles.db` — SQLite database file
- `package.json` — Project dependencies and metadata

## Setup

### Prerequisites

- Node.js (v16+ recommended)

### Installation

1. Clone the repository or copy the project files.
2. Install dependencies:

   ```sh
   npm install
   ```

3. Set your Google Gemini API key in `summary.mjs` (already present in the sample, but you should use your own key for production).
4. Set your Telegram bot token in `telegram_bot.mjs` (replace the sample token with your own).

## Usage

1. **Fetch and store news articles:**

   ```sh
   node main.mjs
   ```

   This will fetch articles from the configured RSS feeds, summarize them, and store them in the database.

2. **Start the Telegram bot:**

   ```sh
   node telegram_bot.mjs
   ```

   Interact with the bot on Telegram using the following commands:
   - `/start` — Welcome message
   - `/show` — Show all articles
   - `/summary` — Show summarized articles
   - Send `clear` — Attempt to clear messages (see code for details)

## Configuration

- **RSS Feeds:** Edit the `feedUrls` array in `main.mjs` to add or remove sources.
- **Database:** The database schema is defined in `connectDB.mjs`.
- **AI Model:** The summarization uses Google Gemini (see `summary.mjs`).

## Dependencies

- [@google/genai](https://www.npmjs.com/package/@google/genai)
- [better-sqlite3](https://www.npmjs.com/package/better-sqlite3)
- [node-fetch](https://www.npmjs.com/package/node-fetch)
- [node-telegram-bot-api](https://www.npmjs.com/package/node-telegram-bot-api)
- [rss-parser](https://www.npmjs.com/package/rss-parser)
- [sqlite3](https://www.npmjs.com/package/sqlite3)

## Disclaimer

- API keys in the code are for demonstration only. Replace them with your own for production use.
- This project is for educational purposes.
