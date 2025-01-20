import type { PluginDefine, SupportMediaType } from "@shared/plugin/type";
import { app } from "electron";
import fs from "fs-extra";
import path from "node:path";
import _plugin from "@shared/plugin";
import { ipcMainHandle, ipcMainSendWebContents } from "@/ipc/main";
import Genius from "genius-lyrics";

const ACCESS_TOKEN = import.meta.env.MAIN_VITE_GENIUS_ACCESS_TOKEN;
const client = new Genius.Client(ACCESS_TOKEN);
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
  ipcMainHandle("get-media-source", async (id, event) => {
    try {
      const result = await plugin.getMediaSource(id);
      return result;
    } catch {
      ipcMainSendWebContents("plugin-error", event.sender, "File Location Error");
    }
  });

  ipcMainHandle("search-lyric", async (query) => {
    const songs = await client.songs.search(query);
    if (songs.length === 0) return "가사를 찾을 수 없습니다.";
    return songs[0].lyrics(false);
    // const scrapedData = await client.songs.scrape(songs[0].url);
    // const scrapedsongs = Object.values(scrapedData.data.entities.songs)[0] as {
    //   id: number;
    //   translationSongs?: { id: number }[];
    // };
    // const targetId = scrapedsongs.translationSongs?.[0]?.id || scrapedsongs.id;
    // const target = await client.songs.get(targetId);
    // return target.lyrics();
  });

  ipcMainHandle("get-toplists", () => {
    return plugin.getTopLists();
  });
  ipcMainHandle("get-recommended-tag", async () => {
    return plugin.getRecommendSheetTags();
  });

  ipcMainHandle("get-toplist-detail", (item) => {
    return plugin.getTopListDetail(item);
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
