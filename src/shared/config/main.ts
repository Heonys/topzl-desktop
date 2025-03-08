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
    _configPath = path.join(app.getPath("userData"), "config.json");
  }
  return _configPath;
}

async function checkPath() {
  try {
    await fs.readJson(getConfigPath());
  } catch {
    await fs.remove(getConfigPath());

    // TODO: 빈객체로 하고 default config에서 초기값 지정
    const temp: AppConfig = {
      general: {
        autoStartOnBoot: false,
        language: "Korean",
        theme: "light",
        closeBehavior: "minimize",
        maxHistoryLength: 7,
        notification: false,
      },
      shortcut: {
        enableGlobal: false,
        enableLocal: true,
        keymap: {
          "play/pause": {
            local: ["Space"],
            global: [],
          },
          "seek-forward": {
            local: ["→"],
            global: [],
          },
          "seek-backward": {
            local: ["←"],
            global: [],
          },
          "volume-up": {
            local: ["↑"],
            global: [],
          },
          "volume-down": {
            local: ["↓"],
            global: [],
          },
          "skip-next": {
            local: ["Ctrl", "→"],
            global: [],
          },
          "skip-previous": {
            local: ["Ctrl", "←"],
            global: [],
          },
          search: {
            local: ["Ctrl", "K"],
            global: [],
          },
          quit: {
            local: ["Ctrl", "W"],
            global: [],
          },
        },
      },
      download: {
        concurrency: 5,
        path: app.getPath("downloads"),
      },
      playback: {
        audioOutputDevice: null,
        playError: "skip-next",
        previousTrackBehavior: "under-3",
      },
      lyric: {
        enable: true,
        searchMethod: "advanced",
      },
    };

    await fs.writeJson(getConfigPath(), temp, { spaces: 2 });
    cacheConfig = temp;
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
    await fs.writeJson(getConfigPath(), newConfig, { spaces: 2 });
    cacheConfig = newConfig;
    ipcMainSend("sync-app-config", mainWindow, newConfig);
    return true;
  } catch {
    ipcMainSend("sync-app-config", mainWindow, cacheConfig);
    return false;
  }
}

export async function getAppConfigPath<T extends AppConfigKeyPath>(
  keypath: T,
): Promise<AppConfigKeyPathValue<T>> {
  const config = await getAppConfig();
  return objectPath.get(config, keypath) ?? defaultAppConfig[keypath];
}

export function getAppConfigPathSync<T extends AppConfigKeyPath>(
  keypath: T,
): AppConfigKeyPathValue<T> {
  return objectPath.get(cacheConfig, keypath) ?? defaultAppConfig[keypath];
}

export async function setAppConfigPath<T extends AppConfigKeyPath>(
  keypath: T,
  value: AppConfigKeyPathValue<T>,
): Promise<boolean> {
  const config = await getAppConfig();
  objectPath.set(config, keypath, value);
  return setAppConfig(config);
}

export async function setupMainConfig() {
  await checkPath();
  await getAppConfig();

  ipcMainHandle("get-app-config", () => {
    return getAppConfig();
  });

  ipcMainHandle("set-app-config", (config) => {
    return setAppConfig(config);
  });

  ipcMainHandle("get-app-config-path", (path) => {
    return getAppConfigPath(path);
  });

  ipcMainHandle("set-app-config-path", ({ keyPath, value }) => {
    return setAppConfigPath(keyPath, value);
  });
}
