import fs from "fs/promises";
import { ipcRendererSend } from "../ipcRenderer";
import { webUtils } from "electron";

async function readFile(filePath: string) {
  return fs.readFile(filePath);
}

async function isFile(path: string) {
  const stat = await fs.stat(path);
  return stat.isFile();
}

function openFolder(path: string) {
  return ipcRendererSend("open-folder", path);
}

function getFilePath(file: File) {
  return webUtils.getPathForFile(file);
}

export const fsDelegate = {
  readFile,
  isFile,
  openFolder,
  getFilePath,
} satisfies Window["fs"];
