import StaticIcon from "@/icons/StaticIcon";
import { ComponentProps } from "react";

type Props = {
  title: string;
  iconName?: ComponentProps<typeof StaticIcon>["iconName"];
  onClick?: () => void;
};

export function AlbumCover({ title, iconName, onClick }: Props) {
  return (
    <div className="group flex size-36 flex-col gap-1">
      <div
        className="relative flex w-full flex-1 items-center justify-center rounded-lg bg-slate-500"
        onClick={onClick}
      >
        {iconName && (
          <StaticIcon
            iconName={iconName}
            className="size-1/4 transition-all duration-300 group-hover:scale-125"
            color="white"
          />
        )}

        {/* <div className="absolute right-1 top-1"></div> */}
      </div>

      <div className="truncate text-center" title={title}>
        {title}
      </div>
    </div>
  );
}
