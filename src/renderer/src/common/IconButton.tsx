import { ComponentPropsWithoutRef } from "react";
import StaticIcon from "@/icons/StaticIcon";
import { twMerge } from "tailwind-merge";

type Props = {
  iconName: ComponentPropsWithoutRef<typeof StaticIcon>["iconName"];
  size?: number;
  opacity?: boolean;
} & ComponentPropsWithoutRef<"button">;

export const IconButton = ({ iconName, size = 20, opacity, ...props }: Props) => {
  return (
    <button
      className={twMerge(
        "flex cursor-pointer opacity-100 items-center justify-center transition-transform hover:scale-110 hover:opacity-100",
        opacity ? "opacity-100" : "opacity-60",
      )}
      {...props}
    >
      <StaticIcon iconName={iconName} color="black" size={size} />
    </button>
  );
};
