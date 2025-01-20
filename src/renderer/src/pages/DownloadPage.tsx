import { useAtom } from "jotai";
import { downloadedMusicAtom } from "@/atom";
import { PlayListTable } from "@/components";

export const DownloadPage = () => {
  const [downloadedList, setDownloadedList] = useAtom(downloadedMusicAtom);

  return (
    <section>
      <h1 className="font-sans text-2xl font-bold">다운로드 목록</h1>

      <div className="relative my-4 w-full">
        <PlayListTable playlist={downloadedList} setPlaylist={setDownloadedList} />
      </div>
    </section>
  );
};
