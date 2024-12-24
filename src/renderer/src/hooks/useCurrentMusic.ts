import { useAtom, useAtomValue } from "jotai";
import { currentMusicAtom, mediaSourceAtom } from "@/atom";

export const useCurrentMusic = () => {
  const [currentItem, setCurrentItem] = useAtom(currentMusicAtom);
  const asyncMediaSource = useAtomValue(mediaSourceAtom);

  return { currentItem, setCurrentItem, asyncMediaSource };
};
