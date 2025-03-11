import { ipcRendererInvoke, ipcRendererOn, ipcRendererSend } from "../ipcRenderer";
import type { SupportMediaType } from "@shared/plugin/type";

type Props = {
  method: SupportMediaType;
  query: string;
  page: number;
};

function searchMusic({ method, query, page }: Props) {
  return ipcRendererInvoke("search-music", { method, query, page });
}

function searchPlaylist(payload: { item: MusicSheetItem; page: number }) {
  return ipcRendererInvoke("search-playlist", payload);
}

function searchArtist(payload: ArtistItem) {
  return ipcRendererInvoke("search-artist", payload);
}

function getMediaSource(id: string) {
  return ipcRendererInvoke("get-media-source", id);
}

function searchLyric(query: string) {
  return ipcRendererInvoke("search-lyric", query);
}

function getRecommendedPlaylistTag() {
  return ipcRendererInvoke("get-recommended-playlist-tag");
}

function getRecommendedPlaylist(payload: { tag: any; page: number }) {
  return ipcRendererInvoke("get-recommended-playlist", payload);
}

function onErrorHandler(callback: (message: string) => void) {
  ipcRendererOn("plugin-error", (event, payload) => {
    callback(payload);
  });
}

function setCurrentTrack(track: MusicItem) {
  ipcRendererSend("current-track", track);
}

export const plugin = {
  searchMusic,
  searchPlaylist,
  searchArtist,
  getMediaSource,
  searchLyric,
  getRecommendedPlaylistTag,
  getRecommendedPlaylist,
  onErrorHandler,
  setCurrentTrack,
} satisfies Window["plugin"];
