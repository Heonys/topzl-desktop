import { app, BrowserWindow, shell } from "electron";
import path from "node:path";
import { isDev } from "./utils.js";

function createWinodw() {
  const mainWindow = new BrowserWindow({
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
      preload: path.join(app.getAppPath(), "/dist-electron/preload.cjs"),
    },
  });

  if (isDev) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-renderer/index.html"));
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
