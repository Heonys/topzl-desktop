import { isDev } from "@/utils/common";
import { BrowserWindow } from "electron";

let mainWindow: BrowserWindow | null;

export function createPipmodeWinodw() {
  mainWindow = new BrowserWindow({
    width: 340,
    height: 72,
    resizable: false,
    maximizable: false,
    frame: false,
    show: false,
    center: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    webPreferences: {
      // contextIsolation: true,
      // nodeIntegration: false,
      // preload: "",
    },
  });

  if (isDev) {
    //
  } else {
    //
  }

  mainWindow.on("ready-to-show", () => {
    showPipmodeWindow();
  });
}

export const getPipmodeWindow = () => mainWindow;

export const closePipmode = () => {
  if (mainWindow) {
    mainWindow.close();
    mainWindow = null;
  }
};

export function showPipmodeWindow() {
  if (!mainWindow) {
    createPipmodeWinodw();
    return;
  }
  if (mainWindow.isMinimized()) {
    mainWindow.restore();
  } else {
    mainWindow.show();
  }
  mainWindow.focus();
}
