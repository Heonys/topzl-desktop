import { useCurrentMusic } from "@/hooks";
import { ListItem } from "./ListItem";

export const Playlist = () => {
  const { playlist, currentItem } = useCurrentMusic();

  return (
    <div className="m-3">
      <div className="text-xl">Playlist</div>
      <div className="my-2 h-px w-full bg-black/10" />
      <div className="flex flex-col gap-1">
        {playlist.map((it, index) => {
          return (
            <ListItem
              key={it.id}
              rowIndex={index + 1}
              musicItem={it}
              isPlaying={it.id === currentItem?.id}
            />
          );
        })}
      </div>
    </div>
  );
};
