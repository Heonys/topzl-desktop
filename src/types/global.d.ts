import { MessageData } from "@shared/plugin/type";

type CleanUp = () => void;

declare global {
  interface Window {
    common: {
      sendFrameAction: (payload: IpcEvents.Renderer["window-frame-action"]) => void;
      showOpenDialog: IpcInvoke.Renderer["show-open-dialog"];
      getGlobalContext: IpcEvents.RendererSync["global-context"];
      onTrayCommand: (callback: (command: IpcEvents.Main["tray-command"]) => void) => void;
      onNavigateTo: (callback: (command: IpcEvents.Main["change-route"]) => void) => void;
      setPipMode: (currentItem: MusicItem | null, state: PlayerState) => void;
      proxyCommand: (command: IpcEvents.Main["tray-command"]) => void;
      extractMetadata: IpcInvoke.Renderer["extract-metadata"];
    };
    i18n: {
      setupLang: IpcInvoke.Renderer["i18n-setup"];
      changeLang: IpcInvoke.Renderer["i18n-change"];
    };
    appConfig: {
      syncAppConfig: (callback: (config: IpcEvents.Main["sync-app-config"]) => void) => void;
      getAppConfig: IpcInvoke.Renderer["get-app-config"];
      getAppConfigPath: IpcInvoke.Renderer["get-app-config-path"];
      setAppConfig: IpcInvoke.Renderer["set-app-config"];
      setAppConfigPath: IpcInvoke.Renderer["set-app-config-path"];
    };
    shortcut: {
      setupNavigate: (
        callback: (url: IpcEvents.Main["global-shortcut-execute"]) => void,
      ) => CleanUp;
    };
    plugin: {
      searchMusic: IpcInvoke.Renderer["search-music"];
      searchPlaylist: IpcInvoke.Renderer["search-playlist"];
      getMediaSource: IpcInvoke.Renderer["get-media-source"];
      searchLyric: IpcInvoke.Renderer["search-lyric"];
      getRecommendedPlaylistTag: IpcInvoke.Renderer["get-recommended-playlist-tag"];
      getRecommendedPlaylist: IpcInvoke.Renderer["get-recommended-playlist"];
      onErrorHandler: (callback: (message: IpcEvents.Main["plugin-error"]) => void) => void;
      setCurrentTrack: (track: IpcEvents.Renderer["current-track"]) => void;
    };
    notification: {
      error: (callback: (message: IpcEvents.Main["notification-error"]) => void) => void;
    };
    worker: {
      setupWatcher: (payload: IpcEvents.Renderer["worker-setup-watcher"]) => void;
      changeWorkerPath: (...args: IpcEvents.Renderer["worker-change-paths"]) => void;
      onAddedItems: (callback: (items: IpcEvents.Main["sync-watch-add"]) => void) => void;
      onRemovedPath: (callback: (paths: IpcEvents.Main["sync-watch-remove"]) => void) => void;
      setupDownloadConfig: (config: IpcEvents.Renderer["worker-setup-download"]) => void;
      downloadFile: (...args: IpcEvents.Renderer["worker-download"]) => void;
      syncStatus: (callback: (progress: IpcEvents.Main["sync-download-status"]) => void) => CleanUp;
    };
    fs: {
      readFile: (filePath: string) => Promise<Buffer>;
      openFolder: (path: string) => void;
      isFile: (path: string) => Promise<boolean>;
      getFilePath: (file: File) => string;
    };
    messagePort: {
      sendMessage: (data: MessageData) => void;
      on: (callback: (data: MessageData) => void) => void;
      // off: () => void;
    };
  }
}

export {};
