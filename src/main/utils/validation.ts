import { WebFrameMain } from "electron";
import { pathToFileURL } from "node:url";
import { getRendererPath } from "./path";
import { isDev } from "./common";

export function validationEventFrame(frame: WebFrameMain) {
  const expectedURL = pathToFileURL(getRendererPath()).toString();

  if (isDev && new URL(frame.url).origin === process.env.ELECTRON_RENDERER_URL) return;
  if (frame.url !== expectedURL) {
    throw new Error("Malicious event");
  }
}
