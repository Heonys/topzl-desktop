import { useAtom } from "jotai";
import { downloadedMusicAtom } from "@/atom";
import type { MusicItem } from "@shared/plugin/type";
import PQueue from "p-queue";
// import { useCurrentMusic } from "./useCurrentMusic";

const downloadQueue = new PQueue({ concurrency: 5 });

export const useDownload = () => {
  // const {} = useCurrentMusic();
  const [downloadedList, setDownloadedList] = useAtom(downloadedMusicAtom);
  // downloadingProgress

  const isDownloaded = (id: string) => {
    return downloadedList.find((it) => it.id === id);
  };

  const download = (musicItem: MusicItem | MusicItem[]) => {
    const musicItems = Array.isArray(musicItem) ? musicItem : [musicItem];

    const validItems = musicItems.filter((it) => !isDownloaded(it.id));
    /*
      다운로드를 대기하는 다운로드 Queue에 삽입
      순차적인 다운로드 ...
    */

    setDownloadedList((prev) => [...prev, ...validItems]);

    // window.worker.downloadFile()
  };

  const setConcurrency = (concurrency: number) => {
    downloadQueue.concurrency = Math.min(20, Math.max(1, concurrency));
  };

  return { isDownloaded, download, setConcurrency };
};
