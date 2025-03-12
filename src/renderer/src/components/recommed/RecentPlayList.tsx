import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Condition, IconButton } from "@/common";
import { useCurrentMusic, useLanguageFont } from "@/hooks";
import StaticIcon from "@/icons/StaticIcon";
import { PlaylistCover } from "./PlaylistCover";
import { Empty } from "@/common/Empty";
import { twMerge } from "tailwind-merge";

export const RecentPlayList = () => {
  const { playlist } = useCurrentMusic();
  const navigate = useNavigate();
  const { fontClass } = useLanguageFont();
  const { t } = useTranslation();

  return (
    <div className="relative flex h-full flex-col gap-3 rounded-2xl" tabIndex={-1}>
      <div className="flex items-center">
        <div className="flex flex-1 items-center gap-2">
          <StaticIcon iconName="history" size={20} />
          <h1 className={twMerge("text-2xl font-bold", fontClass)}>{t("home.recent_played")}</h1>
        </div>
        <IconButton
          iconName="more"
          className="mr-3 self-end"
          size={25}
          onClick={() => {
            navigate("/playlist/current");
          }}
        />
      </div>
      <Condition
        condition={playlist.length > 0}
        fallback={<Empty message={t("common.empty_playlist")} />}
      >
        <div className="grid w-full grid-cols-4 gap-2">
          {[...playlist]
            .slice(-4)
            .reverse()
            .map((item) => (
              <PlaylistCover key={item.id} musicItem={item} />
            ))}
        </div>
      </Condition>
    </div>
  );
};
