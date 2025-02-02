import { useCurrentMusic } from "@/hooks";
import StaticIcon from "@/icons/StaticIcon";
import { getDefaultImage, setFallbackImage } from "@/utils";
import { MusicItem } from "@shared/plugin/type";
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
          <div className="text-sm text-black/50">{`트랙 ${playlist.length}개 • 업데이트 ${date || new Date().toLocaleDateString()}`}</div>
          <div className="mt-3 text-sm font-medium">{description}</div>
        </div>
        <div className="flex gap-2">
          <button
            className="flex items-center gap-2 rounded-lg bg-blue-200 p-2 px-4 font-sans text-sm font-semibold text-blue-600 opacity-85 hover:opacity-100"
            onClick={() => {
              playWithAddAllPlaylist(playlist[0], playlist);
            }}
          >
            <StaticIcon iconName="play" size={13} />
            전체 재생
          </button>
          <button
            className="flex items-center gap-2 rounded-lg  bg-[#E0E0E0]  p-2 px-4 font-sans text-sm font-semibold opacity-85 hover:opacity-100"
            onClick={() => navigate("/library")}
          >
            <StaticIcon iconName="library-music" size={20} />
            보관함
          </button>
        </div>
      </div>
    </>
  );
}
