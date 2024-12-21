type CleanUp = () => void;

declare global {
  interface Window {
    action: {
      sendFrameAction: (payload: IpcEvents.Renderer["window-frame-action"]) => void;
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
    };
  }
}

export {};
