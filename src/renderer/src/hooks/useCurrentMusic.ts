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

  const addPlaylist = (musicItem: MusicItem) => {
    if (!playlist.find((it) => it.id === musicItem.id)) {
      const newPlayList = [...playlist, musicItem];
      setPlaylist(newPlayList);
    }
  };

  const removePlaylist = (id: string) => {
    const newPlayList = playlist.filter((it) => it.id !== id);
    setPlaylist(newPlayList);
  };

  const addNextTrack = (musicItem: MusicItem) => {
    if (!currentItem) {
      addPlaylist(musicItem);
    } else {
      const targetIndex = playlist.indexOf(currentItem);
      setPlaylist((prevList) => [
        ...prevList.slice(0, targetIndex + 1),
        musicItem,
        ...prevList.slice(targetIndex + 1),
      ]);
    }
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
    addNextTrack,
  };
};
