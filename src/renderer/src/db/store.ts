import { atom } from "jotai";
import { PlaylistInfo } from "@/atom";
import { RepeatMode } from "@shared/plugin/type";

export interface LocalStorageType {
  currentMusic: MusicItem | null;
  // currentMediaSource: { url: string };

  repeatMode: RepeatMode;
  shuffleMode: boolean;
  volume: number;
  speed: number;
  currentProgress: number;
}

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

export const STORAGE_KEY = "user-preference";
export const defaultStorage = {
  currentMusic: null,
  currentProgress: 0,
  repeatMode: RepeatMode.None,
  shuffleMode: false,
  volume: 0.1,
  speed: 1,
};

export const storageAtom = atom<LocalStorageType>(getInitialStorage());

function getInitialStorage(): LocalStorageType {
  const savedStorage = localStorage.getItem(STORAGE_KEY);
  if (savedStorage) {
    return JSON.parse(savedStorage);
  }
  return defaultStorage;
}
