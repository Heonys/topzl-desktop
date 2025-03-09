import type { IpcRendererEvent } from "electron";
import type { ShortcutKeys } from "@shared/config/type";
import { ipcRendererOn, ipcRenderOff, ipcRendererSend } from "../ipcRenderer";

function onGlobal(callback: (url: ShortcutKeys) => void) {
  const eventHandler = (event: IpcRendererEvent, url: ShortcutKeys) => {
    callback(url);
  };
  ipcRendererOn("global-shortcut-execute", eventHandler);
  return () => ipcRenderOff("global-shortcut-execute", eventHandler);
}

function registerGlobal(payload: { keyType: ShortcutKeys; keymap: string[] }) {
  ipcRendererSend("register-global-shortcut", payload);
}

function unregisterGlobal(payload: { keyType: ShortcutKeys }) {
  ipcRendererSend("unregister-global-shortcut", payload);
}

export const shortcut = {
  onGlobal,
  registerGlobal,
  unregisterGlobal,
} satisfies Window["shortcut"];
