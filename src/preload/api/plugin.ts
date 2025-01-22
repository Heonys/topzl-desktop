import { ipcRendererInvoke, ipcRendererOn } from "../ipcRenderer";
import type { SupportMediaType } from "@shared/plugin/type";

type Props = {
  method: SupportMediaType;
  query: string;
  page: number;
};

function searchMusic({ method, query, page }: Props) {
  return ipcRendererInvoke("search-music", { method, query, page });
}

function getMediaSource(id: string) {
  return ipcRendererInvoke("get-media-source", id);
}

function searchLyric(query: string) {
  return ipcRendererInvoke("search-lyric", query);
}

function getTopLists() {
  return ipcRendererInvoke("get-toplists");
}
function getRecommendedTag() {
  return ipcRendererInvoke("get-recommended-tag");
}
function getTopListDetail(item: any) {
  return ipcRendererInvoke("get-toplist-detail", item);
}

function onErrorHandler(callback: (message: string) => void) {
  ipcRendererOn("plugin-error", (event, payload) => {
    callback(payload);
  });
}

export const plugin = {
  searchMusic,
  getMediaSource,
  searchLyric,
  getTopLists,
  getRecommendedTag,
  getTopListDetail,
  onErrorHandler,
} satisfies Window["plugin"];
