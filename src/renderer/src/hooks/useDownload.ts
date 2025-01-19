import { useAtom } from "jotai";
import PQueue from "p-queue";
import { downloadedMusicAtom } from "@/atom";
import type { MusicItem } from "@shared/plugin/type";
import type { DownloadProgress } from "@shared/constant";

const downloadQueue = new PQueue({ concurrency: 5 });
const downloadProgressMap = new Map<string, DownloadProgress>();
const initPath = window.common.getGlobalContext().appPath.downloads;

export const useDownload = () => {
  const [downloadedList, setDownloadedList] = useAtom(downloadedMusicAtom);

  const isDownloaded = (id: string) => {
    return downloadedList.find((it) => it.id === id);
  };

  const download = async (musicItem: MusicItem | MusicItem[]) => {
    const musicItems = Array.isArray(musicItem) ? musicItem : [musicItem];
    const validItems = musicItems.filter((it) => !isDownloaded(it.id));

    const downloadCallback = validItems.map((musicItem) => {
      return async () => {
        const mediaSource = await getMediaSource(musicItem);
        const ext = getExtensionName(mediaSource.url);
        const downloadPath = `${initPath}\\${musicItem.title}.${ext}`;
        window.worker.downloadFile(mediaSource.url, downloadPath);
      };
    });

    downloadQueue.addAll(downloadCallback);
    setDownloadedList((prev) => [...prev, ...validItems]);
  };

  const getMediaSource = (currentMusic: MusicItem) => {
    return window.plugin.getMediaSource(currentMusic.id);
  };

  const getExtensionName = (path: string) => {
    return path.match(/.*\/.+\.([^./?#]+)/)?.[1] ?? "mp3";
  };

  const setConcurrency = (concurrency: number) => {
    downloadQueue.concurrency = Math.min(20, Math.max(1, concurrency));
  };

  const getDownloadStatus = (id: string) => {
    // 근데 이거 실시간으로 업데이트 되야함 -> useEffect로 빼야할 듯
    return downloadProgressMap.get(id);
  };

  return { isDownloaded, download, setConcurrency, getDownloadStatus, getMediaSource };
};
