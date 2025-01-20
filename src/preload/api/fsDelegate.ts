import fs from "fs/promises";
import { ipcRendererSend } from "../ipcRenderer";

async function readFile(filePath: string) {
  return fs.readFile(filePath);
}

function openFolder(path: string) {
  return ipcRendererSend("open-folder", path);
}

export const fsDelegate = {
  readFile,
  openFolder,
} satisfies Window["fs"];
