import { dialog } from "electron";
import { getMainWindow } from "@/window/mainWindow";
import { ipcMainHandle, ipcMainOn } from "@/ipc/main";

export function setupIpcMain() {
  ipcMainOn("window-frame-action", (action) => {
    const mainWindow = getMainWindow();
    switch (action) {
      case "CLOSE": {
        return mainWindow.close();
      }
      case "MAXIMIZE": {
        return mainWindow.maximize();
      }
      case "MINIMIZE": {
        return mainWindow.minimize();
      }
    }
  });

  ipcMainHandle("show-open-dialog", (options) => {
    const mainWindow = getMainWindow();
    if (!mainWindow) throw new Error("Invalid Window");
    return dialog.showOpenDialog(options);
  });
}
