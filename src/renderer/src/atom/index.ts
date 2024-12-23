import { MusicItem, PlayerState, RepeatMode } from "@shared/plugin/type";
import { atom } from "jotai";
import { loadable } from "jotai/utils";
import trackPlayer from "@shared/plugin/trackPlayer";

export const currentMusicAtom = atom<MusicItem | null>(null);

const mediaSourceAtomAsync = atom(async (get) => {
  const currentMusic = get(currentMusicAtom);
  if (!currentMusic) return { url: "" };
  const result = await window.plugin.getMediaSource(currentMusic.id);
  trackPlayer.setTrackSource({ url: result.url }, currentMusic);
  trackPlayer.play();
  return result;
});

export const mediaSourceAtom = loadable(mediaSourceAtomAsync);

// export const searchResultAtom = atom({});

export const musicDetailVisibleAtom = atom(false);

export const panelAtom = atom(false);

//  이벤트
export const initProgress = {
  currentTime: 0,
  duration: Infinity,
};
export const currentProgressAtom = atom(initProgress);
export const currentVolumeAtom = atom(0.5);
export const currentSpeedAtom = atom(1);
export const currentRepeatModeAtom = atom(RepeatMode.Queue);
export const currentPlayerStateAtom = atom(PlayerState.None);
