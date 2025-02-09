import { getDefaultStore } from "jotai";
import { supportLocalAudioType } from "@shared/constant";
import { currentMusicAtom, playListAtom } from "@/atom";

const store = getDefaultStore();

export function dropHandler() {
  const handler = async (event: DragEvent) => {
    event.preventDefault();
    const files = event.dataTransfer!.files;

    for (const file of files) {
      const filePath = window.fs.getFilePath(file);
      const isFile = await window.fs.isFile(filePath);
      if (isFile && supportLocalAudioType.some((post) => filePath.endsWith(post))) {
        const musicItem = await window.common.extractMetadata(filePath);
        store.set(currentMusicAtom, musicItem);
        store.set(playListAtom, (prev) => [...prev, musicItem]);
      }
    }
  };

  document.addEventListener("drop", handler);
  document.addEventListener("dragover", (e) => e.preventDefault());
}
