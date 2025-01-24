import { searchHistoryAtom } from "@/atom";
import { useAtom } from "jotai";

const MAX_HISTORY = 7;

export const useSearchHistory = () => {
  const [history, setHistory] = useAtom(searchHistoryAtom);

  const clearHistory = () => {
    setHistory([]);
  };

  const removeHistory = (query: string) => {
    setHistory((prev) => prev.filter((it) => it !== query));
  };

  const addHistory = (query: string) => {
    setHistory((prev) => {
      const newHistory = prev.filter((it) => it !== query);
      return [query, ...newHistory].slice(0, MAX_HISTORY);
    });
  };

  return { history, clearHistory, removeHistory, addHistory };
};
