import { BrowserWindow, MessageChannelMain } from "electron";
import path from "node:path";
import { isDev } from "@/utils/common";
import { getMainWindow } from "./mainWindow";

let pipWindow: BrowserWindow | null;

export function createPipmodeWinodw(currentItem?: MusicItem | null, state?: PlayerState) {
  pipWindow = new BrowserWindow({
    width: 340,
    height: 85,
    resizable: false,
    maximizable: false,
    frame: false,
    show: false,
    center: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, "../preload/pipmode.js"),
    },
  });

  if (isDev && process.env.ELECTRON_RENDERER_URL) {
    pipWindow.loadURL(`${process.env.ELECTRON_RENDERER_URL}/#/pipmode`);
  } else {
    pipWindow.loadFile(path.join(__dirname, "../renderer/index.html/#/pipmode"));
  }

  pipWindow.on("ready-to-show", () => {
    showPipmodeWindow();
  });

  pipWindow.on("close", () => {
    pipWindow = null;
  });

  const mainWindow = getMainWindow();
  const { port1, port2 } = new MessageChannelMain();

  mainWindow.webContents.postMessage("port", null, [port1]);
  pipWindow.webContents.postMessage("port", { track: currentItem, state }, [port2]);
}

export const getPipmodeWindow = () => pipWindow;

export function showPipmodeWindow(currentItem?: MusicItem | null, state?: PlayerState) {
  if (!pipWindow) {
    createPipmodeWinodw(currentItem, state);
    return;
  }
  if (pipWindow.isMinimized()) {
    pipWindow.restore();
  } else {
    pipWindow.show();
  }
  pipWindow.focus();
}
