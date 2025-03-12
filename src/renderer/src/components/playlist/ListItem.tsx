import { IconButton } from "@/common";
import { Condition, Droppable } from "@/common";
import { assignToDrag, formatTime } from "@/utils";
import { MusicItem } from "@shared/plugin/type";
import { twMerge } from "tailwind-merge";

type Props = {
  musicItem: MusicItem;
  top: number;
  isPlaying?: boolean;
  rowIndex: number;
  onRemove: (id: string) => void;
  onChangeMusic: (music: MusicItem) => void;
  onDrop: (from: number, to: number) => void;
};

const TAG = "playlist";

export const ListItem = ({
  musicItem,
  top,
  rowIndex,
  isPlaying,
  onChangeMusic,
  onRemove,
  onDrop,
}: Props) => {
  return (
    <div
      className={twMerge(
        "even:bg-black/5 h-[2.2rem] px-2",
        "flex items-center justify-between text-xs absolute left-0 w-full font-sans font-semibold",
        isPlaying ? "!bg-blue-100" : "hover:bg-gray-100",
      )}
      style={{ top }}
      onDoubleClick={() => {
        onChangeMusic(musicItem);
      }}
      draggable
      onDragStart={(e) => {
        assignToDrag(e, TAG, rowIndex);
      }}
    >
      <div className="flex w-[150px] gap-3 overflow-hidden">
        <div className="truncate" title={musicItem.title}>
          {musicItem.title}
        </div>
      </div>
      <div className="w-[100px] truncate" title={musicItem.artist}>
        {musicItem.artist}
      </div>
      <div>{formatTime(musicItem.duration || 0)}</div>
      <IconButton
        iconName="x-mark"
        opacity
        size={15}
        onClick={(e) => {
          e.stopPropagation();
          onRemove(musicItem.id);
        }}
      />
      <Condition condition={rowIndex === 0}>
        <Droppable position="top" rowIndex={rowIndex} tag={TAG} onDrop={onDrop} />
      </Condition>
      <Droppable position="bottom" rowIndex={rowIndex + 1} tag={TAG} onDrop={onDrop} />
    </div>
  );
};
