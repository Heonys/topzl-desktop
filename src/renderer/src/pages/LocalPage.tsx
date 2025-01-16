import { PlayListTable } from "@/components";
import { useModal } from "@/components/Modal/useModal";
import { useDirectoryManager } from "@/hooks";
import StaticIcon from "@/icons/StaticIcon";
// import trackPlayer from "@shared/plugin/trackPlayer";

export const LocalPage = () => {
  const { localMusic, setLocalMusic } = useDirectoryManager();
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
        <button
          onClick={() => {
            // "file:///C:/Users/siwmu/Desktop/topzl/Users/siwmu/Desktop/music/%25EB%25AD%2590%25EB%259D%25BC%25ED%2595%25A0%25EA%25B9%258C-The%2520Breeze-1.mp3
            // "file:///C:/Users/siwmu/Desktop/music/%EB%AD%90%EB%9D%BC%ED%95%A0%EA%B9%8C-The%20Breeze-1.mp3"
            // console.log(localMusic);
            // const musicItem = localMusic[0];
            // console.log(musicItem.url);
            // trackPlayer.setTrackSource({ url: `file://${musicItem.localPath!}` }, musicItem);
            // trackPlayer.fileTest();
          }}
        >
          test
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
        <PlayListTable playlist={localMusic} setPlaylist={setLocalMusic} />
      </div>
    </section>
  );
};
