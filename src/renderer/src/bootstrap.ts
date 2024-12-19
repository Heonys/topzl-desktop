import { setupI18n } from "@shared/i18n/renderer";
import { setupRendererConfig } from "@shared/config/renderer";
import { setupPlayer } from "@shared/plugin/setup";

async function bootstrap() {
  await Promise.allSettled([setupRendererConfig(), setupPlayer()]);
  await setupI18n();
}

export default bootstrap;
