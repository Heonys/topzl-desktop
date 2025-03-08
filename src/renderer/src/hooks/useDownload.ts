import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import PQueue from "p-queue";
import { getDefaultStore } from "jotai";
import { downloadedMusicAtom } from "@/atom";
import { DownloadState, type DownloadProgress } from "@shared/constant";
import type { MusicItem } from "@shared/plugin/type";
import { useAppConfig } from "./useAppConfig";
import { appConfigAtom } from "src/renderer/src/atom";

const store = getDefaultStore();
const downloadProgressMap = new Map<string, DownloadProgress>();
const downloadQueue = new PQueue({
  concurrency: store.get(appConfigAtom).download?.concurrency ?? 5,
});
const initPath = window.common.getGlobalContext().appPath.downloads;
const INIT_PROGRESS = { id: "INIT_PROGRESS", state: DownloadState.NONE };

export const useDownload = (musicItem?: MusicItem) => {
  const [downloadedList, setDownloadedList] = useAtom(downloadedMusicAtom);
  const [status, setStatus] = useState<DownloadProgress>(INIT_PROGRESS);
  const { appConfig } = useAppConfig();

  const updatedRef = useRef<MusicItem[]>();

  useEffect(() => {
    if (musicItem) {
      setStatus(downloadProgressMap.get(musicItem.id) || INIT_PROGRESS);
      const cleanup = window.worker.syncStatus((progress) => {
        if (progress.id === musicItem.id) {
          downloadProgressMap.set(progress.id, progress);
          setStatus(progress);
          if (progress.state === DownloadState.DONE) {
            setDownloadedList((prev) => [...prev, ...(updatedRef.current ?? [])]);
          }
        }
      });
      return cleanup;
    }
  }, [musicItem, setDownloadedList]);

  const getStatus = () => {
    if (musicItem) {
      const id = musicItem.id;
      if (status.id === id) return status;
      return downloadProgressMap.get(id) ?? { id, state: DownloadState.NONE };
    }
  };

  const isDownloaded = (id: string) => {
    return downloadedList.find((it) => it.id === id);
  };

  const download = async (musicItem: MusicItem | MusicItem[]) => {
    const musicItems = Array.isArray(musicItem) ? musicItem : [musicItem];
    updatedRef.current = musicItems;

    const downloadCallback = musicItems.map((item) => {
      return async () => {
        try {
          const mediaSource = await getMediaSource(item);
          const ext = getExtensionName(mediaSource.url);
          const downloadPath = `${appConfig.download?.path ?? initPath}\\${item.title}.${ext}`;
          window.worker.downloadFile(item.id, mediaSource.url, downloadPath);
        } catch {
          const progress = { id: item.id, state: DownloadState.ERROR };
          downloadProgressMap.set(item.id, progress);
          setStatus(progress);
        }
      };
    });

    downloadQueue.addAll(downloadCallback);
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

  return {
    isDownloaded,
    download,
    setConcurrency,
    getMediaSource,
    getStatus,
  };
};
