import * as Comlink from "comlink";
import nodeEndpoint from "comlink/dist/umd/node-adapter";
import fs from "fs-extra";
import { Readable } from "node:stream";
import type { ReadableStream } from "node:stream/web";
import { parentPort } from "node:worker_threads";
// import { DownloadState } from "@shared/constant";

if (!parentPort) {
  throw new Error("InvalidWorker");
}

type StreamOptions = {
  onRead?: (size: number) => void;
  onDone?: () => void;
  onError?: (e: Error) => void;
};

export class Downloader {
  async downloadFile(mediaSource: string, filePath: string, options: StreamOptions) {
    const response = await fetch(mediaSource);
    const webStream = response.body as ReadableStream;

    const nodeReadStream = this.toCustomReadStream(webStream, options);
    const writeStream = fs.createWriteStream(filePath);
    nodeReadStream.pipe(writeStream);
  }

  private toReadStream(webStream: ReadableStream) {
    return Readable.fromWeb(webStream);
  }

  private toCustomReadStream(webStream: ReadableStream, options: StreamOptions) {
    const reader = webStream.getReader();
    const rs = new Readable();
    const { onRead, onDone, onError } = options;
    let size = 0;

    rs._read = async () => {
      const result = await reader.read();
      if (!result.done) {
        rs.push(Buffer.from(result.value));
        size += result.value.byteLength;
        onRead?.(size);
      } else {
        rs.push(null);
        onDone?.();
      }
    };
    rs.on("error", (e) => onError?.(e));
    return rs;
  }
}

Comlink.expose(new Downloader(), nodeEndpoint(parentPort));
