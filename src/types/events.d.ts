type AppConfig = import("@shared/config/type").AppConfig;
type AppConfigKeyPath = import("@shared/config/type").AppConfigKeyPath;
type AppConfigKeyPathValue = import("@shared/config/type").AppConfigKeyPathValue;

declare namespace IpcEvents {
  // ipcRender.send, ipcMain.on
  interface Renderer {
    "window-frame-action": "CLOSE" | "MINIMIZE" | "MAXIMIZE";
  }
}

declare namespace IpcInvoke {
  // ipcMain.handle, ipcRender.invoke
  interface Renderer {
    "i18n-setup": () => Promise<{
      lang: string;
      allLangs: string[];
      resources: Record<string, any>;
    }>;
    "i18n-change": (lang: string) => Promise<{
      newLang: string;
      resources: Record<string, any>;
    }>;
    "get-app-config": () => AppConfig;
    "set-app-config": (config: AppConfig) => boolean;
    // "set-app-config-path": <T extends AppConfigKeyPath>(arg: {
    //   keyPath: T;
    //   value: AppConfigKeyPathValue<T>;
    // }) => boolean;
  }
}

declare namespace IpcEvents {
  // ipcMain.send, ipcRender.on
  interface Main {
    "get-app-config": AppConfig;
  }
}
