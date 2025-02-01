import { motion, Variants, AnimatePresence } from "motion/react";
import { useDetail, useCurrentMusic } from "@/hooks";
import { DetailController, Lyric } from "@/components/PlayController";
import { IconButton } from "@/common";

const variants: Variants = {
  hidden: {
    y: "100%",
  },
  visible: {
    y: "0%",
    transition: {
      type: "tween",
      duration: 0.2,
    },
  },
  exit: {
    y: "100%",
    transition: {
      type: "tween",
      duration: 0.2,
    },
  },
};

export const MusicDetail = () => {
  const { isVisible, onClose } = useDetail();
  const { currentItem } = useCurrentMusic();

  return (
    <AnimatePresence>
      {isVisible && currentItem && (
        <motion.div
          className="absolute inset-0 size-full bg-black"
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div
            className="size-full opacity-85 blur-3xl brightness-90 contrast-75"
            style={{ backgroundImage: `url(${currentItem.artwork})` }}
          />
          <div className="absolute left-0 top-0 flex size-full items-center justify-center gap-2">
            <DetailController currentItem={currentItem} />
            <Lyric />
          </div>
          <div className="absolute right-10 top-10">
            <IconButton iconName="down" color="white" onClick={onClose} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
