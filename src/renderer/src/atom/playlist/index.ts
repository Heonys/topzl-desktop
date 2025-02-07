import { atom } from "jotai";
import { currentMusicAtom } from "../current";

export type PlaylistInfo = {
  type?: "favorite" | "current";
  title: string;
  data: MusicItem[];
  date?: string;
  description?: string;
};

export const playListAtom = atom<MusicItem[]>([]);
export const allPlaylistsAtom = atom<PlaylistInfo[]>([]);

export const getCurrentListIndex = atom((get) => {
  const currentMusic = get(currentMusicAtom);
  if (!currentMusic) return -1;
  const playlist = get(playListAtom);
  return playlist.findIndex((it) => it.id === currentMusic.id);
});

export const favoriteListAtom = atom<MusicItem[]>([]);

export const downloadedMusicAtom = atom<MusicItem[]>([]);

export const recommededList = atom<MusicItem[]>([]);
