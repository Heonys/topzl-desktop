import { useAtomValue } from "jotai";
import { appConfigAtom } from "@/atom/config";

export const useAppConfig = () => {
  const appConfig = useAtomValue(appConfigAtom);

  const setAppConfig = window.appConfig.setAppConfigPath;

  const getGlobalContext = () => {
    return window.common.getGlobalContext();
  };

  return { appConfig, setAppConfig, getGlobalContext };
};
