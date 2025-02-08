import { atom } from "jotai";

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
