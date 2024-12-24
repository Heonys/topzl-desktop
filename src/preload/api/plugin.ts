import { ipcRendererInvoke } from "../ipcRenderer";
import type { SupportMediaType } from "@shared/plugin/type";

type Props = {
  method: SupportMediaType;
  query: string;
  page: number;
};

function callPluginMethod({ method, query, page }: Props) {
  return ipcRendererInvoke("call-plugin-method", { method, query, page });
}

function getMediaSource(id: number) {
  return ipcRendererInvoke("get-media-source", id);
}

function searchLyric(query: string) {
  return ipcRendererInvoke("search-lyric", query);
}
function getLyric(url: string) {
  return ipcRendererInvoke("get-lyric", url);
}

export const plugin = {
  callPluginMethod,
  getMediaSource,
  searchLyric,
  getLyric,
} satisfies Window["plugin"];
