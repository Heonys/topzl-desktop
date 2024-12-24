import type { PluginDefine, SupportMediaType } from "@shared/plugin/type";
import { app } from "electron";
import fs from "fs-extra";
import path from "node:path";
import _plugin from "@shared/plugin";
import { ipcMainHandle } from "@/ipc/main";
import lyric from "@shared/plugin/lyric";

const plugin = _plugin as unknown as PluginDefine;

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
  ipcMainHandle("call-plugin-method", ({ query, page, method }) => {
    return search(query, page, method);
  });
  ipcMainHandle("get-media-source", (id) => {
    return plugin.getMediaSource(id);
  });
  ipcMainHandle("search-lyric", (query) => {
    return lyric.search(query);
  });
  ipcMainHandle("get-lyric", (searchUrl) => {
    return lyric.getLyric(searchUrl);
  });
}

async function search(query: string, page: number, method: SupportMediaType) {
  const result = await plugin.search(query, page, method);
  if (Array.isArray(result.data)) {
    return {
      isEnd: result.isEnd ?? true,
      data: result.data,
    };
  }
  return {
    isEnd: true,
    data: [],
  };
}
