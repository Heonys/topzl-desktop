import { app } from "electron";
import path from "node:path";
import { isDev } from "./common";

const resouceDir = () => {
  return path.join(app.getAppPath(), isDev ? "." : "..", "resources");
};

export const getResourcePath = (name: string) => {
  return path.join(resouceDir(), name);
};

export const getRendererPath = () => {
  return path.join(app.getAppPath(), "out/renderer/index.html");
};
