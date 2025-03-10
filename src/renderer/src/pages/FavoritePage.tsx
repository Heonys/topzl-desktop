import { useTranslation } from "react-i18next";
import { PlaylistOverview, PlayListTable } from "@/components";
import { useFavorite } from "@/hooks";

export const FavoritePage = () => {
  const { favoriteList, setFavoriteList, unfavorite, latestFavorite } = useFavorite();
  const { t } = useTranslation();

  return (
    <section>
      <div className="flex gap-2">
        <PlaylistOverview
          playlist={favoriteList}
          title={t("playlist.favorite_playlist.playlist_title")}
          description={t("playlist.favorite_playlist.playlist_discription")}
          date={latestFavorite}
        />
      </div>
      <div className="relative my-4 w-full">
        <PlayListTable
          playlist={favoriteList}
          setPlaylist={setFavoriteList}
          removePlaylist={unfavorite}
          draggable
        />
      </div>
    </section>
  );
};
