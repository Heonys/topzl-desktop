import { app, BrowserWindow, Tray, nativeImage, Menu, shell } from "electron";
import path from "node:path";
import { getResourcePath } from "@/utils/path.js";
import { isDev } from "@/utils/common.js";

let mainWindow: BrowserWindow;
let tray: Tray;

export function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: "Electron App",
    width: 900,
    height: 670,
    show: false,
    center: true,
    frame: false,
    webPreferences: {
      sandbox: true,
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "../preload/index.js"),
    },
    icon: nativeImage.createFromPath(getResourcePath("logo.png")),
  });

  const trayIcon = nativeImage.createFromPath(getResourcePath("trayIcon.png"));
  tray = new Tray(trayIcon);
  tray.setTitle("electorn-app");

  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: "quit",
        click: () => app.quit(),
      },
    ]),
  );

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
