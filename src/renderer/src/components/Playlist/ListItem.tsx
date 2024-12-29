import { IconButton } from "@/common";
import { formatTime } from "@/utils";
import { MusicItem } from "@shared/plugin/type";
import { twMerge } from "tailwind-merge";

type Props = {
  musicItem: MusicItem;
  rowIndex: number;
  top: number;
  isPlaying?: boolean;
  onRemove: (id: number) => void;
  onChangeMusic: (music: MusicItem) => void;
};

export const ListItem = ({
  musicItem,
  rowIndex,
  top,
  isPlaying = false,
  onChangeMusic,
  onRemove,
}: Props) => {
  return (
    <div
      className={twMerge(
        "flex items-center justify-between p-2 text-sm absolute left-0 w-full",
        isPlaying ? "bg-blue-100" : "hover:bg-gray-100",
      )}
      style={{ top }}
      onDoubleClick={() => {
        onChangeMusic(musicItem);
      }}
    >
      <div className="flex w-[150px] gap-3 truncate">
        <div>{rowIndex}.</div>
        <div>{musicItem.title}</div>
      </div>
      <div className="w-[100px] truncate">{musicItem.artist}</div>
      <div>{formatTime(musicItem.duration || 0)}</div>
      <IconButton
        iconName="trash"
        size={15}
        onClick={(e) => {
          e.stopPropagation();
          onRemove(musicItem.id);
        }}
      />
    </div>
  );
};
