import {
  ipcRendererInvoke,
  ipcRendererOn,
  ipcRendererSend,
  ipcRendererSendSync,
} from "../ipcRenderer";

function sendFrameAction(payload: IpcEvents.Renderer["window-frame-action"]) {
  return ipcRendererSend("window-frame-action", payload);
}

function showOpenDialog(options: Electron.OpenDialogOptions) {
  return ipcRendererInvoke("show-open-dialog", options);
}

function getGlobalContext() {
  return ipcRendererSendSync("global-context");
}

function onTrayCommand(callback: (command: TrayCommand) => void) {
  ipcRendererOn("tray-command", (_, command) => {
    callback(command);
  });
}
function onNavigateTo(callback: (route: string) => void) {
  ipcRendererOn("change-route", (_, route) => {
    callback(route);
  });
}

export const common = {
  sendFrameAction,
  showOpenDialog,
  getGlobalContext,
  onTrayCommand,
  onNavigateTo,
} satisfies Window["common"];
