import { BrowserWindow, dialog, shell, Notification, nativeImage } from "electron";
import fs from "fs-extra";
import path from "node:path";
import { getMainWindow } from "@/window/mainWindow";
import { ipcMainHandle, ipcMainOn } from "@/ipc/main";
import { getPipmodeWindow, showPipmodeWindow } from "@/window/pipmodeWindow";
import { extractMusicItem } from "@/workers/common";
import { getAppConfigPathSync } from "@shared/config/main";
import { getResourcePath } from "@/utils/path";

export function setupIpcMain() {
  ipcMainOn("window-frame-action", (action, event) => {
    const mainWindow = getMainWindow();
    const closeBehavior = getAppConfigPathSync("general.closeBehavior");

    switch (action) {
      case "CLOSE": {
        if (closeBehavior === "exit") {
          return BrowserWindow.fromWebContents(event.sender)?.close();
        } else {
          return mainWindow.hide();
        }
      }
      case "MAXIMIZE": {
        return mainWindow.maximize();
      }
      case "MINIMIZE": {
        return mainWindow.minimize();
      }
      case "HIDE": {
        return mainWindow.hide();
      }
    }
  });

  ipcMainHandle("show-open-dialog", (options) => {
    const mainWindow = getMainWindow();
    if (!mainWindow) throw new Error("Invalid Window");
    return dialog.showOpenDialog(options);
  });

  ipcMainOn("open-folder", (path) => {
    if (fs.existsSync(path)) {
      shell.openPath(path);
    }
  });

  ipcMainOn("set-pip-mode", ({ data, state }) => {
    if (!getPipmodeWindow()) {
      showPipmodeWindow(data, state);
    }
  });

  ipcMainHandle("extract-metadata", (path) => {
    return extractMusicItem(path);
  });

  ipcMainOn("show-notification", ({ title, body }) => {
    const notification = getAppConfigPathSync("general.notification");
    if (notification) {
      new Notification({
        title,
        body,
        icon: nativeImage.createFromPath(getResourcePath("logo.png")),
      }).show();
    }
  });

  ipcMainHandle("write-json", async (data) => {
    try {
      const downloadPath = getAppConfigPathSync("download.path");
      const filePath = path.join(downloadPath, "backup.json");
      await fs.writeJSON(filePath, data, { spaces: 2 });
      return true;
    } catch {
      return false;
    }
  });

  ipcMainHandle("read-json", async (filePath) => {
    try {
      const fileData = await fs.readFile(filePath, "utf-8");
      return JSON.parse(fileData);
    } catch {
      return {};
    }
  });
}
