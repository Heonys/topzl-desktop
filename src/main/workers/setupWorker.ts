import * as Comlink from "comlink";
import nodeEndpoint from "comlink/dist/umd/node-adapter";
import { Worker } from "node:worker_threads";
import type { LocalFileWatcher } from "./localFileWatcher";
import WatcherPath from "./localFileWatcher?modulePath";
import DownloaderPath from "./downloader?modulePath";
import { ipcMainHandle } from "@/ipc/main";
// import { extractMusicItem } from "./common";

const workerPathMap = {
  ["local-file-watcher"]: WatcherPath,
  ["downloader"]: DownloaderPath,
} as const;

export async function setupWorker() {
  ipcMainHandle("worker-file-watcher", (filePath) => {
    const worker = new Worker(workerPathMap["local-file-watcher"]);
    const watcher = Comlink.wrap<LocalFileWatcher>(nodeEndpoint(worker));
    return watcher.setup(filePath);
  });

  /*
  TODO: Local Worker

  ipcOn -> setup watcher

  ipcOn -> change watcher path

  ipcOn -> add event handler

  ipcOn -> remove event handler
  */

  /*
  TODO: Downloader Worker

  ipcOn -> downloadFile
  */
}
