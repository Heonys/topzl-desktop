import { ipcRendererInvoke } from "../ipcRenderer";

function setupLang() {
  return ipcRendererInvoke("i18n-setup");
}

function changeLang(lang: string) {
  return ipcRendererInvoke("i18n-change", lang);
}

export const i18n = {
  setupLang,
  changeLang,
} satisfies Window["i18n"];
