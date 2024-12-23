import { panelAtom } from "@/atom";
import { useAtom } from "jotai";

const usePanel = () => {
  const [isVisible, setIsVisible] = useAtom(panelAtom);

  const onToggle = () => {
    setIsVisible((prev) => !prev);
  };

  return {
    isVisible,
    onToggle,
  };
};

export default usePanel;
