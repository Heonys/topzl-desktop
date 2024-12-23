import { useAtom, useAtomValue } from "jotai";
import {
  currentMusicAtom,
  currentPlayerStateAtom,
  currentProgressAtom,
  currentRepeatModeAtom,
  currentSpeedAtom,
  currentVolumeAtom,
  mediaSourceAtom,
} from "@/atom";
import { RepeatMode } from "@shared/plugin/type";

const usePlayer = () => {
  const asyncMediaSource = useAtomValue(mediaSourceAtom);
  const playerState = useAtomValue(currentPlayerStateAtom);
  const currentProgress = useAtomValue(currentProgressAtom);
  const volume = useAtomValue(currentVolumeAtom);
  const speed = useAtomValue(currentSpeedAtom);

  const [currentItem, setCurrentItem] = useAtom(currentMusicAtom);
  const [repeatMode, setRepeatMode] = useAtom(currentRepeatModeAtom);

  const toggleRepeatMode = () => {
    let nextRepeatMode = repeatMode;
    switch (nextRepeatMode) {
      case RepeatMode.Queue: {
        nextRepeatMode = RepeatMode.Loop;
        break;
      }
      case RepeatMode.Loop: {
        nextRepeatMode = RepeatMode.Shuffle;
        break;
      }
      case RepeatMode.Shuffle: {
        nextRepeatMode = RepeatMode.Queue;
        break;
      }
    }
    setRepeatMode(nextRepeatMode);
  };

  return {
    currentItem,
    setCurrentItem,
    asyncMediaSource,
    playerState,
    currentProgress,
    volume,
    speed,
    repeatMode,
    toggleRepeatMode,
  };
};

export default usePlayer;
