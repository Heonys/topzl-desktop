import { contextBridge, ipcRenderer } from "electron";

if (!process.contextIsolated) {
  throw new Error("contextIsolation must be enabled in the BrowserWindow");
}

const api = {
  sendFrameAction: (payload) => ipcRenderer.send("window-frame-action", payload),
} satisfies Window["api"];

try {
  contextBridge.exposeInMainWorld("api", api);
} catch (error) {
  console.error(error);
}
