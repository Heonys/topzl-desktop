import { Worker } from "node:worker_threads";
import LocalFileWatcher from "./localFileWatcher?modulePath";
import Downloader from "./downloader?modulePath";

const workerPathMap = {
  ["local-file-watcher"]: LocalFileWatcher,
  ["downloader"]: Downloader,
} as const;

export function setupWorker() {
  const worker = new Worker(workerPathMap["local-file-watcher"]);
  worker.on("message", (message) => {
    console.log(message);
  });
  worker.postMessage("world");

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
