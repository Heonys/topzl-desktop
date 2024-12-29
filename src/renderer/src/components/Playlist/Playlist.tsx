import { useCurrentMusic } from "@/hooks";
import { ListItem } from "./ListItem";
import { MusicItem } from "@shared/plugin/type";
import { useRef } from "react";
import { useVirtualScroll } from "@/hooks/useVirtualScroll";

export const Playlist = () => {
  const scrollElementRef = useRef<HTMLDivElement>(null);
  const { currentItem, setCurrentItem, playlist, removePlaylist } = useCurrentMusic();

  const virtualController = useVirtualScroll({
    data: playlist,
    estimizeItemHeight: 2.6 * 13,
    getScrollElement: () => scrollElementRef.current!,
  });

  const onChangeMusic = (music: MusicItem) => {
    setCurrentItem(music);
  };

  const onRemove = (id: number) => {
    removePlaylist(id);
  };

  return (
    <div className="m-3">
      <div className="text-xl">Playlist</div>
      <div className="my-2 h-px w-full bg-black/10" />
      <div className="relative flex flex-col gap-1" ref={scrollElementRef}>
        {virtualController.virtualItems.map((virtualItem, index) => {
          const { dataItem, rowIndex, top } = virtualItem;
          return (
            <ListItem
              key={rowIndex}
              rowIndex={index + 1}
              top={top}
              musicItem={dataItem}
              isPlaying={dataItem.id === currentItem?.id}
              onRemove={onRemove}
              onChangeMusic={onChangeMusic}
            />
          );
        })}
      </div>
    </div>
  );
};
