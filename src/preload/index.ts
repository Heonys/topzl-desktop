import { contextBridge } from "electron";

if (!process.contextIsolated) {
  throw new Error("contextIsolation must be enabled in the BrowserWindow");
}

try {
  contextBridge.exposeInMainWorld("electron", {
    get: () => console.log("test get"),
  });
} catch (error) {
  console.error(error);
}
