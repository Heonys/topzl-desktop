import { Condition, IconButton } from "@/common";
import useAlbumDetail from "@/hooks/useAlbumDetail";
import { PlaylistCover } from "./PlaylistCover";
import StaticIcon from "@/icons/StaticIcon";

const mockSheet = {
  artistItem: { url_slug: "ellie_bp" },
  url_slug: "k-pop",
} as MusicSheetItem;

export const QuickRecommend = () => {
  const { isLoading, musicList } = useAlbumDetail(mockSheet);

  return (
    <Condition condition={!isLoading}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          <div className="flex flex-1 items-center gap-2">
            <StaticIcon iconName="record" size={20} />
            <h1 className="font-sans text-2xl font-bold ">빠른 선곡</h1>
          </div>
          <IconButton iconName="more" className="mr-3 self-end" size={25} />
        </div>
        <div className="grid w-full grid-cols-6 gap-3">
          {musicList.slice(0, 18).map((item) => (
            <PlaylistCover key={item.id} musicItem={item} />
          ))}
        </div>
      </div>
    </Condition>
  );
};
