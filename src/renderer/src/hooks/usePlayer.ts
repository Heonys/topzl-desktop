import { useAtom, useAtomValue } from "jotai";
import { RepeatMode } from "@shared/plugin/type";
import {
  currentPlayerStateAtom,
  currentProgressAtom,
  currentVolumeAtom,
  currentSpeedAtom,
  currentRepeatModeAtom,
  currentShuffleModeAtom,
} from "@/atom";

export const usePlayer = () => {
  const playerState = useAtomValue(currentPlayerStateAtom);
  const currentProgress = useAtomValue(currentProgressAtom);
  const volume = useAtomValue(currentVolumeAtom);
  const speed = useAtomValue(currentSpeedAtom);

  const [repeatMode, setRepeatMode] = useAtom(currentRepeatModeAtom);
  const [shuffleMode, setSuffleMode] = useAtom(currentShuffleModeAtom);

  const toggleRepeatMode = () => {
    let nextRepeatMode = repeatMode;
    switch (nextRepeatMode) {
      case RepeatMode.Queue: {
        nextRepeatMode = RepeatMode.Loop;
        break;
      }
      case RepeatMode.Loop: {
        nextRepeatMode = RepeatMode.None;
        break;
      }
      case RepeatMode.None: {
        nextRepeatMode = RepeatMode.Queue;
        break;
      }
    }
    setRepeatMode(nextRepeatMode);
  };

  const toggleShuffleMode = () => {
    setSuffleMode((prev) => !prev);
  };

  return {
    playerState,
    currentProgress,
    volume,
    speed,
    repeatMode,
    toggleRepeatMode,
    shuffleMode,
    toggleShuffleMode,
  };
};
