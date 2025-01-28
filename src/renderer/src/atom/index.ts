import { atom } from "jotai";
import { loadable } from "jotai/utils";
import { MusicItem, PlayerState, RepeatMode, SearchResult } from "@shared/plugin/type";
import trackPlayer from "@shared/plugin/trackPlayer";
import type { SupportMediaType } from "@shared/plugin/type";

export type PlaylistInfo = {
  type?: "favorite" | "current";
  title: string;
  data: MusicItem[];
  date?: string;
  description?: string;
};

export const currentMusicAtom = atom<MusicItem | null>(null);

export const playListAtom = atom<MusicItem[]>([]);
export const allPlaylistsAtom = atom<PlaylistInfo[]>([]);

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
    trackPlayer.skipToNext();
  }
});

export const mediaSourceAtom = loadable(mediaSourceAtomAsync);

export const searchHistoryAtom = atom<string[]>([]);

type SearchResults = {
  [K in SupportMediaType]: {
    query: string;
    page: number;
    type: SupportMediaType;
    data: SearchResult;
  };
};

const INIT_SEARCH_RESULT = { music: {}, album: {}, artist: {}, playlist: {} } as SearchResults;
export const searchResultAtom = atom<SearchResults>(INIT_SEARCH_RESULT);
export const searchMediaTypeAtom = atom<SupportMediaType>("music");

const lyricAtomAsync = atom(async (get) => {
  const currentMusic = get(currentMusicAtom);
  if (!currentMusic) return null;
  return window.plugin.searchLyric(currentMusic.title);
});
export const lyricAtomLodable = loadable(lyricAtomAsync);

export const musicDetailVisibleAtom = atom(false);

export const panelAtom = atom(false);

export const favoriteListAtom = atom<MusicItem[]>([]);

export const localDirAtom = atom<string[]>([]);
export const localSelectedDirAtom = atom<string[]>([]);
export const localMusicAtom = atom<MusicItem[]>([]);

export const downloadedMusicAtom = atom<MusicItem[]>([]);

export const recommededList = atom<MusicItem[]>([]);

//  이벤트
export const initProgress = {
  currentTime: 0,
  duration: Infinity,
};
export const currentProgressAtom = atom(initProgress);
export const currentVolumeAtom = atom(0.2);
export const currentSpeedAtom = atom(1);
export const currentRepeatModeAtom = atom(RepeatMode.None);
export const currentShuffleModeAtom = atom(false);
export const currentPlayerStateAtom = atom(PlayerState.None);

// 컨텍스트 메뉴

export type ContextMenuItem =
  | {
      type: "menu";
      icon?: string;
      title?: string;
      onClick?: () => void;
    }
  | {
      type: "divider";
    };

export type ContextMenu = {
  musicInfo?: MusicItem;
  menuItems: ContextMenuItem[];
  x: number;
  y: number;
};

export const contextMenuAtom = atom<ContextMenu | null>(null);
