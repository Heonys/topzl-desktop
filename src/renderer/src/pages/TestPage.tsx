import { changeLanguage } from "@shared/i18n/renderer";
import { useTranslation } from "react-i18next";

export const TestPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex size-full flex-1 flex-col items-center justify-center ">
      <h1 className="text-3xl text-blue-400">Hello world!</h1>
      <div className="flex gap-2 text-black">
        <button
          onClick={async () => {
            await changeLanguage("en");
          }}
        >
          en
        </button>
        <button
          onClick={async () => {
            await changeLanguage("ko");
          }}
        >
          ko
        </button>
      </div>
      <div className="text-black">
        <button>{t("common.greeting")}</button>
      </div>
    </div>
  );
};
