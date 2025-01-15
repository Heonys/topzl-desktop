import * as Comlink from "comlink";
import nodeEndpoint from "comlink/dist/umd/node-adapter";
import * as chokidar from "chokidar";
import debounce from "lodash.debounce";
import { parentPort } from "node:worker_threads";
import { supportLocalAudioType } from "@shared/constant";
import type { MusicItem } from "@shared/plugin/type";
import { extractMusicItem } from "./common";

if (!parentPort) {
  throw new Error("InvalidWorker");
}

export class LocalFileWatcher {
  private watcher!: chokidar.FSWatcher;
  private addedQueue: MusicItem[] = [];
  private removedQueue: string[] = [];

  private _onAdd?: (...args: any) => any;
  private _onRemove?: (...args: any) => any;

  async setup(initPath: string[] = []) {
    this.watcher = chokidar.watch(initPath, {
      depth: 10,
      persistent: true,
      ignorePermissionErrors: true,
    });

    this.watcher.on("add", async (path, stat) => {
      if (stat?.isFile() && supportLocalAudioType.some((post) => path.endsWith(post))) {
        const musicItem = await extractMusicItem(path);
        this.addedQueue.push(musicItem);
        this.debouncedOnAdd();
      }
    });

    this.watcher.on("unlink", (path) => {
      if (supportLocalAudioType.some((post) => path.endsWith(post))) {
        this.removedQueue.push(path);
        this.debouncedOnRemove();
      }
    });
  }

  changePath(addPaths: string[], removePaths: string[]) {
    if (addPaths.length > 0) this.watcher.add(addPaths);
    if (removePaths.length > 0) {
      this.watcher.unwatch(removePaths);
    }
  }

  onAdd(fn: (...args: any) => void) {
    this._onAdd = fn;
  }

  onRemove(fn: (...args: any) => void) {
    this._onRemove = fn;
  }

  private debouncedOnAdd = debounce(() => {
    const copiedQueue = [...this.addedQueue];
    this.addedQueue.length = 0;
    this._onAdd?.(copiedQueue);
  }, 500);

  private debouncedOnRemove = debounce(() => {
    const copiedQueue = [...this.removedQueue];
    this.removedQueue.length = 0;
    this._onRemove?.(copiedQueue);
  }, 500);
}

Comlink.expose(new LocalFileWatcher(), nodeEndpoint(parentPort));
