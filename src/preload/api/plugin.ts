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

function getTopLists() {
  return ipcRendererInvoke("get-toplists");
}
function getRecommendedTag() {
  return ipcRendererInvoke("get-recommended-tag");
}
function getTopListDetail(item: any) {
  return ipcRendererInvoke("get-toplist-detail", item);
}

export const plugin = {
  callPluginMethod,
  getMediaSource,
  searchLyric,
  getTopLists,
  getRecommendedTag,
  getTopListDetail,
} satisfies Window["plugin"];
