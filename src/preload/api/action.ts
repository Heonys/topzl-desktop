import { ipcRendererInvoke, ipcRendererSend } from "../ipcRenderer";

function sendFrameAction(payload: IpcEvents.Renderer["window-frame-action"]) {
  return ipcRendererSend("window-frame-action", payload);
}

function showOpenDialog(options: Electron.OpenDialogOptions) {
  return ipcRendererInvoke("show-open-dialog", options);
}

export const action = {
  sendFrameAction,
  showOpenDialog,
} satisfies Window["action"];
