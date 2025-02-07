import { Dexie, Table } from "dexie";
import { LocalStorageType, IndexedDBType } from "./store";

class UserPreferenceDB extends Dexie {
  preference!: Table<Record<string, any>>;

  constructor() {
    super("UserPreferenceDB");
    this.version(1).stores({
      preference: "&key",
    });
  }
}

export const db = new UserPreferenceDB();

export function getStorage<T extends keyof LocalStorageType>(key: T) {
  const rawData = localStorage.getItem(key);
  if (rawData) return JSON.parse(rawData);
  return null;
}

export function setStorage<T extends keyof LocalStorageType>(key: T, value: LocalStorageType[T]) {
  localStorage.setItem(key, JSON.stringify(value));
}

export async function getIndexedDB<T extends keyof IndexedDBType>(key: T) {
  const rawData = await db.transaction("readonly", db.preference, async () => {
    return db.preference.get(key);
  });
  console.log(rawData);
}

export async function setIndexedDB<T extends keyof IndexedDBType>(key: T, value: IndexedDBType[T]) {
  try {
    await db.transaction("readwrite", db.preference, async () => {
      await db.preference.put({ key, value });
    });
    return true;
  } catch {
    return false;
  }
}
