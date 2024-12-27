import { motion, Variants } from "motion/react";

const variants: Variants = {
  inital: {
    scale: 0,
  },
  animate: {
    scale: 1,
  },
};

export const Loading = () => {
  return (
    <motion.div className="flex size-20 items-center justify-center gap-2">
      {[1, 2, 3].map((_, index) => {
        return (
          <motion.div
            key={index}
            variants={variants}
            initial="inital"
            animate="animate"
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
              delay: index * 0.2,
            }}
            className="size-4 rounded-full bg-gray-300"
          ></motion.div>
        );
      })}
    </motion.div>
  );
};
