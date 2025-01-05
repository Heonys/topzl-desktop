import { getDefaultImage, setFallbackImage } from "@/utils";
import { MusicItem } from "@shared/plugin/type";

type Props = {
  title: string;
  playlist: MusicItem[];
  date: string;
  onClick: () => void;
};

export function PlaylistCover({ title, playlist, date, onClick }: Props) {
  return (
    <div
      className="flex h-16 w-full items-center gap-2 rounded-lg hover:bg-black/10"
      onClick={onClick}
    >
      <img
        className="h-full rounded-md object-cover"
        src={getDefaultImage(playlist[0]?.artwork)}
        alt="cover-image"
        onError={setFallbackImage}
      />
      <div className="flex w-full flex-col gap-1">
        <div>{title}</div>
        <div className="text-sm text-black/30">{`트랙 ${playlist.length}개 • 업데이트 ${date}`}</div>
      </div>
    </div>
  );
}
