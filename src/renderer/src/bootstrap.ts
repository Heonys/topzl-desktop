import { setupI18n } from "@shared/i18n/renderer";
import { setupRendererConfig } from "@shared/config/renderer";

async function bootstrap() {
  await Promise.allSettled([setupRendererConfig()]);
  await setupI18n();
}

export default bootstrap;
