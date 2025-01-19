export const supportLocalAudioType = [
  ".mp3",
  ".flac",
  ".wma",
  ".wav",
  ".m4a",
  ".ogg",
  ".acc",
  ".aac",
  ".opus",
];

export enum DownloadState {
  NONE = "NONE",
  WAITING = "WAITING",
  LOADING = "LOADING",
  ERROR = "ERROR",
  DONE = "DONE",
}

export type DownloadProgress = {
  state: DownloadState;
  current: number;
  total: number;
};
