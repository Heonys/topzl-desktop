import type { IpcRendererEvent } from "electron";
import type { ShortcutKeys } from "@shared/config/type";
import { ipcRendererOn, ipcRenderOff } from "../ipcRenderer";

function setupNavigate(callback: (url: ShortcutKeys) => void) {
  const eventHandler = (event: IpcRendererEvent, url: ShortcutKeys) => {
    callback(url);
  };
  ipcRendererOn("global-shortcut-execute", eventHandler);
  return () => ipcRenderOff("global-shortcut-execute", eventHandler);
}

export const shortcut = {
  setupNavigate,
} satisfies Window["shortcut"];
