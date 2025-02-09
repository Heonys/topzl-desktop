import { BrowserWindow, dialog, shell } from "electron";
import fs from "fs-extra";
import { getMainWindow } from "@/window/mainWindow";
import { ipcMainHandle, ipcMainOn } from "@/ipc/main";
import { getPipmodeWindow, showPipmodeWindow } from "@/window/pipmodeWindow";
import { extractMusicItem } from "@/workers/common";

export function setupIpcMain() {
  ipcMainOn("window-frame-action", (action, event) => {
    const mainWindow = getMainWindow();
    switch (action) {
      case "CLOSE": {
        return BrowserWindow.fromWebContents(event.sender)?.close();
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
}
