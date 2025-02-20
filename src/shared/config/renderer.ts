import { getDefaultStore } from "jotai";
import { appConfigAtom } from "src/renderer/src/atom";

const store = getDefaultStore();

export async function setupRendererConfig() {
  window.appConfig.syncAppConfig((config) => {
    store.set(appConfigAtom, config);
  });
  const config = await window.appConfig.getAppConfig();
  store.set(appConfigAtom, config);
}
