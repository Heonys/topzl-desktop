import { motion } from "motion/react";

export const Loading = () => {
  return (
    <motion.div
      className="size-5 bg-black"
      animate={{ rotate: 180 }}
      transition={{ repeat: Infinity, duration: 2 }}
    />
  );
};
