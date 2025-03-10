export type Config = {
  general: {
    autoStartOnBoot: boolean;
    language: string;
    theme: "light" | "dark";
    closeBehavior: "exit" | "minimize";
    maxHistoryLength: number;
    notification: boolean;
  };
  playback: {
    playError: "pause" | "skip-next";
    audioOutputDevice: MediaDeviceInfo | null;
    previousTrackBehavior: "always-previous" | "under-3" | "under-5";
  };
  shortcut: {
    enableLocal: boolean;
    enableGlobal: boolean;
    keymap: {
      [K in ShortcutKeys]: {
        local: string[];
        global: string[];
      };
    };
  };
  download: {
    path: string;
    concurrency: number;
  };
  lyric: {
    enable: boolean;
    searchMethod: "basic" | "advanced";
  };
};

export type ShortcutKeys = (typeof shortcutKeys)[number];
export const shortcutKeys = [
  "play/pause",
  "skip-previous",
  "skip-next",
  "volume-up",
  "volume-down",
  "seek-forward",
  "seek-backward",
  "search",
  "quit",
] as const;

export const shortcutKeyMap: Record<ShortcutKeys, string> = {
  "play/pause": "재생 / 일시정지",
  "skip-previous": "이전곡 재생",
  "skip-next": "다음곡 재생",
  "volume-up": "볼륨 올리기",
  "volume-down": "볼륨 내리기",
  "seek-forward": "5초 앞으로 이동",
  "seek-backward": "5초 뒤로 이동",
  search: "검색",
  quit: "종료",
};

type KeyPaths<T extends object> =
  T extends Record<string, any>
    ? {
        [K in keyof T]: K extends string
          ? T[K] extends (infer R)[]
            ? R extends object
              ? K | `${K}.${number}` | `${K}.${number}.${KeyPaths<R>}`
              : K | `${K}.${number}`
            : T[K] extends Record<string, any>
              ? K extends string
                ? K | `${K}.${KeyPaths<T[K]>}`
                : never
              : K
          : never;
      }[keyof T]
    : never;

type KeyPathValue<
  T extends Record<string, any>,
  S extends string,
> = S extends `${infer First}.${infer Rest}`
  ? First extends keyof T
    ? KeyPathValue<T[First], Rest>
    : never
  : T[S];

export type AppConfig = Partial<Config>;
export type AppConfigKeyPath = KeyPaths<Config>;
export type AppConfigKeyPathValue<Path extends string> = KeyPathValue<Config, Path>;

export type AppConfigKeymap = Config["shortcut"]["keymap"];

type DefaultAppConfig = {
  [K in AppConfigKeyPath]?: AppConfigKeyPathValue<K>;
};
export const defaultAppConfig: DefaultAppConfig = {
  "general.autoStartOnBoot": false,
  "general.language": "Korean",
  "general.theme": "light",
  "general.closeBehavior": "minimize",
  "general.maxHistoryLength": 7,
  "general.notification": false,
  "playback.audioOutputDevice": null,
  "playback.playError": "skip-next",
  "playback.previousTrackBehavior": "under-3",
  "shortcut.enableLocal": true,
  "shortcut.enableGlobal": false,
  "lyric.enable": true,
  "lyric.searchMethod": "advanced",
  "download.concurrency": 5,
} as const;

export type GlobalContext = {
  appVersion: string;
  appPath: {
    userData: string;
    temp: string;
    downloads: string;
  };
  platForm: NodeJS.Platform;
};
