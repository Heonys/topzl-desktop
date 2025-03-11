import { useTranslation } from "react-i18next";
import StaticIcon from "@/icons/StaticIcon";
import { getDefaultImage, setFallbackImage } from "@/utils";
import { AlbumItem } from "@shared/plugin/type";
import { PlayListTable } from "../playlist";
import { useCurrentMusic, useLanguageFont } from "@/hooks";
import { useModal } from "../modal/useModal";
import { twMerge } from "tailwind-merge";

type Props = {
  albumItem: AlbumItem;
};

export const AlbumView = ({ albumItem }: Props) => {
  const { playWithAddAllPlaylist } = useCurrentMusic();
  const { showModal } = useModal();
  const { t } = useTranslation();
  const { fontClass } = useLanguageFont();

  return (
    <>
      <div className="flex gap-2">
        <img
          className="size-56 rounded-xl object-cover"
          src={getDefaultImage(albumItem.artwork)}
          alt="fallback-image"
          onError={setFallbackImage}
        />
        <div className={twMerge("m-4 flex w-full flex-col", fontClass)}>
          <div className="flex flex-1 flex-col gap-1">
            <div className="flex items-center gap-3">
              <div className="rounded-md p-0.5 px-1 text-sm font-bold uppercase text-blue-500 ring-2 ring-blue-300">
                Album
              </div>
              <h1 className="text-2xl font-bold">{albumItem.title}</h1>
            </div>
            <div className="font-bold text-black/80">{albumItem.artist}</div>
            <div className="text-sm text-black/50">{`${t("playlist.track")} ${albumItem._musicList?.length}${t("common.search_result_count")} • ${t("playlist.release_date")} ${albumItem.date || new Date().toLocaleDateString()}`}</div>
          </div>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-2 rounded-lg bg-blue-200 p-2 px-4 font-sans text-sm font-semibold text-blue-600 opacity-85 hover:opacity-100"
              onClick={() => {
                playWithAddAllPlaylist(albumItem._musicList[0], albumItem._musicList);
              }}
            >
              <StaticIcon iconName="play" size={13} />
              {t("search_view.all_play_btn")}
            </button>
            {/* <button
              className={cn(
                "flex items-center gap-2 rounded-lg p-2 bg-[#E0E0E0] font-sans text-sm font-semibold opacity-85 hover:opacity-100",
                like ? "bg-rose-200" : "ring-1 ring-black/10",
              )}
              onClick={() => {
                setLike((prev) => !prev);
              }}
            >
              <StaticIcon
                iconName={like ? "heart-fill" : "heart"}
                size={20}
                color={like ? "red" : "black"}
                className="opacity-70"
              />
              {t("search_view.favorite_btn")}
            </button> */}
            <button
              className="flex items-center gap-2 rounded-lg  bg-[#E0E0E0]  p-2 font-sans text-sm font-semibold opacity-85 hover:opacity-100"
              onClick={() => {
                showModal("CreatePlayList", {
                  title: albumItem.title,
                  description: albumItem.artist,
                  musicItems: albumItem._musicList,
                });
              }}
            >
              <StaticIcon iconName="add-playlist" size={20} />
              {t("search_view.create_playlist_btn")}
            </button>
          </div>
        </div>
      </div>
      <div className="relative my-4 w-full">
        <PlayListTable playlist={albumItem._musicList} />
      </div>
    </>
  );
};
