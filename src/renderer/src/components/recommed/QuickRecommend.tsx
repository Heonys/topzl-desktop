import { useTranslation } from "react-i18next";
import { Condition, LoadingSpinner } from "@/common";
import { useRecommendList } from "@/hooks/useAlbumDetail";
import { PlaylistCover } from "./PlaylistCover";
import StaticIcon from "@/icons/StaticIcon";
import { useLanguageFont } from "@/hooks";
import { twMerge } from "tailwind-merge";

export const QuickRecommend = () => {
  const { isLoading, musicList } = useRecommendList();
  const { fontClass } = useLanguageFont();
  const { t } = useTranslation();

  return (
    <Condition
      condition={!isLoading}
      fallback={
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <LoadingSpinner classname="bg-black/80 size-5" />
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          <div className="flex flex-1 items-center gap-2">
            <StaticIcon iconName="record" size={20} />
            <h1 className={twMerge("text-2xl font-bold", fontClass)}>
              {t("home.quick_selection")}
            </h1>
          </div>
        </div>
        <div className="grid w-full grid-cols-5 gap-3">
          {musicList.slice(0, 60).map((item) => (
            <PlaylistCover key={item.id} musicItem={item} />
          ))}
        </div>
      </div>
    </Condition>
  );
};
