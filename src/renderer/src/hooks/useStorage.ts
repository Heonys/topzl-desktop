import { MusicItem } from "@shared/plugin/type";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";

export type StorageTypes = {
  currentMusic: MusicItem | null;
  currentProgress: number;
  repeatMode: string;
  volume: number;
  speed: number;
};

const storageAtom = atom<StorageTypes>({
  currentMusic: null,
  currentProgress: 0,
  repeatMode: "queue-repeat",
  volume: 1,
  speed: 1,
});

export function useStorage<T extends keyof StorageTypes>() {
  const [storage, _setStorage] = useAtom<StorageTypes>(storageAtom);

  const updateStorage = (key: T, value: StorageTypes[T]) => {
    _setStorage((prev) => {
      const newStorage = { ...prev, [key]: value };
      localStorage.setItem("user-preference", JSON.stringify(newStorage));
      return newStorage;
    });
  };

  useEffect(() => {
    const userPreference = localStorage.getItem("user-preference");
    if (userPreference) {
      _setStorage(JSON.parse(userPreference));
    } else {
      localStorage.setItem("user-preference", JSON.stringify(storage));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("user-preference", JSON.stringify(storage));
  }, [storage]);

  return {
    storage,
    updateStorage,
  };
}
