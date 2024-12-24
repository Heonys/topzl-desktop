import { musicDetailVisibleAtom } from "@/atom";
import { useAtom } from "jotai";

export const useDetail = () => {
  const [isVisible, setIsVisible] = useAtom(musicDetailVisibleAtom);

  const onOpen = () => {
    setIsVisible(true);
  };
  const onClose = () => {
    setIsVisible(false);
  };

  return { isVisible, onOpen, onClose };
};
