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

    const insert = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)");
    insert.run("John Doe", "john.doe@example.com");
    insert.run("Jane Doe", "jane.doe@example.com");

    const rows = db.prepare("SELECT * FROM users").all();
    console.log(rows); // 삽입된 데이터 출력
  } catch (error) {
    console.error("DB initialization failed", error);
  }
}
