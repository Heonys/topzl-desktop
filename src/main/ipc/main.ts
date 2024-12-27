import { BrowserWindow, ipcMain, IpcMainEvent, IpcMainInvokeEvent } from "electron";
// import { validationEventFrame } from "@/utils/validation";
import { getMainWindow } from "@/window/mainWindow";

// TODO: validationEventFrame  자주 에러발생 -> 확인필요
export function ipcMainOn<T extends keyof IpcEvents.Renderer>(
  channel: T,
  callback: (payload: IpcEvents.Renderer[T], event: IpcMainEvent) => void,
) {
  ipcMain.on(channel, (event, payload) => {
    if (!event.senderFrame) return;
    try {
      // validationEventFrame(event.senderFrame);
      callback(payload, event);
    } catch (error) {
      console.error(error);
    }
  });
}

export function ipcMainHandle<T extends keyof IpcInvoke.Renderer>(
  channel: T,
  callback: (
    payload: Parameters<IpcInvoke.Renderer[T]>[0],
  ) => ReturnType<IpcInvoke.Renderer[T]> | Promise<ReturnType<IpcInvoke.Renderer[T]>>,
  errorCallback?: (event: IpcMainInvokeEvent) => void,
) {
  ipcMain.handle(channel, (event, payload) => {
    if (!event.senderFrame) return;
    try {
      return callback(payload);
    } catch (error) {
      if (errorCallback) errorCallback(event);
      console.error(error);
    }
  });
}

export function ipcMainSend<T extends keyof IpcEvents.Main>(
  channel: T,
  mainWindow: BrowserWindow,
  payload?: IpcEvents.Main[T],
) {
  mainWindow.webContents.send(channel, payload);
}

export function ipcMainSendMainWindow<T extends keyof IpcEvents.Main>(
  channel: T,
  payload?: IpcEvents.Main[T],
) {
  const mainWindow = getMainWindow();
  mainWindow.webContents.send(channel, payload);
}
