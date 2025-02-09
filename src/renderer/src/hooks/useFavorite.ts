import { useAtom } from "jotai";
import { favoriteListAtom, favoriteUpdatedAt } from "@/atom";
import type { MusicItem } from "@shared/plugin/type";

export const useFavorite = () => {
  const [favoriteList, setFavoriteList] = useAtom(favoriteListAtom);
  const [latestFavorite, setLatestFavorite] = useAtom(favoriteUpdatedAt);

  const refreshDate = () => {
    setLatestFavorite(new Date().toLocaleDateString());
  };

  const favorite = (musicItem: MusicItem) => {
    if (favoriteList.some((it) => it.id === musicItem.id)) return;
    setFavoriteList((prev) => [...prev, musicItem]);
    refreshDate();
  };

  const unfavorite = (id: string) => {
    setFavoriteList((prev) => prev.filter((it) => it.id !== id));
    refreshDate();
  };

  const isFavorite = (id: string) => {
    return !!favoriteList.find((it) => it.id === id);
  };

  return { favoriteList, favorite, unfavorite, isFavorite, setFavoriteList, latestFavorite };
};
