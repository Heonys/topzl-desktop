import { contextBridge, ipcRenderer } from "electron";
import { i18n, appConfig, shortcut, plugin, notification } from "./api";

if (!process.contextIsolated) {
  throw new Error("contextIsolation must be enabled in the BrowserWindow");
}

const action = {
  sendFrameAction: (payload) => ipcRenderer.send("window-frame-action", payload),
} satisfies Window["action"];

try {
  contextBridge.exposeInMainWorld("action", action);
  contextBridge.exposeInMainWorld("i18n", i18n);
  contextBridge.exposeInMainWorld("appConfig", appConfig);
  contextBridge.exposeInMainWorld("shortcut", shortcut);
  contextBridge.exposeInMainWorld("plugin", plugin);
  contextBridge.exposeInMainWorld("notification", notification);
} catch (error) {
  console.error(error);
}
