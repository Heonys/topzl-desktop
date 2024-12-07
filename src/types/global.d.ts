declare global {
  interface Window {
    action: {
      sendFrameAction: (payload: IpcEvents.Renderer["window-frame-action"]) => void;
    };
    i18n: {
      setupLang: IpcInvoke.Renderer["i18n-setup"];
      changeLang: IpcInvoke.Renderer["i18n-change"];
    };
  }
}

export {};
