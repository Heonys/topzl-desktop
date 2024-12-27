import { ipcRendererOn } from "../ipcRenderer";

function error(callback: (payload: IpcEvents.Main["notification-error"]) => void) {
  ipcRendererOn("notification-error", (_, message) => {
    callback(message);
  });
}

export const notification = {
  error,
} satisfies Window["notification"];
