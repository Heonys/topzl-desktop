import { motion, Variants } from "motion/react";

type Props = {
  color?: string;
};

export function Equaliser({ color }: Props) {
  return (
    <motion.svg width="14" height="14" viewBox="0 0 14 14" fill={color}>
      <motion.rect variants={variants1} x="0" width="2" initial="inital" animate="animate" />
      <motion.rect variants={variants2} x="4" width="2" initial="inital" animate="animate" />
      <motion.rect variants={variants3} x="8" width="2" initial="inital" animate="animate" />
      <motion.rect variants={variants4} x="12" width="2" initial="inital" animate="animate" />
    </motion.svg>
  );
}

const variants1: Variants = {
  inital: {
    y: "4",
    height: "10",
  },
  animate: {
    y: [4, 0, 14, 4],
    height: [10, 14, 0, 10],
    transition: {
      repeat: Infinity,
      repeatType: "loop",
      duration: 0.9,
      ease: "easeIn",
    },
  },
};

const variants2: Variants = {
  inital: {
    y: "0",
    height: "14",
  },
  animate: {
    y: [0, 14, 0, 0],
    height: [14, 0, 14, 14],
    transition: {
      repeat: Infinity,
      repeatType: "loop",
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const variants3: Variants = {
  inital: {
    y: "10",
    height: "4",
  },
  animate: {
    y: [10, 0, 14, 10],
    height: [4, 14, 0, 4],
    transition: {
      repeat: Infinity,
      repeatType: "loop",
      duration: 0.95,
      ease: "easeInOut",
    },
  },
};

const variants4: Variants = {
  inital: {
    y: "7",
    height: "7",
  },
  animate: {
    y: [7, 14, 0, 7],
    height: [7, 0, 14, 7],
    transition: {
      repeat: Infinity,
      repeatType: "loop",
      duration: 0.85,
      ease: "linear",
    },
  },
};
