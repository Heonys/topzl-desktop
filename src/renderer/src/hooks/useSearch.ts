import { useCallback, useRef, useState } from "react";
import { useAtom } from "jotai";
import { produce } from "immer";
import { searchResultAtom, searchMediaTypeAtom } from "@/atom";
import type { SupportMediaType } from "@shared/plugin/type";

export const useSearch = () => {
  const [searchResults, setSearchResults] = useAtom(searchResultAtom);
  const [mediaType, setMediaType] = useAtom(searchMediaTypeAtom);
  const [isLoading, setIsLoading] = useState(false);
  const currentQueryRef = useRef("");

  const search = useCallback(
    async (type: SupportMediaType, searchQuery?: string) => {
      const searchResult = searchResults[type];
      const isFresh =
        searchQuery && (searchResult?.query !== searchQuery || searchResult?.type !== type);
      const page = isFresh ? 1 : searchResult!.page + 1;
      const query = isFresh ? searchQuery : searchResult!.query;
      currentQueryRef.current = query;

      if (searchResult.query === query && searchResult.type === type && searchQuery !== undefined) {
        return;
      }

      try {
        setIsLoading(true);
        const data = await window.plugin.searchMusic({ query, page, method: type });
        if (query !== currentQueryRef.current) return;

        setSearchResults((prev) =>
          produce(prev, (draft) => {
            draft[type] = {
              query,
              page,
              type,
              data: {
                isEnd: data.isEnd,
                data: isFresh ? data.data : [...(draft[type]?.data?.data ?? []), ...data.data],
              },
            };
          }),
        );

        return data;
      } catch {
        return { isEnd: true, data: [] };
      } finally {
        setIsLoading(false);
      }
    },
    [setSearchResults, searchResults],
  );

  const onChangeType = (type: SupportMediaType) => {
    setMediaType(type);
  };

  return { search, searchResults, isLoading, mediaType, onChangeType };
};
