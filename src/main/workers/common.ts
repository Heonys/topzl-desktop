import { parseFile, IPicture } from "music-metadata";
import CryptoJS from "crypto-js";
// import fs from "fs-extra";
import type { MusicItem } from "@shared/plugin/type";
import url from "node:url";
import path from "node:path";

export async function extractMusicItem(filePath: string): Promise<MusicItem> {
  const hash = CryptoJS.MD5(filePath).toString();

  // const fileBuffer = await fs.readFile(filePath);
  // console.log("@@@", fileBuffer);

  /*
    const blob = new Blob([fileBuffer], { type: 'audio/mpeg' });
  const blobUrl = URL.createObjectURL(blob);
  */

  try {
    const metadata = await parseFile(filePath);
    const common = metadata.common;
    return {
      id: hash,
      title: common.title ?? path.parse(filePath).name,
      artist: common.artist ?? "Unknown",
      album: common.album ?? "Unknown",
      duration: metadata.format.duration ?? 0,
      artwork: common.picture?.[0] ? toBase64Image(common.picture[0]) : "",
      url: ensureFileURL(filePath),
      localPath: filePath,
    };
  } catch {
    return {
      id: hash,
      title: path.parse(filePath).name,
      artist: "Unknown",
      album: "Unknown",
      duration: 0,
      artwork: "",
      url: ensureFileURL(filePath),
      localPath: filePath,
    };
  }
}

export function ensureFileURL(filePath: string) {
  return filePath.startsWith("file:") ? filePath : url.pathToFileURL(filePath).toString();
}

function toBase64Image(picture: IPicture) {
  return `data:${picture.format};base64,${picture.data.toString("base64")}`;
}
