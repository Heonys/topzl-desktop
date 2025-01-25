import { Condition, IconButton } from "@/common";
import { useCurrentMusic } from "@/hooks";
import { PlaylistCover } from "./PlaylistCover";
import StaticIcon from "@/icons/StaticIcon";

export const RecentPlayList = () => {
  const { playlist } = useCurrentMusic();

  return (
    <Condition condition={playlist.length > 0}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          <div className="flex flex-1 items-center gap-2">
            <StaticIcon iconName="history" size={20} />
            <h1 className="font-sans text-2xl font-bold">최근에 재생한 음악</h1>
          </div>
          <IconButton iconName="more" className="mr-3 self-end" size={25} />
        </div>
        <div className="grid w-full grid-cols-6 gap-3">
          {[...playlist]
            .slice(-6)
            .reverse()
            .map((item) => (
              <PlaylistCover key={item.id} musicItem={item} />
            ))}
        </div>
      </div>
    </Condition>
  );
};
