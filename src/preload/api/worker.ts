import { ipcRendererOn, ipcRendererSend } from "../ipcRenderer";

function setupWatcher() {
  ipcRendererSend("worker-setup-watcher");
}

function changeWorkerPath(addPaths: string[], removePaths: string[]) {
  ipcRendererSend("worker-change-paths", [addPaths, removePaths]);
}

function onAddedItems(callback: (items: IpcEvents.Main["sync-watch-add"]) => void) {
  ipcRendererOn("sync-watch-add", (_, items) => {
    callback(items);
  });
}

function onRemovedPath(callback: (items: IpcEvents.Main["sync-watch-remove"]) => void) {
  ipcRendererOn("sync-watch-remove", (_, paths) => {
    callback(paths);
  });
}

export const worker = {
  setupWatcher,
  changeWorkerPath,
  onAddedItems,
  onRemovedPath,
} satisfies Window["worker"];
