import { ipcMain, IpcMainEvent } from "electron";
import { validationEventFrame } from "@/utils/validation";

export function ipcMainOn<T extends keyof IpcEvents.Renderer>(
  channel: T,
  callback: (payload: IpcEvents.Renderer[T], event: IpcMainEvent) => void,
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

export function ipcMainHandle<T extends keyof IpcEvents.Renderer>(
  channel: T,
  callback: (payload?: any) => IpcEvents.Renderer[T] | Promise<IpcEvents.Renderer[T]>,
) {
  ipcMain.handle(channel, (event, payload) => {
    if (!event.senderFrame) return;
    try {
      validationEventFrame(event.senderFrame);
      return callback(payload);
    } catch (error) {
      console.error(error);
    }
  });
}
