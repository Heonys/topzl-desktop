import { ipcMain, IpcMainEvent } from "electron";
import { validationEventFrame } from "@/utils/validation";

export function ipcMainOn<T extends keyof IpcEvents.Rederer>(
  channel: T,
  callback: (payload: IpcEvents.Rederer[T], event: IpcMainEvent) => void,
) {
  ipcMain.on(channel, (event, payload) => {
    if (!event.senderFrame) return;
    try {
      validationEventFrame(event.senderFrame);
      callback(payload, event);
    } catch (error) {
      console.error(error);
    }
  });
}
