import i18n from "i18next";
import fs from "node:fs/promises";
import { getResourcePath } from "@/utils/path";

export type I18nOptions = {
  defaultLang: () => string;
  onChange: (lang: string) => void;
};

let locales: string[];

export async function setupI18n(options: I18nOptions) {
  const { defaultLang, onChange } = options;
  const lang = defaultLang();

  const localeDir = getResourcePath("./locale");
  const files = await fs.readdir(localeDir, { withFileTypes: true });
  locales = files
    .filter((it) => it.isFile() && it.name.endsWith(".json"))
    .map((it) => it.name.replace(".json", ""));

  if (locales.includes(lang)) {
    //
  } else {
    //
  }

  i18n.init({});
}
