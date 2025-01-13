// import LocalWorker from "./localFileWatcher?worker";
// import downloadWorker from "./downloader?worker";

// const workerPathMap = {
//   local: LocalWorker,
//   download: downloadWorker,
// } as const;

// function createWorker<T extends keyof typeof workerPathMap>(name: T): Worker {
//   const _Worker = workerPathMap[name];
//   return new _Worker();
// }

// export default createWorker;
