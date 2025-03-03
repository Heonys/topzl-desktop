import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import StaticIcon from "@/icons/StaticIcon";

type Props = {
  children: ReactNode;
  title: string;
};

export const Blockquote = ({ children, title }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <blockquote className="border-l-[5px] border-[#c2d0ff] bg-gray-50 p-4 text-sm font-semibold italic text-gray-700">
      <div
        className="flex cursor-pointer items-center gap-2 text-black"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? <StaticIcon iconName="chevron-down" /> : <StaticIcon iconName="chevron-right" />}
        {title}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mt-2 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </blockquote>
  );
};
