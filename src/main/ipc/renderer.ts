import { ipcRenderer } from "electron";

export function ipcRenderInvoke<T extends keyof IpcEvents.Renderer>(
  channel: T,
  payload?: any,
): Promise<IpcEvents.Renderer[T]> {
  return ipcRenderer.invoke(channel, payload);
}
