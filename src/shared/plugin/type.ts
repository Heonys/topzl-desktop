export type SupportMediaItemMap = {
  music: MusicItem;
  album: AlbumItem;
  artist: ArtistItem;
  playlist: MusicSheetItem;
};

export type SupportMediaType = keyof SupportMediaItemMap;

export type MusicItem = {
  id: string;
  album: string;
  artist: string;
  artwork: string;
  duration: number;
  title: string;
  lyric?: string;
  url?: string;
  localPath?: string;
};

export type AlbumItem = {
  artist: string;
  artwork: string;
  id: string;
  date: string;
  title: string;
  _musicList: MusicItem[];
};

export type ArtistItem = {
  name: string;
  id: string;
  avatar: string;
};

export type MusicSheetItem = {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  createAt: string;
  worksNum: number;
  artistItem: ArtistItem;
};

export type SearchResult = {
  isEnd?: boolean;
  data: MusicItem[];
};

export interface SheetInfoResult {
  isEnd?: boolean;
  // sheetItem: MusicSheetItem;
  musicList: MusicItem[];
}

export type CurrentLyric = {
  time: number; // 시간(초)
  lrc: string; // 가사
  index: number; // 위치
  translation?: string; // 번역
};

export type SearchedLyric = {
  isEnd: boolean;
  data: {
    title: string;
    artist: string;
    album: string;
    id: string | undefined;
  }[];
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
  getMediaSource: (id: string) => Promise<{ url: string }>;
  getAlbumInfo: () => void;
  getMusicSheetInfo: (itme: MusicSheetItem, page: number) => Promise<SheetInfoResult>;
  getArtistWorks: () => void;
  getRecommendSheetTags: () => void;
  getRecommendSheetsByTag: () => void;
  getTopLists: () => void;
  getTopListDetail: (item: any) => void;
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
  "play-end": undefined; // 재생 종료
  "music-changed": MusicItem; // 음악 변경
  "volume-changed": number; // 볼륨 변경
  "speed-changed": number; // 속도 변경
  "time-updated": CurrentTime; // progress bar 업데이트
  "play-state-changed": PlayerState; // 재생상태 변경
  "repeat-mode-changed": RepeatMode; // 반복모드 변경
  "play-back-error": string | Event; // 에러 발생
  "play-prev": undefined;
  "play-next": undefined;
};
