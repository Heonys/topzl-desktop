import { useTranslation } from "react-i18next";
import { useAppConfig } from "@/hooks";
import { RadioGroupOption, SwitchOption } from "@/components/setting/common";

const Lyric = () => {
  const { appConfig } = useAppConfig();
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col gap-4 py-5 pt-4">
      {/* Enable Lyrics */}
      <SwitchOption
        keyPath="lyric.enable"
        label={t("settings.lyric.enable_label")}
        description={t("settings.lyric.enable_description")}
        iconName="lyric"
        value={appConfig.lyric?.enable}
      />
      {/* Lyrics Search Method */}
      <RadioGroupOption
        keyPath="lyric.searchMethod"
        label={t("settings.lyric.search_method_label")}
        description={t("settings.lyric.search_method_description")}
        iconName="method"
        value={appConfig.lyric?.searchMethod}
        options={[
          { value: "basic", title: t("settings.lyric.search_method_basic") },
          { value: "advanced", title: t("settings.lyric.search_method_advanced") },
        ]}
      />
    </div>
  );
};

export default Lyric;
