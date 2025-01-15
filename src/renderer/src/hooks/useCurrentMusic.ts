import { useAtom, useAtomValue } from "jotai";
import { currentMusicAtom, mediaSourceAtom, playListAtom } from "@/atom";
import { MusicItem } from "@shared/plugin/type";

export const useCurrentMusic = () => {
  const [currentItem, setCurrentItem] = useAtom(currentMusicAtom);
  const asyncMediaSource = useAtomValue(mediaSourceAtom);
  const [playlist, setPlaylist] = useAtom(playListAtom);

  const playMusicWithAddPlaylist = (music: MusicItem) => {
    setCurrentItem(music);
    addPlaylist(music);
  };

  const addPlaylist = (music: MusicItem) => {
    if (!playlist.find((it) => it.id === music.id)) {
      const newPlayList = [...playlist, music];
      setPlaylist(newPlayList);
    }
  };

  const removePlaylist = (id: string) => {
    const newPlayList = playlist.filter((it) => it.id !== id);
    setPlaylist(newPlayList);
  };

  return {
    currentItem,
    setCurrentItem,
    asyncMediaSource,
    playMusicWithAddPlaylist,
    playlist,
    setPlaylist,
    addPlaylist,
    removePlaylist,
  };
};
