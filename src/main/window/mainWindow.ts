import { BrowserWindow, nativeImage, shell } from "electron";
import path from "node:path";
import { getResourcePath } from "@/utils/path.js";
import { isDev } from "@/utils/common.js";

let mainWindow: BrowserWindow;

export function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: "Electron App",
    width: 1114,
    height: 718,
    show: false,
    center: true,
    frame: false,
    resizable: false,
    maximizable: false,
    webPreferences: {
      // sandbox: true,
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, "../preload/index.js"),
    },
    icon: nativeImage.createFromPath(getResourcePath("logo.png")),
  });

  if (isDev && process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }

  mainWindow.on("ready-to-show", () => {
    showMainWindow();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });
}

export const getMainWindow = () => mainWindow;

export function showMainWindow() {
  if (!mainWindow) return;
  if (mainWindow.isMinimized()) {
    mainWindow.restore();
  } else {
    mainWindow.show();
  }
  mainWindow.focus();
}
