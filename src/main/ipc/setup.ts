import { getMainWindow } from "@/window/mainWindow";
import { ipcMainOn } from "@/ipc/main";

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
}
