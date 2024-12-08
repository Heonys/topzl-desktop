import { app, BrowserWindow } from "electron";
import { createMainWindow, getMainWindow, showMainWindow } from "@/window/mainWindow";
import { setupIpcMain } from "@/ipc/setup";
import { setupI18n } from "@shared/i18n/main";
import { setupTray } from "@/tray";
import { getAppConfigPathSync, setupMainConfig, setAppConfigPath } from "@shared/config/main";
import { setupGlobalShortcut } from "@/core/globalShortcut";

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on("second-instance", (event, commandLine) => {
    if (getMainWindow()) {
      showMainWindow();
    }
    /*
      setAsDefaultProtocolClient() 사용할때
      URL스킴을 제공하고 그에대한 상호작용할때 사용
    */
    console.log(commandLine);
  });
}

app.whenReady().then(async () => {
  await Promise.allSettled([setupMainConfig()]);

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
});
