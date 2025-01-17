type CleanUp = () => void;

declare global {
  interface Window {
    common: {
      sendFrameAction: (payload: IpcEvents.Renderer["window-frame-action"]) => void;
      showOpenDialog: IpcInvoke.Renderer["show-open-dialog"];
      getGlobalContext: IpcEvents.RendererSync["global-context"];
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
      callPluginMethod: IpcInvoke.Renderer["call-plugin-method"];
      getMediaSource: IpcInvoke.Renderer["get-media-source"];
      searchLyric: IpcInvoke.Renderer["search-lyric"];
      getTopLists: IpcInvoke.Renderer["get-toplists"];
      getRecommendedTag: IpcInvoke.Renderer["get-recommended-tag"];
      getTopListDetail: IpcInvoke.Renderer["get-toplist-detail"];
    };
    notification: {
      error: (callback: (message: IpcEvents.Main["notification-error"]) => void) => void;
    };
    worker: {
      setupWatcher: (payload: IpcEvents.Renderer["worker-setup-watcher"]) => void;
      changeWorkerPath: (...args: IpcEvents.Renderer["worker-change-paths"]) => void;
      onAddedItems: (callback: (items: IpcEvents.Main["sync-watch-add"]) => void) => void;
      onRemovedPath: (callback: (paths: IpcEvents.Main["sync-watch-remove"]) => void) => void;
    };
    fs: {
      readFile: (filePath: string) => Promise<Buffer>;
    };
  }
}

export {};
