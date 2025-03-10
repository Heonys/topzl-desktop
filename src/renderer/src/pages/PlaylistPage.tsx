import { PlaylistOverview, PlayListTable } from "@/components";
import { useCurrentMusic } from "@/hooks";
import { useTranslation } from "react-i18next";

export const PlaylistPage = () => {
  const { playlist, setPlaylist, removePlaylist, latestPlaylist } = useCurrentMusic();
  const { t } = useTranslation();

  return (
    <section>
      <div className="flex gap-2">
        <PlaylistOverview
          playlist={playlist}
          title={t("playlist.current_playlist.playlist_title")}
          description={t("playlist.current_playlist.playlist_discription")}
          date={latestPlaylist}
        />
      </div>
      <div className="relative my-4 w-full">
        <PlayListTable
          playlist={playlist}
          setPlaylist={setPlaylist}
          removePlaylist={removePlaylist}
          draggable
        />
      </div>
    </section>
  );
};
