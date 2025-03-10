import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const ns = "translation";

async function setupI18n() {
  const { lang, resources } = await window.i18n.setupLang();

  await i18n.use(initReactI18next).init({
    lng: lang,
    resources: {
      [lang]: {
        [ns]: resources,
      },
    },
  });
}

async function changeLanguage(lang: string) {
  const langData = await window.i18n.changeLang(lang);
  if (!langData) return false;

  const { newLang, resources } = langData;
  if (i18n.hasResourceBundle(newLang, ns)) {
    await i18n.changeLanguage(newLang);
  } else {
    i18n.addResourceBundle(newLang, ns, resources);
    await i18n.changeLanguage(newLang);
  }
  return true;
}

export { setupI18n, changeLanguage, i18n };
