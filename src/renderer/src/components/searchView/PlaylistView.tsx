import { Condition, LoadingSpinner } from "@/common";
import { useAlbumDetail } from "@/hooks/useAlbumDetail";
import StaticIcon from "@/icons/StaticIcon";
import { cn, getDefaultImage, setFallbackImage } from "@/utils";
import { MusicSheetItem } from "@shared/plugin/type";
import { PlayListTable } from "../playlist";
import { useState } from "react";
import { useCurrentMusic } from "@/hooks";
import { useModal } from "../modal/useModal";

type Props = {
  playlistItem: MusicSheetItem;
};

export const PlaylistView = ({ playlistItem }: Props) => {
  const { playWithAddAllPlaylist } = useCurrentMusic();
  const { isLoading, musicList } = useAlbumDetail(playlistItem);
  const [like, setLike] = useState(false);
  const { showModal } = useModal();

  return (
    <>
      <div className="flex gap-2">
        <img
          className="size-56 rounded-xl object-cover"
          src={getDefaultImage(playlistItem.artwork)}
          alt="fallback-image"
          onError={setFallbackImage}
        />
        <div className="m-4 flex w-full flex-col font-sans font-normal">
          <div className="flex flex-1 flex-col gap-1">
            <div className="flex items-center gap-3">
              <div className="rounded-md p-0.5 px-1 text-sm font-bold uppercase text-blue-500 ring-2 ring-blue-300">
                Playlist
              </div>
              <h1 className="max-w-lg truncate text-2xl font-bold">{playlistItem.title}</h1>
            </div>

            <div className="flex items-center gap-2">
              <img
                className="size-5 rounded-full object-cover"
                src={getDefaultImage(playlistItem.artistItem.avatar)}
                alt="fallback-image"
                onError={setFallbackImage}
              />
              <div className="font-bold text-black/80">{playlistItem.artist}</div>
            </div>
            <div className="text-sm text-black/50">{`트랙 ${playlistItem.worksNum}개 • 생성일 ${playlistItem.createAt}`}</div>
          </div>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-2 rounded-lg bg-blue-200 p-2 px-4 font-sans text-sm font-semibold text-blue-600 opacity-85 hover:opacity-100"
              onClick={() => {
                playWithAddAllPlaylist(musicList[0], musicList);
              }}
            >
              <StaticIcon iconName="play" size={13} />
              전체 재생
            </button>
            <button
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
              좋아요
            </button>
            <button
              className="flex items-center gap-2 rounded-lg  bg-[#E0E0E0]  p-2 font-sans text-sm font-semibold opacity-85 hover:opacity-100"
              onClick={() => {
                showModal("CreatePlayList", {
                  title: playlistItem.title,
                  description: playlistItem.artist,
                  musicItems: musicList,
                });
              }}
            >
              <StaticIcon iconName="add-playlist" size={20} />
              재생목록 만들기
            </button>
          </div>
        </div>
      </div>
      <div className="relative my-4 h-[45vh] w-full">
        <Condition
          condition={!isLoading}
          fallback={
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <LoadingSpinner classname="bg-slate-500" />
            </div>
          }
        >
          <PlayListTable playlist={musicList} />
        </Condition>
      </div>
    </>
  );
};
