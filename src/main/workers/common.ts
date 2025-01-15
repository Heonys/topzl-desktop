import * as mm from "music-metadata";
import fs from "fs-extra";
// import CryptoJS from "crypto-js";
import url from "node:url";
import path from "node:path";
// import type { MusicItem } from "@shared/plugin/type";

export async function extractMusicItem(filePath: string) {
  // const hash = CryptoJS.MD5(filePath).toString();

  const metadata = await mm.parseFile(filePath);
  console.log(metadata);

  return 22;
  // const jschardet = await import("jschardet");
}

export function ensureFileURL(filePath: string) {
  return filePath.startsWith("file:") ? filePath : url.pathToFileURL(filePath).toString();
}

export async function getFilesInDirectory(dirPath: string) {
  try {
    const files = await fs.readdir(dirPath);
    return files.map((file) => path.join(dirPath, file));
  } catch {
    throw new Error("Error reading directory");
  }
}
