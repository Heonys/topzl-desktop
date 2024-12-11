import { useCallback } from "react";

const useSearch = () => {
  const search = useCallback(async (query: string, page: number) => {
    return window.plugin.callPluginMethod({
      method: "search",
      query,
      page,
    });
  }, []);

  return { search };
};

export default useSearch;
