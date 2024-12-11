import { ipcRendererInvoke } from "../ipcRenderer";
import type { PluginDefine } from "@shared/plugin/type";

type Props = {
  method: keyof PluginDefine;
  query: string;
  page: number;
};

function callPluginMethod({ method, query, page }: Props) {
  return ipcRendererInvoke("call-plugin-method", { method, query, page });
}

export const plugin = {
  callPluginMethod,
} satisfies Window["plugin"];
