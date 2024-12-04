import { contextBridge, ipcRenderer } from "electron";
import { i18n } from "./i18n";

if (!process.contextIsolated) {
  throw new Error("contextIsolation must be enabled in the BrowserWindow");
}

const api = {
  sendFrameAction: (payload) => ipcRenderer.send("window-frame-action", payload),
} satisfies Window["api"];

try {
  contextBridge.exposeInMainWorld("api", api);
  contextBridge.exposeInMainWorld("i18n", i18n);
} catch (error) {
  console.error(error);
}
