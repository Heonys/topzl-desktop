import { atom } from "jotai";
import { loadable } from "jotai/utils";
import trackPlayer from "@shared/plugin/trackPlayer";
import { PlayerState, RepeatMode } from "@shared/plugin/type";

export const currentMusicAtom = atom<MusicItem | null>(null);

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
      trackPlayer.play();
    }
  } catch {
    trackPlayer.clear();
    trackPlayer.skipToNext();
  }
});

export const mediaSourceAtom = loadable(mediaSourceAtomAsync);

// EventEmitter
export const initProgress = {
  currentTime: 0,
  duration: Infinity,
};
export const currentProgressAtom = atom(initProgress);
export const currentVolumeAtom = atom(0.1);
export const currentSpeedAtom = atom(1);
export const currentRepeatModeAtom = atom(RepeatMode.None);
export const currentShuffleModeAtom = atom(false);
export const currentPlayerStateAtom = atom(PlayerState.None);

// Lyric
const lyricAtomAsync = atom(async (get) => {
  const currentMusic = get(currentMusicAtom);
  if (!currentMusic) return null;
  return window.plugin.searchLyric(currentMusic.title);
});
export const lyricAtomLodable = loadable(lyricAtomAsync);
