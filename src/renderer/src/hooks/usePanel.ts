import { panelAtom } from "@/atom";
import { useAtom } from "jotai";

export const usePanel = () => {
  const [isVisible, setIsVisible] = useAtom(panelAtom);

  const onToggle = () => {
    setIsVisible((prev) => !prev);
  };

  return {
    isVisible,
    onToggle,
  };
};
