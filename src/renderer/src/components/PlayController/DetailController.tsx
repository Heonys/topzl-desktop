import { IconButton } from "@/common";
import { formatTime } from "@/utils";
import { MusicItem } from "@shared/plugin/type";
import Slider from "rc-slider";

const GRAY = "#EAE6E5";

type Props = {
  currentItem: MusicItem;
};

export const DetailController = ({ currentItem }: Props) => {
  return (
    <div
      className="flex h-4/5 w-2/5 flex-col items-center justify-center gap-4 text-white"
      onClick={(e) => e.stopPropagation()}
    >
      <img
        className="size-[50vh] rounded-2xl object-cover"
        src={currentItem.artwork}
        alt="artwork"
      />
      <div className="flex w-full flex-col gap-4 px-14">
        <div className="flex w-full gap-3">
          <div className="flex w-3/5 flex-col">
            <div className="truncate text-xl">{currentItem.title}</div>
            <div className="truncate text-sm text-gray-300">{currentItem.artist}</div>
          </div>
          <div className="flex flex-1 items-center justify-center gap-1">
            <IconButton color="white" iconName="volume" size={13} opacity />
            <Slider
              min={0}
              max={1}
              step={0.01}
              value={0.5}
              className="cursor-pointer"
              styles={{
                track: { background: "#EAE6E5" },
                handle: { visibility: "hidden" },
                rail: { background: "#888888" },
              }}
            />
          </div>
        </div>
        <div className="flex w-full items-center gap-3">
          <div className="text-xs text-gray-300">{"00:04"}</div>
          <Slider
            min={0}
            max={5}
            step={0.1}
            value={2.5}
            className="cursor-pointer"
            styles={{
              track: { background: "#EAE6E5" },
              handle: { visibility: "hidden" },
              rail: { background: "#888888" },
            }}
          />
          <div className="text-xs text-gray-300">{formatTime(currentItem.duration as number)}</div>
        </div>
        <div className="flex items-center justify-center gap-6">
          <IconButton iconName="repeat" size={13} color={GRAY} />
          <IconButton iconName="skip-previous" size={25} opacity color={GRAY} />
          <IconButton iconName="pause" size={25} opacity color={GRAY} />
          <IconButton iconName="skip-next" size={25} opacity color={GRAY} />
          <IconButton iconName="shuffle" size={13} color={GRAY} />
        </div>
      </div>
    </div>
  );
};
