import { useCurrentMusic } from "@/hooks";
import StaticIcon from "@/icons/StaticIcon";
import { getDefaultImage, setFallbackImage } from "@/utils";
import { MusicItem } from "@shared/plugin/type";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type Props = {
  playlist: MusicItem[];
  title: string;
  description?: string;
  date?: string;
};

export function PlaylistOverview({ playlist, title, description, date }: Props) {
  const { playWithAddAllPlaylist } = useCurrentMusic();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <img
        className="size-56 rounded-xl object-cover"
        src={getDefaultImage(playlist[0]?.artwork)}
        alt="fallback-image"
        onError={setFallbackImage}
      />
      <div className="m-4 flex w-full flex-col font-sans font-normal">
        <div className="flex flex-1 flex-col gap-1">
          <h1 className="text-2xl font-bold">{title}</h1>
          <div className="text-sm text-black/50">{`${t("playlist.track")} ${playlist.length}${t("common.search_result_count")} • ${t("playlist.update")} ${date || new Date().toLocaleDateString()}`}</div>
          <div className="mt-3 text-sm font-medium">{description}</div>
        </div>
        <div className="flex gap-2">
          <button
            tabIndex={-1}
            className="flex items-center gap-2 rounded-lg bg-blue-200 p-2 px-4 font-sans text-sm font-semibold text-blue-600 opacity-85 hover:opacity-100"
            onClick={() => {
              playWithAddAllPlaylist(playlist[0], playlist);
            }}
          >
            <StaticIcon iconName="play" size={13} />
            {t("playlist.all_play_btn")}
          </button>
          <button
            tabIndex={-1}
            className="flex items-center gap-2 rounded-lg  bg-[#E0E0E0]  p-2 px-4 font-sans text-sm font-semibold opacity-85 hover:opacity-100"
            onClick={() => navigate("/library")}
          >
            <StaticIcon iconName="library-music" size={20} />
            {t("playlist.navigate_library_btn")}
          </button>
        </div>
      </div>
    </>
  );
}
