import { useNavigate } from "react-router-dom";
import { Condition, IconButton } from "@/common";
import { useCurrentMusic } from "@/hooks";
import StaticIcon from "@/icons/StaticIcon";
import { PlaylistCover } from "./PlaylistCover";
import { Empty } from "@/common/Empty";

export const RecentPlayList = () => {
  const { playlist } = useCurrentMusic();
  const navigate = useNavigate();

  return (
    <div className="relative flex h-full flex-col gap-3 rounded-2xl">
      <div className="flex items-center">
        <div className="flex flex-1 items-center gap-2">
          <StaticIcon iconName="history" size={20} />
          <h1 className="font-sans text-2xl font-bold">최근에 재생한 음악</h1>
        </div>
        <IconButton
          iconName="more"
          className="mr-3 self-end"
          size={25}
          onClick={() => {
            navigate("/playlist/current");
          }}
        />
      </div>
      <Condition
        condition={playlist.length > 0}
        fallback={<Empty message="재생목록이 비어있습니다" />}
      >
        <div className="grid w-full grid-cols-4 gap-2">
          {[...playlist]
            .slice(-4)
            .reverse()
            .map((item) => (
              <PlaylistCover key={item.id} musicItem={item} />
            ))}
        </div>
      </Condition>
    </div>
  );
};
