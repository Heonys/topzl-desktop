import { app } from "electron";
import fs from "fs-extra";
import path from "node:path";

let _pluginPath: string;
function getPluginPath() {
  if (_pluginPath) return _pluginPath;
  _pluginPath = path.join(app.getPath("userData"), "plugins");
  return _pluginPath;
}

async function checkPath() {
  const pluginPath = getPluginPath();
  try {
    const stat = await fs.stat(pluginPath);
    if (!stat.isDirectory()) {
      await fs.remove(getPluginPath());
      throw new Error();
    }
  } catch {
    fs.mkdir(getPluginPath(), { recursive: true });
  }
}

export async function setupPlugin() {
  await checkPath();
}

async function readPlugin() {
  const pluginDir = await fs.readdir(getPluginPath());

  pluginDir.forEach((v, i) => {
    console.log(i, v);
  });
}

function installPluginFromUrl(url: string) {}
