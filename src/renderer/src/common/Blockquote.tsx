import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import StaticIcon from "@/icons/StaticIcon";
import { cn } from "@/utils";

type Props = {
  title?: string;
  children?: ReactNode;
  collapsible?: boolean;
  color?: "indigo" | "orange" | "crimson" | "cyan";
  onClick?: () => void;
  disabled?: boolean;
};

const colorMap: Record<NonNullable<Props["color"]>, string> = {
  indigo: "#c2d0ff",
  orange: "#fec182",
  crimson: "#f3bed2",
  cyan: "#9ddde7",
};

export const Blockquote = ({
  children,
  title,
  onClick,
  collapsible = false,
  color = "indigo",
  disabled = false,
}: Props) => {
  const [isOpen, setIsOpen] = useState(!collapsible);
  const borderColor = colorMap[color] || colorMap["indigo"];

  return (
    <blockquote
      className={cn(
        "flex flex-col bg-gray-50 p-4 text-sm font-semibold italic text-gray-700",
        title && "gap-2",
        onClick && "cursor-pointer",
        disabled && "cursor-not-allowed opacity-50",
      )}
      style={{ borderLeft: `5px solid ${borderColor}` }}
      onClick={() => {
        if (disabled) return;
        onClick?.();
      }}
    >
      <div
        className="flex cursor-pointer items-center gap-2 font-bold text-black"
        onClick={collapsible ? () => setIsOpen((prev) => !prev) : undefined}
      >
        {collapsible &&
          (isOpen ? (
            <StaticIcon iconName="chevron-down" />
          ) : (
            <StaticIcon iconName="chevron-right" />
          ))}
        {title}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="overflow-hidden"
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
