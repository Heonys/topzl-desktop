import { useParams } from "react-router-dom";
import { PlaylistOverview, PlayListTable } from "@/components";
import { useLibrary } from "@/hooks";
import { MusicItem } from "@shared/plugin/type";

export const PlaylistWithTitlePage = () => {
  const { title } = useParams();
  const { playLists, setPlaylistByTitle, removePlaylistByTitle } = useLibrary();
  const playlistInfo = playLists.find((playlist) => playlist.title === title);

  const setPlaylist = (title: string) => {
    return (item: MusicItem[]) => setPlaylistByTitle(title, item);
  };
  const removePlaylist = (title: string) => {
    return (id: string) => removePlaylistByTitle(title, id);
  };

  if (!playlistInfo) return;

  return (
    <section>
      <div className="flex gap-2">
        <PlaylistOverview
          playlist={playlistInfo.data}
          title={playlistInfo.title}
          description={playlistInfo.description}
          date={playlistInfo.date}
        />
      </div>
      <div className="relative my-4 w-full">
        <PlayListTable
          playlist={playlistInfo.data}
          setPlaylist={setPlaylist(playlistInfo.title)}
          removePlaylist={removePlaylist(playlistInfo.title)}
        />
      </div>
    </section>
  );
};
