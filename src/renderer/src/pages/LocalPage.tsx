import { PlayListTable } from "@/components";
import { useModal } from "@/components/Modal/useModal";
import { useCurrentMusic } from "@/hooks";
import StaticIcon from "@/icons/StaticIcon";

export const LocalPage = () => {
  const { playlist, setPlaylist, removePlaylist } = useCurrentMusic();
  const { showModal } = useModal();

  return (
    <section>
      <h1 className="font-sans text-2xl font-bold">로컬 파일 관리</h1>

      <div className="mt-8 flex w-full justify-between">
        <button
          className="flex items-center gap-2 rounded-lg bg-[#E0E0E0] p-2 px-4 font-sans text-sm font-semibold opacity-85 hover:opacity-100"
          onClick={() => showModal("ScanLocalMusic")}
        >
          <StaticIcon iconName="forder-open" />
          파일 자동스캔
        </button>
        <div className="flex items-center gap-1 rounded-md bg-black/10 px-2">
          <StaticIcon iconName="search" size={18} className="opacity-70" />
          <input
            className="rounded-md bg-transparent px-2 outline-none"
            type="text"
            placeholder="search local music"
          />
        </div>
      </div>

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
