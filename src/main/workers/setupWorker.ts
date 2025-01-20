import * as Comlink from "comlink";
import nodeEndpoint from "comlink/dist/umd/node-adapter";
import { Worker } from "node:worker_threads";
import type { LocalFileWatcher } from "./localFileWatcher";
import type { Downloader } from "./downloader";
import { ipcMainOn, ipcMainSendWebContents } from "@/ipc/main";
import WatcherPath from "./localFileWatcher?modulePath";
import DownloaderPath from "./downloader?modulePath";

const workerPathMap = {
  ["local-file-watcher"]: WatcherPath,
  ["downloader"]: DownloaderPath,
} as const;

export function setupWorker() {
  setupFileWatcher();
  setupDownloader();
}

function setupFileWatcher() {
  const worker = new Worker(workerPathMap["local-file-watcher"]);
  const watcher = Comlink.wrap<LocalFileWatcher>(nodeEndpoint(worker));

  ipcMainOn("worker-setup-watcher", (_, event) => {
    watcher.setup();
    worker.on("message", (message) => {
      switch (message.type) {
        case "add": {
          ipcMainSendWebContents("sync-watch-add", event.sender, message.value);
          break;
        }
        case "remove": {
          ipcMainSendWebContents("sync-watch-remove", event.sender, message.value);
          break;
        }
      }
    });
  });
  ipcMainOn("worker-change-paths", (paths) => {
    watcher.changePath(...paths);
  });
}

async function setupDownloader() {
  const worker = new Worker(workerPathMap["downloader"]);
  const watcher = Comlink.wrap<Downloader>(nodeEndpoint(worker));

  ipcMainOn("worker-setup-download", (config, event) => {
    watcher.onChange(
      Comlink.proxy((progerss) => {
        ipcMainSendWebContents("sync-download-status", event.sender, progerss);
      }),
    );
  });

  ipcMainOn("worker-download", (payload) => {
    watcher.downloadFile(...payload);
  });
}
