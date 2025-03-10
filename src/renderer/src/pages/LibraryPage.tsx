import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AlbumCover } from "@/components";
import { useCurrentMusic, useFavorite, useLibrary } from "@/hooks";
import { useModal } from "@/components/modal/useModal";
import { getDefaultImage, setFallbackImage } from "@/utils";
import StaticIcon from "@/icons/StaticIcon";
import { PlaylistInfo } from "@/atom";
import { Condition } from "@/common";

export const LibraryPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { playLists, removePlaylist } = useLibrary();
  const { showModal } = useModal();
  const { favoriteList, latestFavorite } = useFavorite();
  const { playlist, latestPlaylist } = useCurrentMusic();
  const initSelect = {
    type: "favorite",
    title: t("playlist.favorite_playlist.playlist_title"),
    description: t("playlist.favorite_playlist.playlist_discription"),
    data: favoriteList,
    date: latestFavorite,
  } as PlaylistInfo;
  const [selectedList, setSelectedList] = useState<PlaylistInfo>(initSelect);
  const isCustomPlaylist = !selectedList.type;

  const handleSelectView = (info: PlaylistInfo) => {
    setSelectedList(info);
  };

  return (
    <section>
      <div className="flex gap-2">
        <img
          className="size-56 rounded-xl object-cover"
          src={getDefaultImage(selectedList?.data[0]?.artwork)}
          alt="fallback-image"
          onError={setFallbackImage}
        />
        <div className="m-4 flex w-full flex-col font-sans font-normal">
          <div className="flex flex-1 flex-col gap-1  ">
            <div className="flex items-center gap-2">
              <div className="max-w-[500px] truncate bg-transparent text-2xl font-bold ">
                {selectedList?.title}
              </div>
              {isCustomPlaylist && (
                <StaticIcon
                  iconName="rename"
                  size={15}
                  onClick={() =>
                    showModal("RenamePlaylist", {
                      title: selectedList.title,
                      callback: (newTitle: string) =>
                        setSelectedList((prev) => ({ ...prev, title: newTitle })),
                    })
                  }
                />
              )}
            </div>
            <Condition condition={selectedList}>
              <div className="text-sm text-black/50">{`${t("playlist.track")} ${selectedList?.data.length}${t("common.search_result_count")} • ${t("playlist.update")} ${selectedList?.date}`}</div>
            </Condition>
            <div className="mt-3 text-sm font-medium">{selectedList?.description}</div>
          </div>
          <div className="flex gap-2">
            <button
              tabIndex={-1}
              className="flex items-center gap-2 rounded-lg bg-blue-200 p-2 px-4 font-sans text-sm font-semibold text-blue-600 opacity-85 hover:opacity-100"
              onClick={() => {
                navigate(`/playlist/${selectedList.type ?? selectedList.title}`);
              }}
            >
              <StaticIcon iconName="playlist" size={20} />
              {t("playlist.navigate_playlist_btn")}
            </button>
            {isCustomPlaylist && (
              <button
                className="flex items-center gap-2 rounded-lg  bg-[#E0E0E0]  p-2 px-4 font-sans text-sm font-semibold opacity-85 hover:opacity-100"
                onClick={() => {
                  removePlaylist(selectedList.title);
                  setSelectedList(initSelect);
                }}
              >
                <StaticIcon iconName="trash" size={15} />
                {t("playlist.remove_playlist_btn")}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="relative my-4 w-full">
        <div>
          <div className="flex gap-4 font-sans font-semibold">
            <div className="border-b-4 border-blue-300 transition-all">
              {t("playlist.tab_menu_name")}
            </div>
          </div>
          <div className="grid max-h-[320px] grid-cols-6 place-items-center gap-2 overflow-y-auto pt-2">
            <AlbumCover
              title={t("playlist.add_new_playlist")}
              iconName="plus"
              onClick={() => showModal("CreatePlayList")}
            />
            <AlbumCover
              title={t("playlist.favorite_playlist.playlist_title")}
              iconName="apple"
              coverUrl={favoriteList[0]?.artwork}
              onDoubleClick={() => navigate("/playlist/favorite")}
              onClick={() => {
                handleSelectView({
                  type: "favorite",
                  title: t("playlist.favorite_playlist.playlist_title"),
                  description: t("playlist.favorite_playlist.playlist_discription"),
                  data: favoriteList,
                  date: latestFavorite,
                });
              }}
            />
            <AlbumCover
              title={t("playlist.current_playlist.playlist_title")}
              iconName="playlist"
              coverUrl={playlist[0]?.artwork}
              onDoubleClick={() => navigate("/playlist/current")}
              onClick={() => {
                handleSelectView({
                  type: "current",
                  title: t("playlist.current_playlist.playlist_title"),
                  description: t("playlist.current_playlist.playlist_discription"),
                  data: playlist,
                  date: latestPlaylist,
                });
              }}
            />
            {playLists.map((info) => {
              return (
                <AlbumCover
                  key={info.title}
                  title={info.title}
                  coverUrl={info.data[0]?.artwork}
                  iconName="playlist"
                  onDoubleClick={() => navigate(`/playlist/${info.title}`)}
                  onClick={() => handleSelectView(info)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
