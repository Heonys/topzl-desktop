import * as Comlink from "comlink";
import nodeEndpoint from "comlink/dist/umd/node-adapter";
import fs from "fs-extra";
import { rimraf } from "rimraf";
import throttle from "lodash.throttle";
import { Readable } from "node:stream";
import type { ReadableStream } from "node:stream/web";
import { parentPort } from "node:worker_threads";
import { DownloadProgress, DownloadState } from "@shared/constant";

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
  state: DownloadState = DownloadState.NONE;

  onChange(onChangeFn: onChangeFn) {
    this._onChange = onChangeFn;
  }

  async downloadFile(id: string, mediaSource: string, filePath: string) {
    const response = await fetch(mediaSource);
    const webStream = response.body as ReadableStream;
    const total = +response.headers.get("content-length")!;
    this.state = DownloadState.LOADING;

    try {
      const nodeReadStream = this.toReadStream(webStream, {
        onRead: throttle((current) => {
          if (this.state !== DownloadState.LOADING) return;
          this.state = DownloadState.LOADING;
          this._onChange({ id, state: this.state, current, total });
        }, 100),
        onError: (e) => {
          this.state = DownloadState.ERROR;
          this._onChange({ id, state: this.state, message: e.message });
        },
      });
      const writeStream = fs.createWriteStream(filePath);
      const downloadStream = nodeReadStream.pipe(writeStream);

      downloadStream.on("close", () => {
        this.state = DownloadState.DONE;
        this._onChange({ id, state: this.state, current: total, total });
      });

      downloadStream.on("error", (e) => {
        this.state = DownloadState.ERROR;
        this._onChange({ id, state: this.state, message: e.message });
        this.removeFile(filePath);
      });
    } catch {
      this.removeFile(filePath);
    }
  }

  private toReadStream(webStream: ReadableStream, options: StreamOptions) {
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
        return;
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
