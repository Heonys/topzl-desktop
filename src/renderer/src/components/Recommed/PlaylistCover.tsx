import { useCurrentMusic } from "@/hooks";
import StaticIcon from "@/icons/StaticIcon";

type Props = {
  musicItem: MusicItem;
};

export const PlaylistCover = ({ musicItem }: Props) => {
  const { playMusicWithAddPlaylist } = useCurrentMusic();
  return (
    <div className="group flex flex-col gap-2">
      <div
        className="relative aspect-square flex-1 overflow-hidden rounded-xl group-hover:opacity-90"
        onDoubleClick={() => {
          playMusicWithAddPlaylist(musicItem);
        }}
      >
        <div
          className="size-full bg-cover bg-center transition-transform duration-300 ease-out group-hover:scale-110"
          style={{ backgroundImage: `url(${musicItem.artwork})` }}
        />
        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 p-2.5 backdrop-blur transition-all group-hover:flex">
          <StaticIcon
            iconName="play"
            color="white"
            className="cursor-pointer"
            onClick={() => {
              playMusicWithAddPlaylist(musicItem);
            }}
          />
        </div>
      </div>
      <div className="flex w-full flex-col items-start">
        <div className="w-full truncate text-sm" title={musicItem.title}>
          {musicItem.title}
        </div>
        <div className="w-full truncate text-xs text-gray-600">{musicItem.artist}</div>
      </div>
    </div>
  );
};
