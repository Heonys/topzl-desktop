import "./shared";
import { contextBridge, ipcRenderer } from "electron";

let messagePort: MessagePort | null = null;
let currnetMusic: MusicItem | null;

type Handler = (data: any) => void;
const handlers: Handler[] = [];

ipcRenderer.on("port", (e, data) => {
  messagePort = e.ports[0];
  currnetMusic = data;
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

function syncCurrentMusic() {
  return currnetMusic;
}

contextBridge.exposeInMainWorld("messagePort", {
  on,
  off,
  sendMessage,
  syncCurrentMusic,
});
