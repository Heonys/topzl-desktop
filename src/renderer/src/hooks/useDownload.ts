import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import PQueue from "p-queue";
import { downloadedMusicAtom } from "@/atom";
import { DownloadState, type DownloadProgress } from "@shared/constant";
import type { MusicItem } from "@shared/plugin/type";

export const downloadProgressMap = new Map<string, DownloadProgress>();
const downloadQueue = new PQueue({ concurrency: 5 });
const initPath = window.common.getGlobalContext().appPath.downloads;
const INIT_PROGRESS = { id: "INIT_PROGRESS", state: DownloadState.NONE };

export const useDownload = (musicItem: MusicItem) => {
  const [downloadedList, setDownloadedList] = useAtom(downloadedMusicAtom);
  const [status, setStatus] = useState<DownloadProgress>(INIT_PROGRESS);

  useEffect(() => {
    setStatus(downloadProgressMap.get(musicItem.id) || INIT_PROGRESS);
    const cleanup = window.worker.syncStatus((progress) => {
      downloadProgressMap.set(musicItem.id, progress);
      setStatus(progress);
    });
    return cleanup;
  }, [musicItem]);

  const isDownloaded = (id: string) => {
    return downloadedList.find((it) => it.id === id);
  };

  const download = async (musicItem: MusicItem | MusicItem[]) => {
    const musicItems = Array.isArray(musicItem) ? musicItem : [musicItem];
    const validItems = musicItems.filter((it) => !isDownloaded(it.id));

    const downloadCallback = validItems.map((musicItem) => {
      return async () => {
        try {
          const mediaSource = await getMediaSource(musicItem);
          const ext = getExtensionName(mediaSource.url);
          const downloadPath = `${initPath}\\${musicItem.title}.${ext}`;
          window.worker.downloadFile(mediaSource.url, downloadPath);
        } catch {
          setStatus({
            state: DownloadState.ERROR,
            message: "File Location Error",
          });
        }
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

  return { isDownloaded, download, setConcurrency, getMediaSource, status };
};

// export const useDownloadProgress = (musicItem: MusicItem) => {
//   const [status, setStatus] = useState<DownloadProgress>(INIT_PROGRESS);

//   useEffect(() => {
//     setStatus(downloadProgressMap.get(musicItem.id) || INIT_PROGRESS);
//     const cleanup = window.worker.syncStatus((progress) => {
//       downloadProgressMap.set(musicItem.id, progress);
//       setStatus(progress);
//     });
//     return cleanup;
//   }, [musicItem]);

//   return { status };
// };
