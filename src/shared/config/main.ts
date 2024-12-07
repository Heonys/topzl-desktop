import { app } from "electron";
import fs from "fs-extra";
import path from "node:path";
import type { AppConfig } from "./type";
import { getMainWindow } from "@/window/mainWindow";

let _configPath: string;
let cacheConfig: AppConfig;

function getConfigPath() {
  if (!_configPath) {
    _configPath = path.join(app.getPath("appData"), "config.json");
  }
  return _configPath;
}

async function checkConfigPath() {
  try {
    await fs.readJson(getConfigPath());
  } catch {
    await fs.remove(getConfigPath());
    await fs.writeJson(getConfigPath(), {});
    cacheConfig = {};
  }
}

export async function getAppConfig(): Promise<AppConfig> {
  if (cacheConfig) return cacheConfig;
  try {
    const config = await fs.readJson(getConfigPath());
    cacheConfig = config;
  } catch {
    const exists = await fs.pathExists(getConfigPath());
    if (exists) {
      fs.remove(getConfigPath());
    }
    await checkConfigPath();
  }
  return cacheConfig;
}

export async function setAppConfig() {
  const mainWindow = getMainWindow();
}

export async function setupConfig() {
  await checkConfigPath();
}
