import { motion, AnimatePresence, Variants } from "motion/react";
import { IconButton } from "@/common";
import { useCurrentMusic } from "@/hooks/useCurrentMusic";
import { usePanel } from "@/hooks";
import { formatTime } from "@/utils";

const variants: Variants = {
  hidden: {
    x: "100%",
  },
  visible: {
    x: "0%",
    transition: {
      type: "tween",
      duration: 0.2,
    },
  },
  exit: {
    x: "100%",
    transition: {
      type: "tween",
      duration: 0.2,
    },
  },
};

export const CollapsiblePanel = () => {
  const { isVisible, onToggle } = usePanel();
  const { currentItem } = useCurrentMusic();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute right-0 top-14 h-screen w-screen bg-black/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onToggle}
        >
          <motion.div
            className="absolute right-0 top-0 h-full w-2/5 rounded-l-2xl bg-white"
            onClick={(e) => e.stopPropagation()}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="m-3">
              <div className="text-xl">Playlist</div>
              <div className="my-2 h-px w-full bg-black/10" />
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between bg-blue-100 p-2 text-sm">
                  <div className="flex gap-4">
                    <div>1.</div>
                    <div>{currentItem?.title}</div>
                  </div>
                  <div>{currentItem?.artist}</div>
                  <div>{formatTime(currentItem?.duration || 0)}</div>
                  <IconButton iconName="trash" size={15} />
                </div>
                <div className="flex items-center justify-between p-2 text-sm hover:bg-gray-100">
                  <div className="flex gap-4">
                    <div>2.</div>
                    <div>{currentItem?.title}</div>
                  </div>
                  <div>{currentItem?.artist}</div>
                  <div>{formatTime(currentItem?.duration || 0)}</div>
                  <IconButton iconName="trash" size={15} />
                </div>
                <div className="flex items-center justify-between p-2 text-sm  hover:bg-gray-100">
                  <div className="flex gap-4">
                    <div>3.</div>
                    <div>{currentItem?.title}</div>
                  </div>
                  <div>{currentItem?.artist}</div>
                  <div>{formatTime(currentItem?.duration || 0)}</div>
                  <IconButton iconName="trash" size={15} />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
