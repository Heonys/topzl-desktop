import { ipcRendererSend } from "../ipcRenderer";

function setupWatcher() {
  ipcRendererSend("worker-setup-watcher");
}

function changeWorkerPath(addPaths: string[], removePaths: string[]) {
  ipcRendererSend("worker-change-paths", [addPaths, removePaths]);
}

function onAdd(fn: (...args: any) => void) {
  ipcRendererSend("worker-on-add", fn);
}

function onRemove(fn: (...args: any) => void) {
  ipcRendererSend("worker-on-remove", fn);
}

export const worker = {
  setupWatcher,
  changeWorkerPath,
  onAdd,
  onRemove,
} satisfies Window["worker"];
