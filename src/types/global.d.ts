type WindowFrameAction = "CLOSE" | "MINIMIZE" | "MAXIMIZE";

declare global {
  interface Window {
    api: {
      sendFrameAction: (payload: WindowFrameAction) => void;
    };
  }
  interface ChannelToPayload {
    "window-frame-action": WindowFrameAction;
  }
}

export {};
