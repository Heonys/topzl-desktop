import { toast } from "react-toastify";
import { getDefaultStore } from "jotai";
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
} from "../../renderer/src/atom";

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
    /*
     1. progress bar 상태 초기화
     2. 반복모드 종류에 따라서 현재 음악 다시 재생할지 재생목록의 음악 재생할지 확인
    */
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
    if (currentIndex < playList.length - 1) {
      const nextTrack = playList[currentIndex + 1];
      store.set(currentMusicAtom, nextTrack);
    }
  });
}
