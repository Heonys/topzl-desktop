import { getDefaultStore } from "jotai";
import { getIndexedDB, setIndexedDB, IndexedDBProperty } from "./db";
import {
  playListAtom,
  allPlaylistsAtom,
  favoriteListAtom,
  downloadedMusicAtom,
  searchHistoryAtom,
  localDirAtom,
  localSelectedDirAtom,
  localMusicAtom,
} from "src/renderer/src/atom";

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
