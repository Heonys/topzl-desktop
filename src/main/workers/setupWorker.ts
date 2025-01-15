import * as Comlink from "comlink";
import nodeEndpoint from "comlink/dist/umd/node-adapter";
import { Worker } from "node:worker_threads";
import type { LocalFileWatcher } from "./localFileWatcher";
import WatcherPath from "./localFileWatcher?modulePath";
import DownloaderPath from "./downloader?modulePath";
import { ipcMainOn } from "@/ipc/main";

const workerPathMap = {
  ["local-file-watcher"]: WatcherPath,
  ["downloader"]: DownloaderPath,
} as const;

export function setupWorker() {
  setupFileWatcher();
  setupDownloader();
}

async function setupFileWatcher() {
  const worker = new Worker(workerPathMap["local-file-watcher"]);
  const watcher = Comlink.wrap<LocalFileWatcher>(nodeEndpoint(worker));

  ipcMainOn("worker-setup-watcher", () => {
    watcher.setup();
  });
  ipcMainOn("worker-change-paths", (paths) => {
    watcher.changePath(...paths);
  });
  ipcMainOn("worker-on-add", (fn) => {
    watcher.onAdd(fn);
  });
  ipcMainOn("worker-on-remove", (fn) => {
    watcher.onRemove(fn);
  });
}

//TODO: Downloader Worker
async function setupDownloader() {
  // ipcOn -> downloadFile
}
