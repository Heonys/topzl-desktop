import { useAtom } from "jotai";
import { favoriteListAtom } from "@/atom";
import type { MusicItem } from "@shared/plugin/type";

export const useFavorite = () => {
  const [favoriteList, setFavoriteList] = useAtom(favoriteListAtom);

  const favorite = (musicItem: MusicItem) => {
    if (favoriteList.some((it) => it.id === musicItem.id)) return;
    setFavoriteList((prev) => [...prev, musicItem]);
  };

  const unfavorite = (id: string) => {
    setFavoriteList((prev) => prev.filter((it) => it.id !== id));
  };

  const isFavorite = (id: string) => {
    return !!favoriteList.find((it) => it.id === id);
  };

  return { favoriteList, favorite, unfavorite, isFavorite, setFavoriteList };
};
