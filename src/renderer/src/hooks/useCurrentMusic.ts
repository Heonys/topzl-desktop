import { useAtom, useAtomValue } from "jotai";
import {
  currentMusicAtom,
  currentPlayerStateAtom,
  currentProgressAtom,
  mediaSourceAtom,
} from "@/atom";

const useCurrentMusic = () => {
  const [currentItem, setCurrentItem] = useAtom(currentMusicAtom);
  const asyncMediaSource = useAtomValue(mediaSourceAtom);
  const playerState = useAtomValue(currentPlayerStateAtom);
  const currentProgress = useAtomValue(currentProgressAtom);

  return {
    currentItem,
    setCurrentItem,
    asyncMediaSource,
    playerState,
    currentProgress,
  };
};

export default useCurrentMusic;
