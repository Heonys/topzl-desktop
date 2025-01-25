import { MusicSheetItem } from "@shared/plugin/type";
import { useEffect, useState } from "react";

const useAlbumDetail = (item: MusicSheetItem) => {
  const [isLoading, setIsLoading] = useState(true);
  const [musicList, setMusicList] = useState<MusicItem[]>([]);

  const getAlbumDetail = async () => {
    // const randomNum = Math.floor(Math.random() * 4) + 1;
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

export default useAlbumDetail;
