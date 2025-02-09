import { useAtom } from "jotai";
import { downloadedMusicAtom } from "@/atom";
import { PlayListTable } from "@/components";
import StaticIcon from "@/icons/StaticIcon";

export const DownloadPage = () => {
  const [downloadedList, setDownloadedList] = useAtom(downloadedMusicAtom);

  return (
    <section>
      <h1 className="font-sans text-2xl font-bold">다운로드 목록</h1>
      <div className="mt-8 flex w-full justify-between">
        <button
          tabIndex={-1}
          className="flex items-center gap-2 rounded-lg bg-[#E0E0E0] p-2 px-4 font-sans text-sm font-semibold opacity-85 hover:opacity-100"
          onClick={() => {
            const context = window.common.getGlobalContext();
            window.fs.openFolder(context.appPath.downloads);
          }}
        >
          <StaticIcon iconName="forder-open" />
          폴더 위치 열기
        </button>
        <div className="flex items-center gap-1 rounded-md bg-black/10 px-2">
          <StaticIcon iconName="search" size={18} className="opacity-70" />
          <input
            className="w-48 rounded-md bg-transparent px-2 outline-none"
            type="text"
            placeholder="search download music"
          />
        </div>
      </div>

      <div className="relative my-4 w-full">
        <PlayListTable
          playlist={downloadedList}
          setPlaylist={setDownloadedList}
          maxheight="63vh"
          draggable
        />
      </div>
    </section>
  );
};
