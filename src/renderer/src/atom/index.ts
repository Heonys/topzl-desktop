import { MusicItem, PlayerState, RepeatMode } from "@shared/plugin/type";
import { atom } from "jotai";
import { loadable } from "jotai/utils";
import trackPlayer from "@shared/plugin/trackPlayer";
import { toast } from "react-toastify";

export const currentMusicAtom = atom<MusicItem | null>(null);

export const playListAtom = atom<MusicItem[]>([]);

export const getCurrentListIndex = atom((get) => {
  const currentMusic = get(currentMusicAtom);
  if (!currentMusic) return -1;
  const playlist = get(playListAtom);
  return playlist.findIndex((it) => it.id === currentMusic.id);
});

const mediaSourceAtomAsync = atom(async (get) => {
  const currentMusic = get(currentMusicAtom);
  if (!currentMusic) return { url: "" };
  try {
    const result = await window.plugin.getMediaSource(currentMusic.id);
    trackPlayer.setTrackSource({ url: result.url }, currentMusic);
    trackPlayer.play();
    return result;
  } catch {
    toast.error("재생할 수 없습니다");
    trackPlayer.skipToNext();
  }
});

export const mediaSourceAtom = loadable(mediaSourceAtomAsync);

// export const searchResultAtom = atom({});

const lyricAtomAsync = atom(async (get) => {
  const currentMusic = get(currentMusicAtom);
  if (!currentMusic) return null;
  return window.plugin.searchLyric(currentMusic.title);
});
export const lyricAtomLodable = loadable(lyricAtomAsync);

export const musicDetailVisibleAtom = atom(false);

export const panelAtom = atom(false);

//  이벤트
export const initProgress = {
  currentTime: 0,
  duration: Infinity,
};
export const currentProgressAtom = atom(initProgress);
export const currentVolumeAtom = atom(0.2);
export const currentSpeedAtom = atom(1);
export const currentRepeatModeAtom = atom(RepeatMode.Queue);
export const currentPlayerStateAtom = atom(PlayerState.None);
