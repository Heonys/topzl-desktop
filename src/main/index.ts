import { app, BrowserWindow } from "electron";
import { createMainWindow, getMainWindow, showMainWindow } from "@/window/mainWindow";
import { setupIpcMain } from "@/ipc/setup";
import { setupI18n } from "@shared/i18n/main";
import { setupTray } from "@/tray";
import { getAppConfigPathSync, setupMainConfig, setAppConfigPath } from "@shared/config/main";
import { setupGlobalShortcut, handleUrlScheme, setupPlugin, setupGlobalContext } from "@/core";
import { isDev } from "@/utils/common";
import { setupWorker } from "@/workers/setupWorker";

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

if (isDev) {
  app.setAsDefaultProtocolClient("topzl", process.execPath, [app.getAppPath()]);
} else {
  app.setAsDefaultProtocolClient("topzl");
}

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on("second-instance", (event, commandLine) => {
    if (getMainWindow()) {
      showMainWindow();
    }
    if (process.platform !== "darwin") {
      handleUrlScheme(commandLine.pop());
    }
  });
}

app.on("open-url", (evnet, url) => {
  handleUrlScheme(url);
});

app.whenReady().then(async () => {
  await Promise.allSettled([setupMainConfig(), setupPlugin()]);

  setupI18n({
    defaultLang: () => {
      return getAppConfigPathSync("common.language");
    },
    onChange: (newlang) => {
      setAppConfigPath("common.language", newlang);
    },
  });
  setupGlobalShortcut();
  setupTray();
  createMainWindow();
  setupIpcMain();
  setupGlobalContext();
  setupWorker();
});
