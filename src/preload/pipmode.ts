import "./shared";
import { contextBridge, ipcRenderer } from "electron";

let messagePort: MessagePort | null = null;
let syncData: { track: MusicItem | null; state: PlayerState };

type Handler = (data: any) => void;
const handlers: Handler[] = [];

ipcRenderer.on("port", (e, data) => {
  messagePort = e.ports[0];
  syncData = data;
  messagePort.onmessage = (messageEvent) => {
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
  if (messagePort) {
    messagePort.postMessage(data);
  }
}

function syncCurrentMusicAndState() {
  return syncData;
}

contextBridge.exposeInMainWorld("messagePort", {
  on,
  off,
  sendMessage,
  syncCurrentMusicAndState,
});
