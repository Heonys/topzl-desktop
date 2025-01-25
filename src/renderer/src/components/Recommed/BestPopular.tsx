import { Condition, IconButton } from "@/common";
import useAlbumDetail from "@/hooks/useAlbumDetail";
import { PlaylistCover } from "./PlaylistCover";

const mockSheet = {
  artistItem: { url_slug: "audiomack" },
  url_slug: "best-songs-of-24",
} as MusicSheetItem;

export const BestPopular = () => {
  const { isLoading, musicList } = useAlbumDetail(mockSheet);

  return (
    <Condition condition={!isLoading}>
      <div className="flex items-center">
        <h1 className="flex-1 font-sans text-2xl font-bold">2024년 베스트</h1>
        <IconButton iconName="more" className="mr-3 self-end" size={25} />
      </div>
      <div className="mt-5 max-w-[880px]">
        <div className="grid w-full grid-cols-5 gap-3">
          {musicList.slice(0, 5).map((item) => (
            <PlaylistCover key={item.id} musicItem={item} />
          ))}
        </div>
      </div>
    </Condition>
  );
};
