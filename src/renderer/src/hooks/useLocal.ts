import { localDirAtom, localSelectedDirAtom } from "@/atom";
import { useAtom } from "jotai";

const useLocal = () => {
  const [localDir, setLocalDir] = useAtom(localDirAtom);
  const [localSelectedDir, setLocalSelectedDir] = useAtom(localSelectedDirAtom);

  const addDir = (path: string) => {
    setLocalDir((prev) => {
      if (!prev.includes(path)) return [...prev, path];
      return prev;
    });
  };

  const removeDir = (path: string) => {
    setLocalDir((prev) => prev.filter((it) => it !== path));
    uncheck(path);
  };

  const check = (path: string) => {
    setLocalSelectedDir((prev) => {
      if (!prev.includes(path)) return [...prev, path];
      return prev;
    });
  };

  const uncheck = (path: string) => {
    setLocalSelectedDir((prev) => prev.filter((it) => it !== path));
  };

  return { localDir, localSelectedDir, check, uncheck, addDir, removeDir };
};

export default useLocal;
