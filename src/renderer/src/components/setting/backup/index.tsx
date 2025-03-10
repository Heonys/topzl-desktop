import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { ButtonsOption } from "@/components/setting/common";
import { db, restoreDB, clearDB } from "@/core/indexedDB";
import { useAppConfig } from "@/hooks";

const Backup = () => {
  const { appConfig } = useAppConfig();
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col gap-4 py-5 pt-4">
      <ButtonsOption
        label={t("settings.backup.backup_restore_label")}
        description={t("settings.backup.backup_restore_description")}
        iconName="playlist"
        buttons={[
          {
            children: t("settings.backup.backup_button"),
            onClick: async () => {
              const preference = await db.preference.toArray();
              const result = await window.fs.writeJson(preference);
              if (result) {
                toast.success("백업 완료");
              }
            },
          },
          {
            children: t("settings.backup.restore_button"),
            onClick: async () => {
              const result = await window.common.showOpenDialog({
                title: "백업 파일 추가",
                defaultPath: appConfig.download?.path,
                filters: [{ name: "JSON Files", extensions: ["json"] }],
                properties: ["openFile"],
              });
              if (!result.canceled) {
                const selected = result.filePaths[0];
                const data = await window.fs.readJson(selected);
                await restoreDB(data);
                toast.success("복원 완료");
              }
            },
          },
        ]}
      />
      <ButtonsOption
        label={t("settings.backup.clear_local_data_label")}
        description={t("settings.backup.clear_local_data_description")}
        iconName="database"
        buttons={[
          {
            children: t("settings.backup.initialize_button"),
            onClick: async () => {
              await clearDB();
              toast.success("초기화 완료");
            },
            className: "bg-red-200",
          },
        ]}
      />
    </div>
  );
};

export default Backup;
