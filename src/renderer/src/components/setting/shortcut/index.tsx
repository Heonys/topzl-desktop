import { useTranslation } from "react-i18next";
import { SwitchOption } from "@/components/setting/common";
import { useAppConfig } from "@/hooks";
import ShortcutTable from "./ShortcutTable";
import { Blockquote } from "@/common";

const Shortcut = () => {
  const {
    appConfig: { shortcut },
  } = useAppConfig();
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col gap-4 py-5 pt-4">
      {/* In-App Shortcut */}
      <SwitchOption
        keyPath="shortcut.enableLocal"
        label={t("settings.shortcut.enableLocal.label")}
        description={t("settings.shortcut.enableLocal.description")}
        iconName="hot-key"
        value={shortcut?.enableLocal}
      />

      {/* Global Shortcut */}
      <SwitchOption
        keyPath="shortcut.enableGlobal"
        label={t("settings.shortcut.enableGlobal.label")}
        description={t("settings.shortcut.enableGlobal.description")}
        iconName="global"
        value={shortcut?.enableGlobal}
      />
      <Blockquote title={t("settings.shortcut.rules")} collapsible>
        <ul className="list-disc space-y-1 px-4">
          <li>{t("settings.shortcut.rule1")}</li>
          <li>{t("settings.shortcut.rule2")}</li>
          <li>{t("settings.shortcut.rule3")}</li>
          <li>{t("settings.shortcut.rule4")}</li>
          <li>{t("settings.shortcut.rule5")}</li>
        </ul>
      </Blockquote>
      <ShortcutTable
        enableLocal={shortcut?.enableLocal}
        enableGlobal={shortcut?.enableGlobal}
        keymaps={shortcut?.keymap}
      />
    </div>
  );
};

export default Shortcut;
