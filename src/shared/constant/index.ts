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
  id: string;
  state: DownloadState;
  current?: number;
  total?: number;
  message?: string;
};

export const keyModifierFlags: Record<string, number> = {
  Control: 1 << 0, // 00001
  Alt: 1 << 1, // 00010
  Command: 1 << 2, // 00100
  Option: 1 << 3, // 01000
  Shift: 1 << 4, // 10000
};
