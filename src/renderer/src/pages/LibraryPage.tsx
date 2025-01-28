import { Tab, TabGroup, TabList } from "@headlessui/react";
import { AlbumCover } from "@/components";
import { useCurrentMusic, useFavorite, useLibrary } from "@/hooks";
import { useModal } from "@/components/Modal/useModal";
import { getDefaultImage, setFallbackImage } from "@/utils";
import StaticIcon from "@/icons/StaticIcon";
import { PlaylistInfo } from "@/atom";
import { useState } from "react";
import { Condition } from "@/common";
import { useNavigate } from "react-router-dom";

export const LibraryPage = () => {
  const navigate = useNavigate();
  const { playLists, removePlaylist } = useLibrary();
  const { showModal } = useModal();
  const { favoriteList } = useFavorite();
  const { playlist } = useCurrentMusic();
  const initSelect = {
    type: "favorite",
    title: "좋아요 표시한 음악",
    description: "좋아요 표시한 음악 목록 입니다.",
    data: favoriteList,
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
              <div className="text-sm text-black/50">{`트랙 ${selectedList?.data.length}개 • 업데이트 ${selectedList?.date}`}</div>
            </Condition>
            <div className="mt-3 text-sm font-medium">{selectedList?.description}</div>
          </div>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-2 rounded-lg bg-blue-200 p-2 px-4 font-sans text-sm font-semibold text-blue-600 opacity-85 hover:opacity-100"
              onClick={() => {
                navigate(`/playlist/${selectedList.type ?? selectedList.title}`);
              }}
            >
              <StaticIcon iconName="playlist" size={20} />
              재생목록으로 이동
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
                재생목록 삭제
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="relative my-4 w-full">
        <TabGroup>
          <TabList className="flex gap-4 font-sans font-semibold">
            <Tab className="border-b-4 border-blue-300 transition-all">보관함</Tab>
          </TabList>
          <div className="grid max-h-[320px] grid-cols-6 place-items-center gap-2 overflow-y-auto pt-2">
            <AlbumCover
              title="새 재생목록 추가"
              iconName="plus"
              onClick={() => showModal("CreatePlayList")}
            />
            <AlbumCover
              title="좋아요 표시한 음악"
              iconName="apple"
              coverUrl={favoriteList[0]?.artwork}
              onDoubleClick={() => navigate("/playlist/favorite")}
              onClick={() => {
                handleSelectView({
                  type: "favorite",
                  title: "좋아요 표시한 음악",
                  description: "좋아요 표시한 음악 목록 입니다.",
                  data: favoriteList,
                });
              }}
            />
            <AlbumCover
              title="현재 재생목록"
              iconName="playlist"
              coverUrl={playlist[0]?.artwork}
              onDoubleClick={() => navigate("/playlist/current")}
              onClick={() => {
                handleSelectView({
                  type: "current",
                  title: "현재 재생목록",
                  description: "현재 재생중인 목록 입니다.",
                  data: playlist,
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
        </TabGroup>
      </div>
    </section>
  );
};
