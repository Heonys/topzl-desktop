import { ComponentPropsWithoutRef } from "react";
import StaticIcon from "../icons/StaticIcon";

type Props = {
  iconName: ComponentPropsWithoutRef<typeof StaticIcon>["iconName"];
  onclick?: ComponentPropsWithoutRef<"button">["onClick"];
  title?: string;
};

export const HeaderIconButton = ({ iconName, onclick, title }: Props) => {
  return (
    <button
      className="flex w-[1.35rem] cursor-pointer items-center justify-center opacity-60 transition-transform hover:scale-110 hover:opacity-100"
      onClick={onclick}
      title={title}
    >
      <StaticIcon iconName={iconName} color="black" />
    </button>
  );
};
