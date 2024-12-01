import { app, WebFrameMain } from "electron";
import { pathToFileURL } from "node:url";
import { getRendererPath } from "./pathResolver";

export const isDev = !app.isPackaged;

export function validationEventFrame(frame: WebFrameMain) {
  if (isDev && new URL(frame.url).origin === process.env.ELECTRON_RENDERER_URL) return;
  if (frame.url !== pathToFileURL(getRendererPath()).toString()) {
    throw new Error("Malicious event");
  }
}
