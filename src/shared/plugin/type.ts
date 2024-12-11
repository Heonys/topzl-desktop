type SupportMediaType = "music" | "album" | "sheet" | "artist";

export type MusicItem = {
  album: string;
  artist: string;
  artwork: string;
  duration: number;
  id: number;
  title: string;
  url_slug: string;
};

type SearchFunc = (
  query: string,
  page: number,
  type: SupportMediaType,
) => Promise<{
  isEnd?: boolean;
  data: MusicItem[];
}>;

export interface PluginDefine {
  platform: string;
  version: string;
  author: string;
  primaryKey: string[];
  srcUrl: string;
  cacheControl: "cache" | "no-cache" | "no-store";
  supportedSearchType: SupportMediaType[];
  search: SearchFunc;
  getMediaSourc: () => void;
  getAlbumInfo: () => void;
  getMusicSheetInfo: () => void;
  getArtistWorks: () => void;
  getRecommendSheetTags: () => void;
  getRecommendSheetsByTag: () => void;
  getTopLists: () => void;
  getTopListDetail: () => void;
}
