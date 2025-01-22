import { PlaylistOverview, PlayListTable } from "@/components";
import { useCurrentMusic } from "@/hooks";

export const PlaylistPage = () => {
  const { playlist, setPlaylist, removePlaylist } = useCurrentMusic();

  return (
    <section className="">
      <div className="flex gap-2">
        <PlaylistOverview
          playlist={playlist}
          title="현재 재생목록"
          description="현재 재생중인 재생목록 입니다"
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
