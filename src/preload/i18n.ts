import { ipcRenderer } from "electron";

async function setupLang() {
  return ipcRenderer.invoke("i18n-setup");
}

async function changeLang(lang: string) {
  return ipcRenderer.invoke("i18n-change", lang);
}

export const i18n = {
  setupLang,
  changeLang,
} satisfies Window["i18n"];
