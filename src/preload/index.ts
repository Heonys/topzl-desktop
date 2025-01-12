import { contextBridge } from "electron";
import { i18n, appConfig, shortcut, plugin, notification, common } from "./api";

if (!process.contextIsolated) {
  throw new Error("contextIsolation must be enabled in the BrowserWindow");
}

try {
  contextBridge.exposeInMainWorld("common", common);
  contextBridge.exposeInMainWorld("i18n", i18n);
  contextBridge.exposeInMainWorld("appConfig", appConfig);
  contextBridge.exposeInMainWorld("shortcut", shortcut);
  contextBridge.exposeInMainWorld("plugin", plugin);
  contextBridge.exposeInMainWorld("notification", notification);
} catch (error) {
  console.error(error);
}
