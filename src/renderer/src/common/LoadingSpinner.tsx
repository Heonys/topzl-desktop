import { motion, Variants } from "motion/react";
import { ClassNameValue, twMerge } from "tailwind-merge";

const variants: Variants = {
  inital: {
    scale: 0,
  },
  animate: {
    scale: 1,
  },
};

type Props = {
  classname?: ClassNameValue;
  message?: string;
};

export const LoadingSpinner = ({ classname, message }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <motion.div className="flex size-28 items-center justify-center gap-2">
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
              className={twMerge("size-4 rounded-full", classname)}
            ></motion.div>
          );
        })}
      </motion.div>
      <div className="font-sans font-bold">{message}</div>
    </div>
  );
};
