import { useAtom, useAtomValue } from "jotai";
import {
  currentMusicAtom,
  mediaSourceAtom,
  playListAtom,
  getCurrentListIndex,
  playlistUpdatedAt,
} from "@/atom";
import { MusicItem } from "@shared/plugin/type";

export const useCurrentMusic = () => {
  const [currentItem, setCurrentItem] = useAtom(currentMusicAtom);
  const asyncMediaSource = useAtomValue(mediaSourceAtom);
  const [playlist, setPlaylist] = useAtom(playListAtom);
  const curretIndex = useAtomValue(getCurrentListIndex);
  const [latestPlaylist, setLatestPlaylist] = useAtom(playlistUpdatedAt);

  const refreshDate = () => {
    setLatestPlaylist(new Date().toLocaleDateString());
  };

  const changeCurrentItem = (track: MusicItem) => {
    setCurrentItem(track);
    window.plugin.setCurrentTrack(track);
    window.messagePort.sendMessage({ type: "data", data: track });
  };

  const playWithAddPlaylist = (musicItem: MusicItem) => {
    changeCurrentItem(musicItem);
    addPlaylist(musicItem);
  };

  const playWithAddAllPlaylist = (musicItem: MusicItem, musicItems: MusicItem[]) => {
    if (!musicItem) return;
    changeCurrentItem(musicItem);
    mergePlaylist(musicItems);
  };

  const addPlaylist = (musicItem: MusicItem) => {
    if (!playlist.find((it) => it.id === musicItem.id)) {
      const newPlayList = [...playlist, musicItem];
      setPlaylist(newPlayList);
      refreshDate();
    }
  };

  const mergePlaylist = (musicItems: MusicItem[]) => {
    setPlaylist((prev) => {
      const newItems = musicItems.filter((musicItem) => {
        return !prev.some((it) => it.id === musicItem.id);
      });
      return [...prev, ...newItems];
    });
    refreshDate();
  };

  const removePlaylist = (id: string) => {
    const newPlayList = playlist.filter((it) => it.id !== id);
    setPlaylist(newPlayList);
    refreshDate();
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
    refreshDate();
  };

  return {
    currentItem,
    asyncMediaSource,
    playWithAddPlaylist,
    playlist,
    setPlaylist,
    addPlaylist,
    removePlaylist,
    addNextTrack,
    playWithAddAllPlaylist,
    curretIndex,
    changeCurrentItem,
    latestPlaylist,
  };
};
