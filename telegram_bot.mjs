import TelegramBot from "node-telegram-bot-api/lib/telegram.js";
import { db } from "./connectDB.mjs";
const token = process.env.TELEGRAM_BOT_TOKENs;
const bot = new TelegramBot(token, { polling: true });
const stmt = db.prepare("SELECT * FROM articles");
let messages_id = [];
async function sendMessageInChunks(chatId, text, bot) {
  const chunkSize = 4096;
  for (let i = 0; i < text.length; i += chunkSize) {
    const chunk = text.substring(i, i + chunkSize);
    await bot.sendMessage(chatId, chunk, { parse_mode: "HTML" });
  }
}
// console.log(splitMessage(ms.replaceAll(/[^a-zA-Z0-9\s]|\n|\r/gi, "")));
bot.onText(/\/start/gi, (msg) => {
  messages_id.push(msg.chat.id);
  bot.sendMessage(msg.chat.id, "welcome to my bot for front end news");
});
bot.onText(/\/show/gi, (msg) => {
  for (const article of stmt.iterate()) {
    const sentMessage = sendMessageInChunks(
      msg.chat.id,
      `<b>${"🔥" + article.title}</b>\n ${article.content
        .toString()
        .replaceAll(/[*\n\r]+/gi, "")}`,
      bot
    );
    messages_id.push(sentMessage.message_id);
  }
});
bot.onText(/\/summary/gi, (msg) => {
  for (const article of stmt.iterate()) {
    const sendMessage = bot.sendMessage(
      msg.chat.id,
      `<b>${"🔥" + article.title}</b>\n\n ${article.summarize
        .toString()
        .replaceAll(/[*\n\r]+/gi, "")} \n\n ${article.link}`,
      { parse_mode: "HTML" }
    );
  }
});
bot.on("message", (msg) => {
  const clearMessages = "clear";
  if (msg.text.toString().toLowerCase().indexOf(clearMessages) === 0) {
    bot.deleteMessages(msg.chatId, parseInt(messages_id));
  }
  console.log(messages_id);
});
