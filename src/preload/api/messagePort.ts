import { ipcRenderer } from "electron";

let port: MessagePort | null = null;
let syncData: { track: MusicItem | null; state: PlayerState };

type Handler = (data: any) => void;
const handlers: Handler[] = [];

ipcRenderer.on("port", (e, data) => {
  port = e.ports[0];
  syncData = data;
  port.onmessage = (messageEvent) => {
    const data = messageEvent.data;
    handlers.forEach((handler) => handler(data));
  };
});

function on(handler: Handler) {
  handlers.push(handler);
}

function off(handler: Handler) {
  handlers.filter((it) => it !== handler);
}

function sendMessage(data: any) {
  if (port) {
    port.postMessage(data);
  }
}

function syncCurrentMusicAndState() {
  return syncData;
}

export const messagePort = {
  on,
  off,
  sendMessage,
  syncCurrentMusicAndState,
};
