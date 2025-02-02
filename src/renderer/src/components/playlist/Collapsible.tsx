import { motion, AnimatePresence, Variants } from "motion/react";
import { usePanel } from "@/hooks";
import { CollapsiblePlaylist } from "./CollapsiblePlaylist";

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

export const Collapsible = () => {
  const { isVisible, onToggle } = usePanel();
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
            <CollapsiblePlaylist />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
