declare namespace IpcEvents {
  interface Renderer {
    "window-frame-action": "CLOSE" | "MINIMIZE" | "MAXIMIZE";
    "i18n-setup": {
      lang: string;
      allLangs: string[];
      resources: Record<string, any>;
    };
    "i18n-change": {
      newLang: string;
      resources: Record<string, any>;
    };
  }
}
