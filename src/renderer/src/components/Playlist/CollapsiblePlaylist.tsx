import { useCurrentMusic } from "@/hooks";
import { ListItem } from "./ListItem";
import { MusicItem } from "@shared/plugin/type";
import { useRef } from "react";
import { useVirtualScroll } from "@/hooks/useVirtualScroll";

export const CollapsiblePlaylist = () => {
  const scrollElementRef = useRef<HTMLDivElement>(null);
  const { currentItem, setCurrentItem, playlist, setPlaylist, removePlaylist } = useCurrentMusic();

  const virtualController = useVirtualScroll({
    data: playlist,
    estimizeItemHeight: 2.6 * 13,
    renderCount: 25,
    getScrollElement: () => scrollElementRef.current!,
  });

  const onChangeMusic = (music: MusicItem) => {
    setCurrentItem(music);
  };

  const onRemove = (id: string) => {
    removePlaylist(id);
  };

  const onDrop = (from: number, to: number) => {
    if (from === to) return;
    const newData = [...playlist.slice(0, from), ...playlist.slice(from + 1)];
    newData.splice(from > to ? to : to - 1, 0, playlist[from]);
    setPlaylist(newData);
  };

  return (
    <div className="m-3 h-full">
      <div>
        <div className="flex items-center px-2 font-sans text-xl font-semibold">
          <div className="flex-1">현재 재생목록 {`(${playlist.length})`}</div>
        </div>
      </div>
      <div className="my-2 h-px w-full bg-black/10" />
      <div className="flex w-full items-center justify-between p-2 font-sans font-bold">
        <div className="flex w-[190px] gap-3">
          <div>Track</div>
        </div>
        <div className="w-[120px]">Artist</div>
        <div className="flex-1">Time</div>
      </div>
      <div className=" h-[68%] overflow-y-auto overflow-x-hidden" ref={scrollElementRef}>
        <div
          className="relative flex flex-col gap-1"
          style={{ height: virtualController.totalHeight }}
        >
          {virtualController.virtualItems.map((virtualItem) => {
            const { dataItem, rowIndex, top } = virtualItem;
            return (
              <ListItem
                key={rowIndex}
                rowIndex={rowIndex}
                top={top}
                musicItem={dataItem}
                isPlaying={dataItem.id === currentItem?.id}
                onRemove={onRemove}
                onChangeMusic={onChangeMusic}
                onDrop={onDrop}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
