import { Condition, LoadingSpinner } from "@/common";
import { PlaylistOverview, PlayListTable } from "@/components";
import { useAlbumDetail } from "@/hooks";

const sheetItem = {
  artistItem: { url_slug: "audiomack" },
  url_slug: "best-songs-of-24",
} as MusicSheetItem;

export const BestPopularPage = () => {
  const { isLoading, musicList } = useAlbumDetail(sheetItem);

  return (
    <section className="relative size-full">
      <Condition
        condition={!isLoading}
        fallback={
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <LoadingSpinner classname="bg-black/80 size-5" />
          </div>
        }
      >
        <div className="flex gap-2">
          <PlaylistOverview
            playlist={musicList}
            title="The Best Songs of 2024"
            description="Tap in with the hottest tracks of 2024 with our curated selection of the year's best."
          />
        </div>
        <div className="relative my-4 w-full">
          <PlayListTable playlist={musicList} />
        </div>
      </Condition>
    </section>
  );
};
