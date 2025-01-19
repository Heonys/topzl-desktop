import * as Comlink from "comlink";
import nodeEndpoint from "comlink/dist/umd/node-adapter";
import fs from "fs-extra";
import { rimraf } from "rimraf";
import { Readable } from "node:stream";
import type { ReadableStream } from "node:stream/web";
import { parentPort } from "node:worker_threads";
import type { DownloadProgress } from "@shared/constant";

if (!parentPort) {
  throw new Error("InvalidWorker");
}

type StreamOptions = {
  onRead?: (size: number) => void;
  onDone?: () => void;
  onError?: (e: Error) => void;
};

type onChangeFn = (progerss: DownloadProgress) => void;

export class Downloader {
  private _onChange!: onChangeFn;

  setupProcess(onChange: onChangeFn) {
    this._onChange = onChange;
  }

  async downloadFile(mediaSource: string, filePath: string) {
    const response = await fetch(mediaSource);
    const webStream = response.body as ReadableStream;

    try {
      const nodeReadStream = this.toCustomReadStream(webStream, {});
      const writeStream = fs.createWriteStream(filePath);
      const downloadStream = nodeReadStream.pipe(writeStream);

      downloadStream.on("close", () => {
        //
      });

      downloadStream.on("error", () => {
        this.removeFile(filePath);
      });
    } catch {
      this.removeFile(filePath);
    }
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

  private async removeFile(filePath: string) {
    try {
      const stat = await fs.stat(filePath);
      if (stat.isFile()) rimraf(filePath);
      return true;
    } catch {
      return false;
    }
  }
}

Comlink.expose(new Downloader(), nodeEndpoint(parentPort));
