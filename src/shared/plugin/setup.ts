import { toast } from "react-toastify";
import { getDefaultStore } from "jotai";
import shuffle from "lodash.shuffle";
import { playerEventEmitter, localEventEmitter } from "./eventEmitter";
import {
  currentProgressAtom,
  currentVolumeAtom,
  currentSpeedAtom,
  initProgress,
  currentPlayerStateAtom,
  getCurrentListIndex,
  playListAtom,
  currentMusicAtom,
  currentRepeatModeAtom,
  currentShuffleModeAtom,
} from "src/renderer/src/atom";
import { PlayerState, RepeatMode } from "./type";
import trackPlayer from "./trackPlayer";

const store = getDefaultStore();

export async function setupPlayer() {
  setupEvent();
  setupShortcuEvent();

  window.plugin.onErrorHandler(() => {
    toast.error("재생 URL을 찾을 수 없습니다");
  });

  window.common.onTrayCommand((command) => {
    switch (command) {
      case "TogglePlayAndPause":
        if (trackPlayer.isPlaying()) trackPlayer.pause();
        else trackPlayer.play();
        return;
      case "Skip-Next":
        return trackPlayer.skipToNext();
      case "Skip-Previous":
        return trackPlayer.skipToPrev();
      case "Repeat-None":
        return store.set(currentRepeatModeAtom, RepeatMode.None);
      case "Repeat-Queue":
        return store.set(currentRepeatModeAtom, RepeatMode.Queue);
      case "Repeat-Loop":
        return store.set(currentRepeatModeAtom, RepeatMode.Loop);
      case "Shuffle-On":
        return store.set(currentShuffleModeAtom, true);
      case "Shuffle-Off":
        return store.set(currentShuffleModeAtom, false);
    }
  });
}

function setupEvent() {
  playerEventEmitter.on("play-end", () => {
    store.set(currentProgressAtom, initProgress);

    const playList = store.get(playListAtom);
    const currentIndex = store.get(getCurrentListIndex);

    const repeadMode = store.get(currentRepeatModeAtom);
    switch (repeadMode) {
      case RepeatMode.None:
        trackPlayer.skipToNext();
        break;
      case RepeatMode.Queue:
        if (playList.length - 1 === currentIndex) {
          store.set(currentMusicAtom, playList[0]);
        } else {
          trackPlayer.skipToNext();
        }
        break;
      case RepeatMode.Loop:
        trackPlayer.play();
        break;
    }
  });

  playerEventEmitter.on("time-updated", (playload) => {
    store.set(currentProgressAtom, playload);
  });

  playerEventEmitter.on("speed-changed", (playload) => {
    store.set(currentSpeedAtom, playload);
  });

  playerEventEmitter.on("volume-changed", (playload) => {
    store.set(currentVolumeAtom, playload);
  });

  playerEventEmitter.on("play-state-changed", (payload) => {
    store.set(currentPlayerStateAtom, payload);
  });

  playerEventEmitter.on("music-changed", (payload) => {
    console.log("music-changed ::", payload);
  });

  playerEventEmitter.on("play-back-error", (payload) => {
    console.error(payload);
  });

  playerEventEmitter.on("play-prev", () => {
    const currentIndex = store.get(getCurrentListIndex);
    if (currentIndex > 0) {
      const nextTrack = store.get(playListAtom)[currentIndex - 1];
      store.set(currentMusicAtom, nextTrack);
      window.messagePort.sendMessage({ type: "data", data: nextTrack });
    }
  });

  playerEventEmitter.on("play-next", () => {
    const playList = store.get(playListAtom);
    const currentIndex = store.get(getCurrentListIndex);
    const currentShuffleMode = store.get(currentShuffleModeAtom);
    const repeadMode = store.get(currentRepeatModeAtom);

    if (currentIndex < playList.length - 1) {
      if (currentShuffleMode) {
        const beforeList = playList.slice(0, currentIndex + 1);
        const afterList = playList.slice(currentIndex + 1);
        const newList = [...beforeList, ...shuffle(afterList)];
        store.set(playListAtom, newList);
        store.set(currentMusicAtom, newList[currentIndex + 1]);
        window.messagePort.sendMessage({ type: "data", data: newList[currentIndex + 1] });
      } else {
        const nextTrack = playList[currentIndex + 1];
        store.set(currentMusicAtom, nextTrack);
        window.messagePort.sendMessage({ type: "data", data: nextTrack });
      }
    } else {
      if (repeadMode === RepeatMode.Queue) {
        store.set(currentMusicAtom, playList[0]);
      }
    }
  });
}

function setupShortcuEvent() {
  const audioElement = trackPlayer.getAudioElement();

  localEventEmitter.on("play/pause", () => {
    const isPlaying = trackPlayer.getPlayerState() === PlayerState.Playing;
    if (isPlaying) {
      trackPlayer.pause();
    } else {
      trackPlayer.play();
    }
  });

  localEventEmitter.on("skip-previous", () => {
    playerEventEmitter.emit("play-prev");
  });

  localEventEmitter.on("skip-next", () => {
    playerEventEmitter.emit("play-next");
  });

  localEventEmitter.on("volume-up", () => {
    const volume = audioElement.volume;
    trackPlayer.setVolume(Math.min(volume + 0.025, 1));
  });

  localEventEmitter.on("volume-down", () => {
    const volume = audioElement.volume;
    trackPlayer.setVolume(Math.max(volume - 0.025, 0));
  });

  localEventEmitter.on("seek-forward", () => {
    trackPlayer.seekForward();
  });

  localEventEmitter.on("seek-backward", () => {
    trackPlayer.seekBackward();
  });

  localEventEmitter.on("quit", () => {
    window.common.sendFrameAction("QUIT");
  });
}
