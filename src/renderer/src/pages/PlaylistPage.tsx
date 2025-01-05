import { PlayListTable } from "@/components";
import { useCurrentMusic } from "@/hooks";
import StaticIcon from "@/icons/StaticIcon";
import { setFallbackImage, getDefaultImage } from "@/utils";

export const PlaylistPage = () => {
  const { playlist } = useCurrentMusic();

  return (
    <>
      <div className="flex gap-2">
        <img
          className="size-56 rounded-xl object-cover"
          src={getDefaultImage(playlist[0]?.artwork)}
          alt="fallback-image"
          onError={setFallbackImage}
        />
        <div className="m-4 flex w-full flex-col font-sans font-normal">
          <div className="flex flex-1 flex-col gap-1">
            <h1 className="text-2xl font-bold">현재 재생목록</h1>
            <div className="text-sm text-black/50">{`트랙 ${playlist.length}개 • 업데이트 2025-01-02`}</div>
            <div className="mt-3">현재 재생중인 재생목록 입니다</div>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 rounded-lg bg-blue-200 p-2 px-4 font-sans text-sm font-semibold text-blue-600 opacity-85 hover:opacity-100">
              <StaticIcon iconName="play" size={13} />
              전체 재생
            </button>
            <button className="flex items-center gap-2 rounded-lg  bg-[#E0E0E0]  p-2 px-4 font-sans text-sm font-semibold opacity-85 hover:opacity-100">
              <StaticIcon iconName="library-music" size={20} />
              재생목록
            </button>
          </div>
        </div>
      </div>
      <div className="relative my-4 w-full">
        <PlayListTable />
      </div>
    </>
  );
};
