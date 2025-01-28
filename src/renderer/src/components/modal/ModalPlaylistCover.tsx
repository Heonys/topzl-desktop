import { MusicItem } from "@shared/plugin/type";
import StaticIcon from "@/icons/StaticIcon";
import { getDefaultImage, setFallbackImage } from "@/utils";
import { useModal } from "./useModal";

type Props = {
  title: string;
  playlist: MusicItem[];
  date: string;
  onClick: () => void;
};

export function ModalPlaylistCover({ title, playlist, date, onClick }: Props) {
  return (
    <div
      className="flex h-16 w-full cursor-pointer items-center gap-2 rounded-lg hover:bg-black/5"
      onClick={onClick}
    >
      <img
        className="size-[60px] rounded-md object-cover"
        src={getDefaultImage(playlist[0]?.artwork)}
        alt="cover-image"
        onError={setFallbackImage}
      />
      <div className="flex w-full flex-1 flex-col gap-1 truncate">
        <div className="truncate">{title}</div>
        <div className="text-sm text-black/30">{`트랙 ${playlist.length}개 • 업데이트 ${date}`}</div>
      </div>
    </div>
  );
}

export function ModalNewPlaylistCover({ selectedItem }: { selectedItem: MusicItem }) {
  const { showModal } = useModal();
  return (
    <div
      className="flex h-16 w-full cursor-pointer items-center gap-2 rounded-lg hover:bg-black/5"
      onClick={() =>
        showModal("CreatePlayList", {
          overrideClose: () => showModal("SelectPlaylist", { selectedItem }),
        })
      }
    >
      <div className="relative flex size-[60px] items-center justify-center rounded-md bg-slate-500/80">
        <StaticIcon iconName="plus" color="white" size={20} />
      </div>
      <div className="flex flex-1 truncate">
        <div className="truncate">새 재생목록</div>
      </div>
    </div>
  );
}
