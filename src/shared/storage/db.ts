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

export interface IndexedDBProperty {
  playlist: MusicItem[];
  playlistAll: PlaylistInfo[];
  favoriteList: MusicItem[];
  downloadedList: MusicItem[];
  searchHistory: string[];
  localDir: string[];
  selectedLocalDir: string[];
  localMusicList: MusicItem[];
}

export async function getIndexedDB<T extends keyof IndexedDBProperty>(
  key: T,
): Promise<IndexedDBProperty[T] | null> {
  const rawData = await db.transaction("readonly", db.preference, async () => {
    return db.preference.get(key);
  });
  if (rawData) return rawData.value;
  return null;
}

export async function setIndexedDB<T extends keyof IndexedDBProperty>(
  key: T,
  value: IndexedDBProperty[T],
) {
  try {
    await db.transaction("readwrite", db.preference, async () => {
      await db.preference.put({ key, value });
    });
    return true;
  } catch {
    return false;
  }
}
