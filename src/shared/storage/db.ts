import { Dexie, Table } from "dexie";
import { PlaylistInfo } from "src/renderer/src/atom";

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

export interface IndexedDBType {
  playlist: MusicItem[];
  playlistAll: PlaylistInfo[];
  favoriteList: MusicItem[];
  downloadedList: MusicItem[];

  searchHistory: string[];

  localDir: string[];
  selectedLocalDir: string[];
  localMusicList: MusicItem[];
}

export async function getIndexedDB<T extends keyof IndexedDBType>(
  key: T,
): Promise<{ value: IndexedDBType[T] }> {
  const rawData = await db.transaction("readonly", db.preference, async () => {
    return db.preference.get(key);
  });
  return rawData;
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
