import i18next from "i18next";

export type Config = {
  general: {
    autoStartOnBoot: boolean;
    language: string;
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

export const getShortcutKeyMap = (keyType: ShortcutKeys) => {
  const shortcutKeyMap: Record<ShortcutKeys, string> = {
    "play/pause": i18next.t("settings.shortcut.keymap_title.play_pause"),
    "skip-previous": i18next.t("settings.shortcut.keymap_title.skip_previous"),
    "skip-next": i18next.t("settings.shortcut.keymap_title.skip_next"),
    "volume-up": i18next.t("settings.shortcut.keymap_title.volume_up"),
    "volume-down": i18next.t("settings.shortcut.keymap_title.volume_down"),
    "seek-forward": i18next.t("settings.shortcut.keymap_title.seek_forward"),
    "seek-backward": i18next.t("settings.shortcut.keymap_title.seek_backward"),
    search: i18next.t("settings.shortcut.keymap_title.search"),
    quit: i18next.t("settings.shortcut.keymap_title.quit"),
  };
  return shortcutKeyMap[keyType];
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
  "general.language": "ko-KR",
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
