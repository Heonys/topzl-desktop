import { motion, Variants, AnimatePresence } from "motion/react";
import usePlayer from "@/hooks/useCurrentMusic";
import useDetail from "@/hooks/useDetail";

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
  const { currentItem } = usePlayer();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute inset-0 size-full bg-black"
          onClick={onClose}
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div
            className="size-full blur-3xl brightness-125 contrast-75"
            style={{ backgroundImage: `url(${currentItem?.artwork})` }}
          />
          <div className="absolute left-0 top-0 flex size-full items-center justify-center ">
            <img
              className="size-[40vh] rounded-xl object-cover"
              src={currentItem?.artwork}
              alt="artwork"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
