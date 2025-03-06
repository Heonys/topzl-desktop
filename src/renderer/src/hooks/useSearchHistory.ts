import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/atom";
import { useAppConfig } from "./useAppConfig";
import { defaultAppConfig } from "@shared/config/type";

export const useSearchHistory = () => {
  const [history, setHistory] = useAtom(searchHistoryAtom);
  const { appConfig } = useAppConfig();

  const clearHistory = () => {
    setHistory([]);
  };

  const removeHistory = (query: string) => {
    setHistory((prev) => prev.filter((it) => it !== query));
  };

  const maxHistoryLength = () => {
    return appConfig.general?.maxHistoryLength ?? defaultAppConfig["general.maxHistoryLength"]!;
  };

  const addHistory = (query: string) => {
    setHistory((prev) => {
      const newHistory = prev.filter((it) => it !== query);
      return [query, ...newHistory].slice(0, maxHistoryLength());
    });
  };

  return {
    history: history.slice(0, maxHistoryLength()),
    clearHistory,
    removeHistory,
    addHistory,
  };
};
