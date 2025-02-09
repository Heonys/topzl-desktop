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

function onTrayCommand(callback: (command: Command) => void) {
  ipcRendererOn("tray-command", (_, command) => {
    callback(command);
  });
}
function onNavigateTo(callback: (route: string) => void) {
  ipcRendererOn("change-route", (_, route) => {
    callback(route);
  });
}

function setPipMode(curretItem: MusicItem | null, state: PlayerState) {
  ipcRendererSend("set-pip-mode", { data: curretItem, state });
}

function proxyCommand(command: Command) {
  ipcRendererSend("proxy-command", command);
}

function extractMetadata(path: any) {
  return ipcRendererInvoke("extract-metadata", path);
}

export const common = {
  sendFrameAction,
  showOpenDialog,
  getGlobalContext,
  onTrayCommand,
  onNavigateTo,
  setPipMode,
  proxyCommand,
  extractMetadata,
} satisfies Window["common"];
