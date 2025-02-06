import { app } from "electron";
import Database from "better-sqlite3";
import path from "node:path";

export function setupDatabase() {
  const dbPath = path.join(app.getPath("userData"), "topzlDB.db");
  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");

  try {
    db.prepare(
      `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL
      )
    `,
    ).run();

    const rows = db.prepare("SELECT * FROM users").all();
    console.log(rows);
  } catch (error) {
    console.error("DB initialization failed", error);
  }
}
