import { useAtom } from "jotai";
import { useRef } from "react";
import { localDirAtom, localMusicAtom, localSelectedDirAtom } from "@/atom";

type ChangeLog = Map<string, "add" | "remove">;

export const useDirectoryManager = () => {
  const [paths, setPaths] = useAtom(localDirAtom);
  const [selectedPaths, setSelectedPaths] = useAtom(localSelectedDirAtom);
  const changeLogRef = useRef<ChangeLog>(new Map());
  const [localMusic, setLocalMusic] = useAtom(localMusicAtom);

  const addDir = (path: string) => {
    setPaths((prev) => {
      changeLogRef.current.set(path, "add");
      if (!prev.includes(path)) return [...prev, path];
      return prev;
    });
  };

  const removeDir = (path: string) => {
    setPaths((prev) => prev.filter((it) => it !== path));
    changeLogRef.current.set(path, "remove");
    uncheck(path);
  };

  const check = (path: string) => {
    setSelectedPaths((prev) => {
      changeLogRef.current.set(path, "add");
      if (!prev.includes(path)) return [...prev, path];
      return prev;
    });
  };

  const uncheck = (path: string) => {
    setSelectedPaths((prev) => prev.filter((it) => it !== path));
    changeLogRef.current.set(path, "remove");
  };

  const syncWithWatcher = () => {
    const tobeAdded: string[] = [];
    const tobeRemoved: string[] = [];

    changeLogRef.current.forEach((action, path) => {
      if (action === "add") tobeAdded.push(path);
      else tobeRemoved.push(path);
    });

    window.worker.changeWorkerPath(tobeAdded, tobeRemoved);
  };

  return {
    paths,
    selectedPaths,
    check,
    uncheck,
    addDir,
    removeDir,
    syncWithWatcher,
    localMusic,
    setLocalMusic,
  };
};
