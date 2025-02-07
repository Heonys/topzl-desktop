import { atom } from "jotai";

export const localDirAtom = atom<string[]>([]);
export const localSelectedDirAtom = atom<string[]>([]);
export const localMusicAtom = atom<MusicItem[]>([]);
