type Config = {
  general: {
    language: string;
    theme: "light" | "dark";
    closeBehavior: "exit" | "minimize";
    maxHistoryLength: number;
    notification: boolean;
  };
  playback: {
    playError: "pause" | "skip-next";
    audioOutputDevice: MediaDeviceInfo | null;
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
    // defaultQuality: "low" | "standard" | "high";
    // notification: boolean;
  };
  lyric: {
    fontColor: string;
    fontSize: string;
  };
};

export type ShortcutKeys = (typeof shortcutKeys)[number];
export const shortcutKeys = [
  "TRANSLATE_KO", //
  "TRANSLATE_EN",
] as const;

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

type DefaultAppConfig = {
  [K in AppConfigKeyPath]?: AppConfigKeyPathValue<K>;
};
export const defaultAppConfig: DefaultAppConfig = {
  "general.language": "Korean",
  "general.theme": "light",
  "general.closeBehavior": "minimize",
  "general.maxHistoryLength": 7,
  "general.notification": false,
} as const;
