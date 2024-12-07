type Config = {
  common: {
    language: string;
  };
  download: {
    path: string;
  };
  lyric: {
    fontColor: string;
    fontSize: string;
  };
  shortCut: {
    local: {
      name: string;
      age: number;
    }[];
    global: string[];
  };
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
export type AppconfigKeyPathValue<Path extends string> = KeyPathValue<Config, Path>;
