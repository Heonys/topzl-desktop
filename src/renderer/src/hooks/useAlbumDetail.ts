import { recommededList } from "@/atom";
import { MusicSheetItem } from "@shared/plugin/type";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export const useAlbumDetail = (item: MusicSheetItem) => {
  const [isLoading, setIsLoading] = useState(true);
  const [musicList, setMusicList] = useState<MusicItem[]>([]);

  const getAlbumDetail = async () => {
    setIsLoading(true);
    try {
      const data = await window.plugin.searchPlaylist({ item, page: 1 });
      setMusicList(data.musicList);
      setIsLoading(false);
    } catch {
      setMusicList([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAlbumDetail();
  }, []);

  return { musicList, isLoading };
};

const kpopSheet = {
  artistItem: { url_slug: "ellie_bp" },
  url_slug: "k-pop",
} as MusicSheetItem;

export const useRecommendList = () => {
  const [musicList, setMusicList] = useAtom(recommededList);
  const [isLoading, setIsLoading] = useState(false);

  const getAlbumDetail = async () => {
    setIsLoading(true);
    try {
      const data = await window.plugin.searchPlaylist({ item: kpopSheet, page: 1 });
      setMusicList(data.musicList);
    } catch {
      setMusicList([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (musicList.length === 0) {
      getAlbumDetail();
    }
  }, []);

  return { musicList, isLoading };
};
