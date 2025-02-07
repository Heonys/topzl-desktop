import { useEffect } from "react";
import { useAtom } from "jotai";
import { storageAtom, LocalStorageType, STORAGE_KEY, defaultStorage } from "@/db/store";

export function useStorage() {
  const [storage, _setStorage] = useAtom<LocalStorageType>(storageAtom);

  const getPreference = <T extends keyof LocalStorageType>(key: T) => {
    if (storage) return storage[key];
    return null;
  };

  const updateStorage = <T extends keyof LocalStorageType>(key: T, value: LocalStorageType[T]) => {
    _setStorage((prev) => {
      const newStorage = { ...prev, [key]: value };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newStorage));
      return newStorage;
    });
  };

  useEffect(() => {
    const userPreference = localStorage.getItem(STORAGE_KEY);
    if (userPreference) {
      _setStorage(JSON.parse(userPreference));
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultStorage));
      _setStorage(defaultStorage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
  }, [storage]);

  return {
    getPreference,
    updateStorage,
  };
}
