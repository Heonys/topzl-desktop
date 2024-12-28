import { IconButton } from "@/common";
import { useCurrentMusic } from "@/hooks";
import { formatTime } from "@/utils";
import { MusicItem } from "@shared/plugin/type";
import { twMerge } from "tailwind-merge";

type Props = {
  musicItem: MusicItem;
  rowIndex: number;
  isPlaying?: boolean;
};

export const ListItem = ({ musicItem, rowIndex, isPlaying = false }: Props) => {
  const { setCurrentItem, removePlaylist } = useCurrentMusic();
  return (
    <div
      className={twMerge(
        "flex items-center justify-between p-2 text-sm",
        isPlaying ? "bg-blue-100" : "hover:bg-gray-100",
      )}
      onDoubleClick={() => {
        setCurrentItem(musicItem);
      }}
    >
      <div className="flex gap-4">
        <div>{rowIndex}.</div>
        <div>{musicItem.title}</div>
      </div>
      <div>{musicItem.artist}</div>
      <div>{formatTime(musicItem.duration || 0)}</div>
      <IconButton
        iconName="trash"
        size={15}
        onClick={(e) => {
          e.stopPropagation();
          removePlaylist(musicItem.id);
        }}
      />
    </div>
  );
};
