import { searchHistoryAtom } from "@/atom";
import { useAtom } from "jotai";

export const useSearchHistory = () => {
  const [history, setHistory] = useAtom(searchHistoryAtom);

  const clearHistory = () => {
    setHistory([]);
  };

  const removeHistory = (query: string) => {
    setHistory((prev) => prev.filter((it) => it !== query));
  };

  const addHistory = (query: string) => {
    setHistory((prev) => (prev.includes(query) ? prev : [query, ...prev]));
  };

  return { history, clearHistory, removeHistory, addHistory };
};
