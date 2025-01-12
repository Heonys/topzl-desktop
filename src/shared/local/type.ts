export type GlobalContext = {
  appVersion: string;
  workerPath: {
    download: string;
    localFileWatcher: string;
  };
  appPath: {
    userData: string;
    temp: string;
    downloads: string;
    // resoueces: string;
  };
  platForm: NodeJS.Platform;
};
