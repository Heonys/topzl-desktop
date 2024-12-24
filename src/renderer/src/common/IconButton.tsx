import { ComponentPropsWithoutRef } from "react";
import StaticIcon from "@/icons/StaticIcon";
import { twMerge } from "tailwind-merge";

type Props = {
  iconName: ComponentPropsWithoutRef<typeof StaticIcon>["iconName"];
  size?: number;
  opacity?: boolean;
  color?: string;
} & ComponentPropsWithoutRef<"button">;

export const IconButton = ({ iconName, size = 20, color = "black", opacity, ...props }: Props) => {
  return (
    <button
      className={twMerge(
        "flex cursor-pointer opacity-100 items-center justify-center transition-transform hover:scale-110 hover:opacity-100",
        opacity ? "opacity-100" : "opacity-60",
      )}
      {...props}
    >
      <StaticIcon iconName={iconName} color={color} size={size} />
    </button>
  );
};
