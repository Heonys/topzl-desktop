import { ipcRendererInvoke, ipcRendererSend, ipcRendererSendSync } from "../ipcRenderer";

function sendFrameAction(payload: IpcEvents.Renderer["window-frame-action"]) {
  return ipcRendererSend("window-frame-action", payload);
}

function showOpenDialog(options: Electron.OpenDialogOptions) {
  return ipcRendererInvoke("show-open-dialog", options);
}

function getGlobalContext() {
  return ipcRendererSendSync("global-context");
}

export const common = {
  sendFrameAction,
  showOpenDialog,
  getGlobalContext,
} satisfies Window["common"];
