import { motion, Variants } from "motion/react";

const variants: Variants = {
  inital: {
    height: "100%",
  },
  animate: {
    height: "20%",
  },
};

export const Loading = () => {
  return (
    <motion.div className="flex size-12 items-center justify-between">
      {[1, 2, 3].map((_, index) => {
        return (
          <motion.div
            key={index}
            variants={variants}
            initial="inital"
            animate="animate"
            transition={{
              duration: 0.4,
              ease: "easeOut",
              type: "spring",
              repeat: Infinity,
              repeatType: "reverse",
              delay: index * 0.1,
            }}
            className="h-12 w-3 rounded-md bg-black/70"
          ></motion.div>
        );
      })}
    </motion.div>
  );
};
