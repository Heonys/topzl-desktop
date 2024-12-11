type AppConfig = import("@shared/config/type").AppConfig;
type AppConfigKeyPath = import("@shared/config/type").AppConfigKeyPath;
type AppConfigKeyPathValue = import("@shared/config/type").AppConfigKeyPathValue;
type ShortcutKeys = import("@shared/config/type").ShortcutKeys;
type PluginMethods = import("@shared/plugin/type").PluginDefine;

declare namespace IpcInvoke {
  // ipcRender.invoke -> ipcMain.handle
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
    "get-app-config": () => Promise<AppConfig>;
    "get-app-config-path": <T extends AppConfigKeyPath>(
      path: T,
    ) => Promise<AppConfigKeyPathValue<T>>;
    "set-app-config": (config: AppConfig) => Promise<boolean>;
    "set-app-config-path": <T extends AppConfigKeyPath>(payload: {
      keyPath: T;
      value: AppConfigKeyPathValue<T>;
    }) => Promise<boolean>;
    "call-plugin-method": <T extends keyof PluginMethods>(arg: {
      method: T;
      query: string;
      page: number;
    }) => Promise<ReturnType<PluginMethods[T]>>;
  }
}

declare namespace IpcEvents {
  // ipcRender.send -> ipcMain.on
  interface Renderer {
    "window-frame-action": "CLOSE" | "MINIMIZE" | "MAXIMIZE";
  }

  // ipcMain.send -> ipcRender.on
  interface Main {
    "sync-app-config": AppConfig;
    "global-shortcut-execute": ShortcutKeys;
  }
}
