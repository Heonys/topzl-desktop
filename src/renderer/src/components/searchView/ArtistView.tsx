import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { useTranslation } from "react-i18next";
import { useCurrentMusic, useLanguageFont } from "@/hooks";
import { getDefaultImage, setFallbackImage } from "@/utils";
import { ArtistItem } from "@shared/plugin/type";
import StaticIcon from "@/icons/StaticIcon";
import { PlayListTable } from "../playlist";
import { Condition, LoadingSpinner } from "@/common";
import { useModal } from "../modal/useModal";

type Props = {
  artistItem: ArtistItem;
};

export const ArtistView = ({ artistItem }: Props) => {
  const [musicItems, setMusicItems] = useState<MusicItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { playWithAddAllPlaylist } = useCurrentMusic();
  const { showModal } = useModal();
  const { t } = useTranslation();
  const { fontClass } = useLanguageFont();

  useEffect(() => {
    setIsLoading(true);
    window.plugin.searchArtist(artistItem).then((res) => {
      setMusicItems(res.data);
      setIsLoading(false);
    });
  }, [artistItem]);

  return (
    <>
      <div className="flex gap-2">
        <img
          className="size-56 rounded-xl object-cover"
          src={getDefaultImage(artistItem.avatar)}
          alt="fallback-image"
          onError={setFallbackImage}
        />
        <div className={twMerge("m-4 flex w-full flex-col", fontClass)}>
          <div className="flex flex-1 flex-col gap-1">
            <div className="flex items-center gap-3">
              <div className="rounded-md p-0.5 px-1 text-sm font-bold uppercase text-blue-500 ring-2 ring-blue-300">
                Artist
              </div>
              <h1 className="text-2xl font-bold">{artistItem.name}</h1>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-2 rounded-lg bg-blue-200 p-2 px-4 font-sans text-sm font-semibold text-blue-600 opacity-85 hover:opacity-100"
              onClick={() => {
                if (musicItems.length > 0) {
                  playWithAddAllPlaylist(musicItems[0], musicItems);
                }
              }}
            >
              <StaticIcon iconName="play" size={13} />
              {t("search_view.all_play_btn")}
            </button>
            <button
              className="flex items-center gap-2 rounded-lg  bg-[#E0E0E0]  p-2 font-sans text-sm font-semibold opacity-85 hover:opacity-100"
              onClick={() => {
                showModal("CreatePlayList", {
                  title: artistItem.name,
                  musicItems,
                });
              }}
            >
              <StaticIcon iconName="add-playlist" size={20} />
              {t("search_view.create_playlist_btn")}
            </button>
          </div>
        </div>
      </div>
      <div className="relative my-4 h-1/2 w-full">
        <Condition
          condition={!isLoading}
          fallback={
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <LoadingSpinner classname="bg-black/80 size-5" />
            </div>
          }
        >
          <PlayListTable playlist={musicItems} />
        </Condition>
      </div>
    </>
  );
};
