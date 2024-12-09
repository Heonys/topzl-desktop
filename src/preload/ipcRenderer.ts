import { ipcRenderer, IpcRendererEvent } from "electron";

export function ipcRendererOn<T extends keyof IpcEvents.Main>(
  channel: T,
  callback: (event: IpcRendererEvent, arg: IpcEvents.Main[T]) => void,
) {
  ipcRenderer.on(channel, (event, payload) => {
    callback(event, payload);
  });
}

export function ipcRenderOff<T extends keyof IpcEvents.Main>(
  channel: T,
  callback: (event: IpcRendererEvent, arg: IpcEvents.Main[T]) => void,
) {
  ipcRenderer.off(channel, callback);
}

export function ipcRendererSend<T extends keyof IpcEvents.Renderer>(
  channel: T,
  payload: IpcEvents.Renderer[T],
) {
  ipcRenderer.send(channel, payload);
}

export function ipcRendererInvoke<T extends keyof IpcInvoke.Renderer>(
  channel: T,
  ...arg: Parameters<IpcInvoke.Renderer[T]>
): Promise<Awaited<ReturnType<IpcInvoke.Renderer[T]>>> {
  return ipcRenderer.invoke(channel, ...arg);
}
