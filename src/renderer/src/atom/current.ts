import { atom, getDefaultStore } from "jotai";
import { loadable, atomWithStorage } from "jotai/utils";
import trackPlayer from "@shared/plugin/trackPlayer";
import { PlayerState, RepeatMode } from "@shared/plugin/type";
import { appConfigAtom } from "./config";

const store = getDefaultStore();
let isMounted = false;
export const currentMusicAtom = atomWithStorage<MusicItem | null>("currentMusic", null);

const mediaSourceAtomAsync = atom(async (get) => {
  const currentMusic = get(currentMusicAtom);
  if (!currentMusic) return { url: "" };
  try {
    if (currentMusic.localPath) {
      trackPlayer.setLocalTrackSource(currentMusic).then(() => {
        trackPlayer.play();
      });
    } else {
      const result = await window.plugin.getMediaSource(currentMusic.id);
      trackPlayer.setTrackSource({ url: result.url }, currentMusic);
      if (isMounted) {
        trackPlayer.play();
      }
      isMounted = true;
    }
  } catch {
    const appConfig = store.get(appConfigAtom);
    trackPlayer.clear();
    if (appConfig.playback?.playError === "skip-next") {
      trackPlayer.skipToNext();
    }
  }
});

export const mediaSourceAtom = loadable(mediaSourceAtomAsync);

// EventEmitter
export const initProgress = {
  currentTime: 0,
  duration: Infinity,
};
export const currentProgressAtom = atom(initProgress);
export const currentVolumeAtom = atomWithStorage("volume", 0.1);
export const currentSpeedAtom = atomWithStorage("speed", 1);
export const currentRepeatModeAtom = atomWithStorage("repeatMode", RepeatMode.None);
export const currentShuffleModeAtom = atomWithStorage("shuffleMode", false);
export const currentPlayerStateAtom = atom(PlayerState.None);

// Lyric
const lyricAtomAsync = atom(async (get) => {
  const currentMusic = get(currentMusicAtom);
  if (!currentMusic) return null;
  return window.plugin.searchLyric(currentMusic.title);
});
export const lyricAtomLodable = loadable(lyricAtomAsync);
