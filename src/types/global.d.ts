declare global {
  interface Window {
    action: {
      sendFrameAction: (payload: IpcEvents.Renderer["window-frame-action"]) => void;
    };
    i18n: {
      setupLang: () => Promise<IpcEvents.Renderer["i18n-setup"]>;
      changeLang: (lang: string) => Promise<IpcEvents.Renderer["i18n-change"]>;
    };
  }
}

export {};
