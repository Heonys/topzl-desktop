import { getDefaultStore } from "jotai";
import { Dexie, Table } from "dexie";
import { PlaylistInfo } from "src/renderer/src/atom";
import {
  playListAtom,
  allPlaylistsAtom,
  favoriteListAtom,
  downloadedMusicAtom,
  searchHistoryAtom,
  localDirAtom,
  localSelectedDirAtom,
  localMusicAtom,
} from "@/atom";

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

interface IndexedDBProperty {
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

const store = getDefaultStore();

export async function syncWithIndexedDB() {
  await Promise.allSettled([
    syncAtom(playListAtom, "playlist"),
    syncAtom(allPlaylistsAtom, "playlistAll"),
    syncAtom(favoriteListAtom, "favoriteList"),
    syncAtom(downloadedMusicAtom, "downloadedList"),
    syncAtom(searchHistoryAtom, "searchHistory"),
    syncAtom(localDirAtom, "localDir"),
    syncAtom(localSelectedDirAtom, "selectedLocalDir"),
    syncAtom(localMusicAtom, "localMusicList"),
  ]);
}

async function syncAtom(atom: any, key: keyof IndexedDBProperty) {
  const data = await getIndexedDB(key);
  store.set(atom, data ?? []);
}

export function setupAtomEffect() {
  store.sub(playListAtom, () => {
    setIndexedDB("playlist", store.get(playListAtom));
  });

  store.sub(allPlaylistsAtom, () => {
    setIndexedDB("playlistAll", store.get(allPlaylistsAtom));
  });

  store.sub(favoriteListAtom, () => {
    setIndexedDB("favoriteList", store.get(favoriteListAtom));
  });

  store.sub(downloadedMusicAtom, () => {
    setIndexedDB("downloadedList", store.get(downloadedMusicAtom));
  });

  store.sub(searchHistoryAtom, () => {
    setIndexedDB("searchHistory", store.get(searchHistoryAtom));
  });

  store.sub(localDirAtom, () => {
    setIndexedDB("localDir", store.get(localDirAtom));
  });
  store.sub(localSelectedDirAtom, () => {
    setIndexedDB("selectedLocalDir", store.get(localSelectedDirAtom));
  });
  store.sub(localMusicAtom, () => {
    setIndexedDB("localMusicList", store.get(localMusicAtom));
  });
}
