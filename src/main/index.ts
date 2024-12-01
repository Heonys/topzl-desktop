import { app, BrowserWindow, shell, Tray } from "electron";
import path from "node:path";
import { isDev } from "./utils.js";

let mainWindow: BrowserWindow;
let tray: Tray;

function createWinodw() {
  mainWindow = new BrowserWindow({
    title: "Electron App",
    width: 900,
    height: 670,
    show: false,
    center: true,
    frame: false,
    /* macOS */
    // titleBarStyle: "hidden",
    // vibrancy: "under-window",
    // visualEffectState: "active",
    // trafficLightPosition: { x: 10, y: 15 },
    webPreferences: {
      sandbox: true,
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "../preload/index.js"),
    },
  });

  tray = new Tray("resources/trayIcon.png");
  tray.setTitle("electorn-app");

  if (isDev && process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });
}

app.whenReady().then(createWinodw);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
