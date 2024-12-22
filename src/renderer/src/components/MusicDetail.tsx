import useCurrentMusic from "@/hooks/useCurrentMusic";
import useDetail from "@/hooks/useDetail";
import { motion, Variants, AnimatePresence } from "motion/react";

const variants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const MusicDetail = () => {
  const { isVisible, onClose } = useDetail();
  const { currentItem } = useCurrentMusic();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute left-0 top-0 flex size-full items-center justify-center bg-black/80"
          onClick={onClose}
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
        ></motion.div>
      )}
    </AnimatePresence>
  );
};

export default MusicDetail;
