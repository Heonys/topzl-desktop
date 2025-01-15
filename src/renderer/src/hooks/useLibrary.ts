import { allPlaylistsAtom } from "@/atom";
import { MusicItem } from "@shared/plugin/type";
import { useAtom } from "jotai";

export const useLibrary = () => {
  const [playLists, setPlayLists] = useAtom(allPlaylistsAtom);

  const createPlaylist = (title: string, description?: string) => {
    if (playLists.some((list) => list.title === title)) return;
    setPlayLists((prev) => [
      ...prev,
      { title, description, date: new Date().toLocaleDateString(), data: [] },
    ]);
  };

  const renamePlaylist = (title: string, newTitle: string) => {
    setPlayLists((prev) =>
      prev.map((list) => (list.title === title ? { ...list, title: newTitle } : list)),
    );
  };

  const addPlaylistByTitle = (title: string, item: MusicItem) => {
    setPlayLists((prev) => {
      const index = prev.findIndex((it) => it.title === title);
      if (index === -1) return prev;

      return [
        ...prev.slice(0, index),
        { ...prev[index], data: [...prev[index].data, item] },
        ...prev.slice(index + 1),
      ];
    });
  };

  const removePlaylist = (title: string) => {
    setPlayLists((prev) => prev.filter((it) => it.title !== title));
  };

  const setPlaylistByTitle = (title: string, playList: MusicItem[]) => {
    setPlayLists((prev) => {
      const index = prev.findIndex((it) => it.title === title);
      if (index === -1) return prev;
      return [
        ...prev.slice(0, index),
        { ...prev[index], data: playList },
        ...prev.slice(index + 1),
      ];
    });
  };

  const removePlaylistByTitle = (title: string, id: string) => {
    setPlayLists((prev) => {
      const index = prev.findIndex((it) => it.title === title);
      if (index === -1) return prev;

      const updatedPlaylist = {
        ...prev[index],
        data: prev[index].data.filter((item) => item.id !== id),
      };
      return [...prev.slice(0, index), updatedPlaylist, ...prev.slice(index + 1)];
    });
  };

  return {
    playLists,
    createPlaylist,
    removePlaylist,
    renamePlaylist,
    addPlaylistByTitle,
    setPlaylistByTitle,
    removePlaylistByTitle,
  };
};
