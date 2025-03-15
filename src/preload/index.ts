import { contextBridge, ipcRenderer } from "electron";
import {
  i18n,
  appConfig,
  shortcut,
  plugin,
  notification,
  common,
  worker,
  fsDelegate,
  messagePort,
} from "./api";

if (!process.contextIsolated) {
  throw new Error("contextIsolation must be enabled in the BrowserWindow");
}
ipcRenderer.setMaxListeners(30);

try {
  contextBridge.exposeInMainWorld("common", common);
  contextBridge.exposeInMainWorld("i18n", i18n);
  contextBridge.exposeInMainWorld("appConfig", appConfig);
  contextBridge.exposeInMainWorld("shortcut", shortcut);
  contextBridge.exposeInMainWorld("plugin", plugin);
  contextBridge.exposeInMainWorld("notification", notification);
  contextBridge.exposeInMainWorld("worker", worker);
  contextBridge.exposeInMainWorld("fs", fsDelegate);
  contextBridge.exposeInMainWorld("messagePort", messagePort);
} catch (error) {
  console.error(error);
}
