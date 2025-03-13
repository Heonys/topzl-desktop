import { useTranslation } from "react-i18next";
import { LabsFeature } from "@/components/setting/common";

const Experimental = () => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col gap-4 py-5 pt-4">
      <LabsFeature
        title={t("settings.labs.desktopCapture_label")}
        description={t("settings.labs.desktopCapture_description")}
        iconName="capture"
        kbd={["Ctrl", "F12"]}
      />
      <LabsFeature
        title={t("settings.labs.trackInfoCopy_label")}
        description={t("settings.labs.trackInfoCopy_description")}
        iconName="copy"
        kbd={["Ctrl", "F11"]}
      />
    </div>
  );
};

export default Experimental;
