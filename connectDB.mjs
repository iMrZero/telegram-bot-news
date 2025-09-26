import Database from "better-sqlite3";
export const db = new Database("./articles.db");
let sql;

sql = `CREATE TABLE IF NOT EXISTS articles
  (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, desc TEXT ,content TEXT, summarize TEXT , link TEXT)`;
db.prepare(sql).run();

// export const db = new sqlite3.Database("./articles.sqlite", (err) => {
//   if (err) {
//     console.error("error connecting to database" + err);
//   } else {
//     console.log("connected to database");
//   }
// });
