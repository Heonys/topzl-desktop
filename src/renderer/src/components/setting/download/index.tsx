import { useTranslation } from "react-i18next";
import { RadioGroupOption, SelectDirectoryOption } from "@/components/setting/common";
import { useAppConfig, useDownload } from "@/hooks";

const Download = () => {
  const { appConfig, getGlobalContext, setAppConfig } = useAppConfig();
  const { setConcurrency } = useDownload();
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col gap-4 py-5 pt-4">
      {/* Download Path */}
      <SelectDirectoryOption
        keyPath="download.path"
        label={t("settings.download.path_label")}
        description={t("settings.download.path_description")}
        iconName="push-pin"
        value={appConfig.download?.path ?? getGlobalContext().appPath.downloads}
      />
      {/* Max Concurrent Downloads */}
      <RadioGroupOption
        keyPath="download.concurrency"
        label={t("settings.download.concurrency_label")}
        description={t("settings.download.concurrency_description")}
        iconName="download"
        value={appConfig.download?.concurrency}
        onChange={(value) => {
          setAppConfig({ keyPath: "download.concurrency", value });
          setConcurrency(value);
        }}
        options={[
          { value: 5, title: `5${t("common.search_result_count")}` },
          { value: 10, title: `10${t("common.search_result_count")}` },
          { value: 15, title: `15${t("common.search_result_count")}` },
        ]}
      />
    </div>
  );
};

export default Download;
