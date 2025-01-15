import { ipcRendererInvoke } from "../ipcRenderer";

function setupWatcher(filePath: string[]) {
  return ipcRendererInvoke("worker-file-watcher", filePath);
}

export const worker = {
  setupWatcher,
} satisfies Window["worker"];
