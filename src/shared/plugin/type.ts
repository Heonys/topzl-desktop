export type SupportMediaType = "music" | "album" | "sheet" | "artist";

export type MusicItem = {
  album: string;
  artist: string;
  artwork: string;
  duration: number;
  title: string;
  id: number;
  url_slug: string;
};

export type AlbumItem = any;
export type ArtistItem = any;
export type MusicSheetItem = any;

export type SearchResult = {
  isEnd?: boolean;
  data: MusicItem[];
};

type SearchFunc = (query: string, page: number, type: SupportMediaType) => Promise<SearchResult>;

export interface PluginDefine {
  platform: string;
  version: string;
  author: string;
  primaryKey: string[];
  srcUrl: string;
  cacheControl: "cache" | "no-cache" | "no-store";
  supportedSearchType: SupportMediaType[];
  search: SearchFunc;
  getMediaSource: (id: number) => Promise<{ url: string }>;
  getAlbumInfo: () => void;
  getMusicSheetInfo: () => void;
  getArtistWorks: () => void;
  getRecommendSheetTags: () => void;
  getRecommendSheetsByTag: () => void;
  getTopLists: () => void;
  getTopListDetail: () => void;
}

export enum RepeatMode {
  Shuffle = "shuffle",
  Queue = "queue-repeat",
  Loop = "loop",
}

export type CurrentTime = {
  currentTime: number;
  duration: number;
};

export enum PlayerState {
  None,
  Playing,
  Paused,
  Buffering,
}

export type EventPayloadMap = {
  "play-state-changed": PlayerState;
  "speed-changed": number;
  "repeat-mode-changed": RepeatMode;
  "music-changed": MusicItem;
  "volume-changed": number;
  "play-end": undefined;
  "time-updated": CurrentTime;
};
