declare namespace IpcEvents {
  interface Renderer {
    "window-frame-action": "CLOSE" | "MINIMIZE" | "MAXIMIZE";
    "i18n-setup": {
      lang: string;
      allLangs: string[];
      resources: Record<string, unknown>;
    };
    "i18n-change": {
      lang: string;
      resources: Record<string, unknown>;
    };
  }
}
