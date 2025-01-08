import { PlayListTable } from "@/components";
import { useCurrentMusic } from "@/hooks";

export const DownloadPage = () => {
  const { playlist, setPlaylist, removePlaylist } = useCurrentMusic();

  return (
    <section>
      <h1 className="font-sans text-2xl font-bold">다운로드 목록</h1>

      <div className="relative my-4 w-full">
        <PlayListTable
          playlist={playlist}
          setPlaylist={setPlaylist}
          removePlaylist={removePlaylist}
        />
      </div>
    </section>
  );
};
