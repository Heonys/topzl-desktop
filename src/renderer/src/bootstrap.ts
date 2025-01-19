import { setupI18n } from "@shared/i18n/renderer";
import { setupRendererConfig } from "@shared/config/renderer";
import { setupPlayer } from "@shared/plugin/setup";
import { setupWatcher, setupDownloader } from "@shared/worker/renderer";

async function bootstrap() {
  await Promise.allSettled([setupRendererConfig(), setupPlayer()]);
  await setupI18n();
  setupWatcher();
  setupDownloader();

  window.notification.error((message) => {
    console.error(message);
  });
}

export default bootstrap;
