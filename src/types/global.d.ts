declare global {
  interface Window {
    api: {
      sendFrameAction: (payload: IpcEvents.Rederer["window-frame-action"]) => void;
    };
  }
}

export {};
