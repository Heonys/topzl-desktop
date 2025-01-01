import { allPlaylistsAtom } from "@/atom";
import { useAtom } from "jotai";

export const useLibrary = () => {
  const [playLists, setPlayLists] = useAtom(allPlaylistsAtom);

  const createPlaylist = (title: string, description?: string) => {
    if (playLists.some((list) => list.title === title)) return;
    setPlayLists((prev) => [...prev, { title, description, data: [] }]);
  };

  const removePlaylist = (title: string) => {
    setPlayLists((prev) => prev.filter((it) => it.title !== title));
  };

  return { playLists, createPlaylist, removePlaylist };
};
