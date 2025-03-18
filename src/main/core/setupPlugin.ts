import { app } from "electron";
import fs from "fs-extra";
import path from "node:path";
import _plugin from "@shared/plugin";
import { ipcMainHandle, ipcMainSendWebContents } from "@/ipc/main";
import type { PluginDefine, SupportMediaType } from "@shared/plugin/type";
import Genius from "genius-lyrics";
import { getAppConfigPath } from "@shared/config/main";

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
  ipcMainHandle("search-music", ({ query, page, method }) => {
    return search(query, page, method);
  });

  ipcMainHandle("search-playlist", ({ item, page }) => {
    return plugin.getMusicSheetInfo(item, page);
  });

  ipcMainHandle("search-artist", (item) => {
    return plugin.getArtistWorks(item, 1, "music");
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
    const searchMethod = await getAppConfigPath("lyric.searchMethod");
    try {
      const songs = await client.songs.search(query);
      if (songs.length === 0) return "가사를 찾을 수 없습니다.";

      if (searchMethod === "basic") {
        return songs[0].lyrics(false);
      } else {
        const scrapedData = await client.songs.scrape(songs[0].url);
        const scrapedSong = Object.values(scrapedData.data.entities.songs)[0] as {
          id: number;
          language: string;
          translationSongs: { id: number; language: string }[];
        };

        let targetId = scrapedSong.id;
        if (scrapedSong.language === "romanization") {
          const translated = scrapedSong.translationSongs.find(
            (it) => it.language !== "romanization",
          );
          targetId = translated ? translated.id : scrapedSong.id;
        }

        const target = await client.songs.get(targetId);
        return target.lyrics(false);
      }
    } catch {
      return "가사를 찾을 수 없습니다.";
    }
  });

  ipcMainHandle("get-recommended-playlist-tag", async () => {
    return plugin.getRecommendSheetTags();
  });
  ipcMainHandle("get-recommended-playlist", async ({ tag, page }) => {
    return plugin.getRecommendSheetsByTag(tag, page);
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
