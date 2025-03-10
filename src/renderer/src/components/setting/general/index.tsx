import { useTranslation } from "react-i18next";
import { Blockquote } from "@/common";
import { RadioGroupOption, SelectOption, SwitchOption } from "@/components/setting/common";
import { useAppConfig } from "@/hooks";
import { changeLanguage } from "@shared/i18n/renderer";

const General = () => {
  const { appConfig, setAppConfig } = useAppConfig();
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col gap-4 py-5 pt-4">
      {/* Language */}
      <SelectOption
        keyPath="general.language"
        label={t("settings.general.language_label")}
        description={t("settings.general.language_description")}
        iconName="language"
        value={appConfig.general?.language}
        options={["ko-KR", "en-US"]}
        convertToLabel={(value) => {
          if (value === "ko-KR") return "한국어 (ko-KR)";
          if (value === "en-US") return "English (en-US)";
          return String(value);
        }}
        onChange={async (value) => {
          const result = await changeLanguage(value);
          if (result) {
            setAppConfig({ keyPath: "general.language", value });
          }
        }}
        width="200px"
      />
      {/* Theme */}
      {/* <ImageRadioGroupOption
        keyPath="general.theme"
        label={t("settings.general.theme_label")}
        description={t("settings.general.theme_description")}
        iconName="sparkles"
        value={appConfig.general?.theme}
        options={[
          { title: "light", image: LightTheme },
          { title: "dark", image: DarkTheme },
        ]}
      /> */}
      {/* When close button */}
      <RadioGroupOption
        keyPath="general.closeBehavior"
        label={t("settings.general.close_behavior_label")}
        description={t("settings.general.close_behavior_language_description")}
        iconName="box-close"
        value={appConfig.general?.closeBehavior}
        options={[
          { value: "exit", title: t("settings.general.close_behavior_exit") },
          { value: "minimize", title: t("settings.general.close_behavior_minimize") },
        ]}
      />
      {/* Auto Start On Boot */}
      <SwitchOption
        keyPath="general.autoStartOnBoot"
        label={t("settings.general.auto_start_label")}
        description={t("settings.general.auto_start_description")}
        iconName="power"
        value={appConfig.general?.autoStartOnBoot}
      />
      {/* Notification */}
      <SwitchOption
        keyPath="general.notification"
        label={t("settings.general.notification_label")}
        description={t("settings.general.notification_description")}
        iconName="notification"
        value={appConfig.general?.notification}
      />

      <Blockquote
        color="orange"
        disabled={!appConfig.general?.notification}
        onClick={() =>
          window.common.showNotification({
            title: "테스트 제목",
            body: "테스트 메시지",
          })
        }
      >
        <div className="font-bold">{t("settings.general.notification_test_label")}</div>
      </Blockquote>

      {/* Maximum search history */}
      <RadioGroupOption
        keyPath="general.maxHistoryLength"
        label={t("settings.general.max_history_length_label")}
        description={t("settings.general.max_history_length_description")}
        iconName="history"
        value={appConfig.general?.maxHistoryLength}
        options={[{ value: 7 }, { value: 10 }, { value: 15 }]}
      />
    </div>
  );
};

export default General;
