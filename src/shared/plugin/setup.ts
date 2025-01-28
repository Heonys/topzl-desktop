import { toast } from "react-toastify";
import { getDefaultStore } from "jotai";
import shuffle from "lodash.shuffle";
import playerEventEmitter from "./eventEmitter";
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
} from "../../renderer/src/atom";
import { RepeatMode } from "./type";
import trackPlayer from "./trackPlayer";

const store = getDefaultStore();

export async function setupPlayer() {
  // const deviceId = await navigator.mediaDevices.enumerateDevices();
  setupEvent();

  window.plugin.onErrorHandler(() => {
    toast.error("재생 URL을 찾을 수 없습니다");
  });

  // TODO: 스토리지에서 사용자 설정 가져와서 기존 설정으로 초기화
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
    }
  });

  playerEventEmitter.on("play-next", () => {
    const playList = store.get(playListAtom);
    const currentIndex = store.get(getCurrentListIndex);
    const currentShuffleMode = store.get(currentShuffleModeAtom);

    if (currentIndex < playList.length - 1) {
      if (currentShuffleMode) {
        const beforeList = playList.slice(0, currentIndex + 1);
        const afterList = playList.slice(currentIndex + 1);
        const newList = [...beforeList, ...shuffle(afterList)];
        store.set(playListAtom, newList);
        store.set(currentMusicAtom, newList[currentIndex + 1]);
      } else {
        const nextTrack = playList[currentIndex + 1];
        store.set(currentMusicAtom, nextTrack);
      }
    }
    // if (currentIndex < playList.length - 1) {
    //   const nextTrack = playList[currentIndex + 1];
    //   store.set(currentMusicAtom, nextTrack);
    // }
  });
}
