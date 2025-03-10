import { getDefaultStore } from "jotai";
import { localMusicAtom } from "@/atom";

const store = getDefaultStore();

export function setupWatcher() {
  window.worker.setupWatcher();

  window.worker.onAddedItems((items) => {
    store.set(localMusicAtom, (prev) => {
      const prevIds = new Set(prev.map((it) => it.id));
      const newItems = items.filter((item) => !prevIds.has(item.id));
      return [...prev, ...newItems];
    });
  });

  window.worker.onRemovedPath((paths) => {
    store.set(localMusicAtom, (prev) => {
      return prev.filter((it) => !paths.includes(it.localPath!));
    });
  });
}

export function setupDownloader() {
  window.worker.setupDownloadConfig(null);
}
