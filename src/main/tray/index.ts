import { Menu, nativeImage, Tray } from "electron";
import { getResourcePath } from "@/utils/path";

let tray: Tray;

export function setupTray() {
  tray = new Tray(
    nativeImage.createFromPath(getResourcePath("logo.png")).resize({
      width: 32,
      height: 32,
    }),
  );

  setupTrayMenu();
}

function setupTrayMenu() {
  if (!tray) return;

  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: "exit",
        role: "quit",
      },
    ]),
  );
}
