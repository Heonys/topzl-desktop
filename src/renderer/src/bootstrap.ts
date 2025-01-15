import { setupI18n } from "@shared/i18n/renderer";
import { setupRendererConfig } from "@shared/config/renderer";
import { setupPlayer } from "@shared/plugin/setup";
import { setupWatcher } from "@shared/worker/renderer";

async function bootstrap() {
  await Promise.allSettled([setupRendererConfig(), setupPlayer()]);
  await setupI18n();
  setupWatcher();

  window.notification.error((message) => {
    console.error(message);
  });
}

export default bootstrap;
