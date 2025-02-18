import { useState } from "react";
import { motion } from "motion/react";
import StaticIcon from "@/icons/StaticIcon";
import { cn } from "@/utils";

export const SearchInput = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative flex items-center">
      <motion.div
        initial={{ width: 30 }}
        animate={{ width: isOpen ? 220 : 30 }}
        transition={{ type: "spring", stiffness: 220, damping: 25 }}
        className={cn(
          "flex items-center justify-center gap-1 overflow-hidden rounded-md",
          isOpen ? "bg-black/10" : "",
        )}
      >
        <StaticIcon
          iconName="search"
          size={18}
          className="ml-2 cursor-pointer opacity-70"
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && (
          <motion.input
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.1 }}
            className="w-48 bg-transparent p-1.5 text-sm font-medium outline-none"
            type="text"
            autoFocus
            onBlur={() => setIsOpen(false)}
          />
        )}
      </motion.div>
    </div>
  );
};
