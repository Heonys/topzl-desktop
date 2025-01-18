import * as Comlink from "comlink";
import nodeEndpoint from "comlink/dist/umd/node-adapter";
// import fs from "fs-extra";
import { Readable } from "node:stream";
import { parentPort } from "node:worker_threads";
// import { DownloadState } from "@shared/constant";

if (!parentPort) {
  throw new Error("InvalidWorker");
}

export class Downloader {
  async downloadFile(mediaSource: string, filePath: string) {
    const res = await fetch(mediaSource);
    const readableStream = new Readable();
  }
}

Comlink.expose(new Downloader(), nodeEndpoint(parentPort));
