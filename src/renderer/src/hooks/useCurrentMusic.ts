import { useAtom, useAtomValue } from "jotai";
import { currentMusicAtom, isPlayingAtom, mediaSourceAtom } from "@/atom";

const useCurrentMusic = () => {
  const [currentItem, setCurrentItem] = useAtom(currentMusicAtom);
  const asyncMediaSource = useAtomValue(mediaSourceAtom);
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);

  const togglePlaying = () => {
    setIsPlaying((prev) => !prev);
  };

  return {
    currentItem,
    setCurrentItem,
    asyncMediaSource,
    isPlaying,
    togglePlaying,
  };
};

export default useCurrentMusic;
