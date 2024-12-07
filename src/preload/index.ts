import { contextBridge, ipcRenderer } from "electron";
import { i18n, appConfig } from "./api";

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
} catch (error) {
  console.error(error);
}
