import { getDefaultStore } from "jotai";
import { localMusicAtom } from "src/renderer/src/atom";

const store = getDefaultStore();

export function setupWatcher() {
  window.worker.setupWatcher();

  window.worker.onAddedItems((items) => {
    console.log(items);

    store.set(localMusicAtom, (prev) => [...prev, ...items]);
  });

  window.worker.onRemovedPath((paths) => {
    store.set(localMusicAtom, (prev) => {
      return prev.filter((it) => !paths.includes(it.localPath!));
    });
  });
}
