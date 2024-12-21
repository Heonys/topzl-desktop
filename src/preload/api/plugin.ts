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

export const plugin = {
  callPluginMethod,
  getMediaSource,
} satisfies Window["plugin"];
