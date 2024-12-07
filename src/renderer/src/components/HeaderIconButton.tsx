import { ComponentPropsWithoutRef } from "react";
import StaticIcon from "@/icons/StaticIcon";

type Props = {
  iconName: ComponentPropsWithoutRef<typeof StaticIcon>["iconName"];
  size?: number;
} & ComponentPropsWithoutRef<"button">;

export const HeaderIconButton = ({ iconName, size = 20, ...props }: Props) => {
  return (
    <button
      className="flex cursor-pointer items-center justify-center opacity-60 transition-transform hover:scale-110 hover:opacity-100"
      {...props}
    >
      <StaticIcon iconName={iconName} color="black" size={size} />
    </button>
  );
};
