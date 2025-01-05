import { PlaylistOverview, PlayListTable } from "@/components";
import { useFavorite } from "@/hooks";

export const FavoritePage = () => {
  const { favoriteList, setFavoriteList, unfavorite } = useFavorite();

  return (
    <section>
      <div className="flex gap-2">
        <PlaylistOverview
          playlist={favoriteList}
          title="좋아요 표시한 음악"
          description="좋아요 표시한 음악 목록입니다."
        />
      </div>
      <div className="relative my-4 w-full">
        <PlayListTable
          playlist={favoriteList}
          setPlaylist={setFavoriteList}
          removePlaylist={unfavorite}
        />
      </div>
    </section>
  );
};
