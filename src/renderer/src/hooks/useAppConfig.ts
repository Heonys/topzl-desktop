import { useAtomValue } from "jotai";
import { appConfigAtom } from "@/atom/config";

export const useAppConfig = () => {
  const appConfig = useAtomValue(appConfigAtom);

  const setAppConfig = window.appConfig.setAppConfigPath;

  return { appConfig, setAppConfig };
};
