import { setupI18n } from "@shared/i18n/renderer";
import { setupRendererConfig } from "@shared/config/renderer";
import { setupPlayer } from "@shared/plugin/setup";
import { setupWatcher, setupDownloader } from "@shared/worker/renderer";
import { syncWithIndexedDB } from "@shared/storage/setup";

async function bootstrap() {
  await Promise.allSettled([setupRendererConfig(), setupPlayer(), syncWithIndexedDB()]);
  await setupI18n();
  setupWatcher();
  setupDownloader();

  window.notification.error((message) => {
    console.error(message);
  });
}

export default bootstrap;
