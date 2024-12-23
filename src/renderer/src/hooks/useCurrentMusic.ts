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

  const [currentItem, setCurrentItem] = useAtom(currentMusicAtom);
  const [volume, setVolume] = useAtom(currentVolumeAtom);
  const [speed, setSpeed] = useAtom(currentSpeedAtom);
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
    setVolume,
    speed,
    setSpeed,
    repeatMode,
    toggleRepeatMode,
  };
};

export default usePlayer;
