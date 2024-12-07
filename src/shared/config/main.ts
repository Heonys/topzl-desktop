import { app } from "electron";
import objectPath from "object-path";
import fs from "fs-extra";
import path from "node:path";
import {
  defaultAppConfig,
  type AppConfig,
  type AppConfigKeyPath,
  type AppConfigKeyPathValue,
} from "./type";
import { getMainWindow } from "@/window/mainWindow";
import { ipcMainHandle, ipcMainSend } from "@/ipc/main";

let _configPath: string;
let cacheConfig: AppConfig;

function getConfigPath() {
  if (!_configPath) {
    _configPath = path.join(app.getPath("appData"), "config.json");
  }
  return _configPath;
}

async function checkPath() {
  try {
    await fs.readJson(getConfigPath());
  } catch {
    await fs.remove(getConfigPath());
    await fs.writeJson(getConfigPath(), {});
    cacheConfig = {};
  }
}

async function getAppConfig(): Promise<AppConfig> {
  if (cacheConfig) return cacheConfig;
  try {
    const config = await fs.readJson(getConfigPath());
    cacheConfig = config;
  } catch {
    const exists = await fs.pathExists(getConfigPath());
    if (exists) {
      fs.remove(getConfigPath());
    }
    await checkPath();
  }
  return cacheConfig;
}

async function setAppConfig(newConfig: AppConfig) {
  const mainWindow = getMainWindow();
  try {
    const jsonString = JSON.stringify(newConfig, undefined, 4);
    await fs.writeJson(getConfigPath(), jsonString);
    cacheConfig = newConfig;
    ipcMainSend("get-app-config", mainWindow, newConfig);
    return true;
  } catch {
    ipcMainSend("get-app-config", mainWindow, cacheConfig);
    return false;
  }
}

export async function getAppConfigPath<T extends AppConfigKeyPath>(
  keypath: T,
): Promise<AppConfigKeyPathValue<T> | undefined> {
  const config = await getAppConfig();
  return objectPath.get(config, keypath) ?? defaultAppConfig[keypath];
}

export function getAppConfigPathSync<T extends AppConfigKeyPath>(
  keypath: T,
): AppConfigKeyPathValue<T> | undefined {
  if (!cacheConfig) return undefined;
  return objectPath.get(cacheConfig, keypath) ?? defaultAppConfig[keypath];
}

export async function setAppConfigPath<T extends AppConfigKeyPath>(
  keypath: T,
  value: AppConfigKeyPathValue<T>,
): Promise<boolean> {
  const config = await getAppConfig();
  const newConfig = objectPath.set(config, keypath, value) as AppConfig;
  return setAppConfig(newConfig);
}

export async function setupConfig() {
  await checkPath();
  await getAppConfig();

  ipcMainHandle("get-app-config", () => {
    return getAppConfig();
  });

  ipcMainHandle("set-app-config", (config) => {
    return setAppConfig(config);
  });
}
