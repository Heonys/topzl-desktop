import { app, BrowserWindow, shell, Tray, nativeImage, Menu } from "electron";
import path from "node:path";
import { isDev } from "./utils.js";
import { getResourcePathFor } from "./pathResolver.js";
import { apiAdapterOn } from "./adapter/apiAdapter.js";

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
    webPreferences: {
      sandbox: true,
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "../preload/index.js"),
    },
  });

  const trayIcon = nativeImage.createFromPath(getResourcePathFor("trayIcon.png"));
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
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  apiAdapterOn("window-frame-action", (action) => {
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

app.whenReady().then(createWinodw);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
