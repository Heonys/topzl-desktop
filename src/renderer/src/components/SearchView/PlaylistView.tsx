import StaticIcon from "@/icons/StaticIcon";
import { getDefaultImage, setFallbackImage } from "@/utils";
import { MusicSheetItem } from "@shared/plugin/type";

type Props = {
  playlistId: string;
  playlistItem: MusicSheetItem;
};

export const PlaylistView = ({ playlistItem }: Props) => {
  console.log(playlistItem);

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
              <h1 className="text-2xl font-bold">{playlistItem.title}</h1>
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
            <button className="flex items-center gap-2 rounded-lg bg-blue-200 p-2 px-4 font-sans text-sm font-semibold text-blue-600 opacity-85 hover:opacity-100">
              <StaticIcon iconName="play" size={13} />
              전체 재생
            </button>
            <button className="flex items-center gap-2 rounded-lg  bg-[#E0E0E0]  p-2 font-sans text-sm font-semibold opacity-85 hover:opacity-100">
              <StaticIcon iconName="heart" size={20} />
              좋아요
            </button>
          </div>
        </div>
      </div>
      <div className="relative my-4 w-full">
        {/* <PlayListTable playlist={albumItem._musicList} setPlaylist={() => {}} /> */}
      </div>
    </>
  );
};
