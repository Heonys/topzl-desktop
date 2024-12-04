import i18n from "i18next";
import Backend, { FsBackendOptions } from "i18next-fs-backend";
import fs from "node:fs/promises";
import { getResourcePath } from "@/utils/path";
import { ipcMainHandle } from "@/ipc/main";

export type I18nOptions = {
  defaultLang: () => string;
  onChange: (lang: string) => void;
};

let locales: string[];
const namespace = "translation";

export async function setupI18n(options: I18nOptions) {
  const { defaultLang, onChange } = options;
  const lang = defaultLang();

  const localeDir = getResourcePath("./locale");
  const files = await fs.readdir(localeDir, { withFileTypes: true });
  locales = files
    .filter((it) => it.isFile() && it.name.endsWith(".json"))
    .map((it) => it.name.replace(".json", ""));

  await i18n.use(Backend).init<FsBackendOptions>({
    // debug: true,
    lng: lang,
    fallbackLng: "en",
    // ns: ["common", "footer"],
    // defaultNS: namespace,
    backend: {
      // loadPath: getResourcePath("./locale/{{lng}}/{{ns}}.json"),
      loadPath: getResourcePath("./locale/{{lng}}.json"),
    },
  });

  ipcMainHandle("i18n-setup", async () => {
    return {
      lang: i18n.language,
      allLangs: locales,
      resources: i18n.getResourceBundle(lang, namespace),
    };
  });

  ipcMainHandle("i18n-change", async (newLang: string) => {
    await i18n.changeLanguage(newLang);
    onChange(newLang);
    return {
      lang: newLang,
      resources: i18n.getResourceBundle(newLang, namespace),
    };
  });
}
