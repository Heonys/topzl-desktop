type Electron = import("electron");
type AppConfig = import("@shared/config/type").AppConfig;
type AppConfigKeyPath = import("@shared/config/type").AppConfigKeyPath;
type AppConfigKeyPathValue = import("@shared/config/type").AppConfigKeyPathValue;
type ShortcutKeys = import("@shared/config/type").ShortcutKeys;
type SupportMediaType = import("@shared/plugin/type").SupportMediaType;
type SearchResult = import("@shared/plugin/type").SearchResult;
type SheetInfoResult = import("@shared/plugin/type").SheetInfoResult;
type SearchedLyric = import("@shared/plugin/type").SearchedLyric;
type GlobalContext = import("@shared/config/type").GlobalContext;
type MusicItem = import("@shared/plugin/type").MusicItem;
type MusicSheetItem = import("@shared/plugin/type").MusicSheetItem;
type MusicSheetResult = import("@shared/plugin/type").MusicSheetResult;
type DownloadProgress = import("@shared/constant/index").DownloadProgress;
type Command = import("@shared/plugin/type").Command;
type PlayerState = import("@shared/plugin/type").PlayerState;

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
    "search-music": (arg: {
      method: SupportMediaType;
      query: string;
      page: number;
    }) => Promise<SearchResult>;
    "search-playlist": ({ item: MusicSheetItem, page: number }) => Promise<SheetInfoResult>;
    "get-media-source": (id: string) => Primise<{ url: string }>;
    "search-lyric": (query: string) => Promise<string>;

    "get-recommended-playlist-tag": () => Promise<void>;
    "get-recommended-playlist": ({ tag: any, page: number }) => Promise<MusicSheetResult>;

    "show-open-dialog": (
      options: Electron.OpenDialogOptions,
    ) => Promise<Electron.OpenDialogReturnValue>;
    "extract-metadata": (path: string) => Promise<MusicItem>;
  }
}

declare namespace IpcEvents {
  // ipcRender.send -> ipcMain.on
  interface Renderer {
    "window-frame-action": "CLOSE" | "MINIMIZE" | "MAXIMIZE" | "HIDE";
    "worker-setup-watcher": void;
    "worker-change-paths": [addPaths: string[], removePaths: string[]];
    "worker-setup-download": any;
    "worker-download": [id: string, mediaSource: string, filePath: string];
    "open-folder": string;
    "current-track": MusicItem;
    "set-pip-mode": { data: MusicItem | null; state: PlayerState };
    "proxy-command": Command;
    "show-notification": { title: string; body: string };
  }

  // ipcRender.send -> ipcMain.on (sync)
  interface RendererSync {
    "global-context": () => GlobalContext;
  }

  // ipcMain.send -> ipcRender.on
  interface Main {
    "sync-app-config": AppConfig;
    "global-shortcut-execute": ShortcutKeys;
    "notification-error": string;
    "sync-watch-add": MusicItem[];
    "sync-watch-remove": string[];
    "sync-download-status": DownloadProgress;
    "plugin-error": string;
    "tray-command": Command;
    "change-route": string;
  }
}
