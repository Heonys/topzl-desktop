import { useCurrentMusic } from "@/hooks";

type Props = {
  musicItem: MusicItem;
};

export const PlaylistCover = ({ musicItem }: Props) => {
  const { playMusicWithAddPlaylist } = useCurrentMusic();
  return (
    <div className="group flex flex-col gap-2">
      <div
        className="relative aspect-square flex-1 overflow-hidden rounded-xl opacity-85 group-hover:opacity-100"
        onDoubleClick={() => {
          playMusicWithAddPlaylist(musicItem);
        }}
      >
        <div
          className="size-full bg-cover bg-center transition-transform duration-300 ease-out group-hover:scale-110"
          style={{ backgroundImage: `url(${musicItem.artwork})` }}
        />
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
