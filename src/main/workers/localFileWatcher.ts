import * as Comlink from "comlink";
import nodeEndpoint from "comlink/dist/umd/node-adapter";
import * as chokidar from "chokidar";
// import fs from "fs-extra";
import { parseFile } from "music-metadata";
// import debounce from "lodash.debounce";
import { parentPort } from "worker_threads";
// import { supportLocalAudioType } from "@shared/constant";
import { getFilesInDirectory } from "./common";

if (!parentPort) {
  throw new Error("InvalidWorker");
}

export class LocalFileWatcher {
  public watcher!: chokidar.FSWatcher;

  async setup(initPath: string[] = []) {
    this.watcher = chokidar.watch(initPath, {
      depth: 10,
      persistent: true,
      ignorePermissionErrors: true,
    });

    const files = await getFilesInDirectory(initPath[0]);
    const metadata = await parseFile(files[0]);

    return metadata;

    // this.watcher.on("add", async (path, stat) => {
    //   if (stat?.isFile() && supportLocalAudioType.some((post) => path.endsWith(post))) {
    //     // path 파싱
    //     // 파일 경로로 부터 메타데이터 추출 (extract )
    //     // music-metadata
    //   }
    // });

    // this.watcher.on("unlink", () => {
    //   //
    // });
  }
  changePath() {}
}

Comlink.expose(new LocalFileWatcher(), nodeEndpoint(parentPort));
