/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MAIN_VITE_TEST_URL: string;
  readonly MAIN_VITE_GENIUS_ACCESS_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
