import { Dexie, Table } from "dexie";

class LocalDB extends Dexie {
  users!: Table<{ id?: number; name: string }, number>;

  constructor() {
    super("topzlDB");
    this.version(1).stores({
      users: "++id, name",
    });
  }
}

const db = new LocalDB();
export default db;
