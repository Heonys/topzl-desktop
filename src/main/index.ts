import { app, BrowserWindow } from "electron";
import { createMainWindow, getMainWindow, showMainWindow } from "@/window/mainWindow";
import { setupIpcMain } from "@/ipc/setup";
import { setupI18n } from "@shared/i18n/main";

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on("second-instance", (event, commandLine) => {
    if (getMainWindow()) {
      showMainWindow();
    }
    /*
      setAsDefaultProtocolClient() 사용할때
      URL스킴을 제공하고 그에대한 상호작용할때 사용
    */
    console.log(commandLine);
  });
}

app.whenReady().then(() => {
  // await -> 글로벌 컨텍스트, 설정 초기화
  setupI18n({
    defaultLang: () => app.getLocale(),
    onChange: (newlang) => {
      console.log("i18n changed", newlang);
    },
  });
  createMainWindow();
  setupIpcMain();
  // 트레이 생성, 글로벌 숏컷 설정
});
