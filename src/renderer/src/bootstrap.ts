import { setupI18n } from "@shared/i18n/renderer";
import { setupRendererConfig } from "@shared/config/renderer";
import { setupPlayer } from "@shared/plugin/setup";
import { syncWithIndexedDB, setupAtomEffect } from "@/core/indexedDB";
import { setupDownloader, setupWatcher } from "@/core/worker";
import { defaultShortcut } from "@/core/shortcut";
import { dropHandler } from "@/core/dragdrop";

async function bootstrap() {
  await Promise.allSettled([setupRendererConfig(), setupPlayer(), syncWithIndexedDB()]);
  await setupI18n();
  setupWatcher();
  setupDownloader();
  setupAtomEffect();
  defaultShortcut();
  dropHandler();

  window.notification.error((message) => {
    console.error(message);
  });
}

export default bootstrap;
