import { ipcRendererInvoke, ipcRendererOn } from "../ipcRenderer";
import type { AppConfigKeyPath, AppConfigKeyPathValue, AppConfig } from "@shared/config/type";

function getAppConfig() {
  return ipcRendererInvoke("get-app-config");
}
function getAppConfigPath(path: AppConfigKeyPath) {
  return ipcRendererInvoke("get-app-config-path", path);
}

function setAppConfig(config: AppConfig) {
  return ipcRendererInvoke("set-app-config", config);
}
function setAppConfigPath<T extends AppConfigKeyPath>({
  keyPath,
  value,
}: {
  keyPath: T;
  value: AppConfigKeyPathValue<T>;
}) {
  return ipcRendererInvoke("set-app-config-path", { keyPath, value });
}

function syncAppConfig(callback: (config: IpcEvents.Main["sync-app-config"]) => void) {
  ipcRendererOn("sync-app-config", (event, config) => {
    callback(config);
  });
}

export const appConfig = {
  getAppConfig,
  getAppConfigPath,
  setAppConfig,
  setAppConfigPath,
  syncAppConfig,
} satisfies Window["appConfig"];
