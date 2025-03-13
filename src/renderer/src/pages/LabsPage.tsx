import { twMerge } from "tailwind-merge";
import { useLanguageFont } from "@/hooks";
import StaticIcon, { IconNames } from "@/icons/StaticIcon";
import { Condition, Kbd } from "@/common";
import { useTranslation } from "react-i18next";

export const LabsPage = () => {
  const { fontClass } = useLanguageFont();
  const { t } = useTranslation();

  return (
    <section className={twMerge("font-bold", fontClass)}>
      <h1 className="text-2xl">{t("settings.section.experimental")}</h1>
      <div className="flex h-[75vh] w-full flex-col gap-4 overflow-y-auto py-5 pt-4">
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
        <LabsFeature
          title="동영상 스트리밍"
          iconName="video"
          description="뮤직비디오를 검색하고 감상할 수 있도록 동영상 스트리밍을 지원합니다."
        />
      </div>
    </section>
  );
};

type Props = {
  title: string;
  description: string;
  iconName: IconNames;
  kbd?: string[];
};

function LabsFeature({ title, description, iconName, kbd = [] }: Props) {
  return (
    <div className="my-2 flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <StaticIcon iconName={iconName} size={17} />
          <div className="flex items-center gap-3 text-sm font-bold text-black">
            {title}
            <Condition condition={kbd}>
              <div className="flex items-center gap-1.5">
                {kbd.map((key, index) => (
                  <span key={index} className="flex items-center gap-1">
                    <Kbd>{key}</Kbd>
                    {index < kbd.length - 1 && <span>+</span>}
                  </span>
                ))}
              </div>
            </Condition>
          </div>
        </div>
        <div className="whitespace-pre text-sm text-black/50">{description}</div>
      </div>
    </div>
  );
}
