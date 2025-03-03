import { app } from "electron";
import { ipcMainOnSync } from "@/ipc/main";

export function setupGlobalContext() {
  ipcMainOnSync("global-context", (_, event) => {
    event.returnValue = {
      appVersion: app.getVersion(),
      appPath: {
        userData: app.getPath("appData"),
        temp: app.getPath("temp"),
        downloads: app.getPath("downloads"),
      },
      platForm: process.platform,
    } as GlobalContext;
  });
}
