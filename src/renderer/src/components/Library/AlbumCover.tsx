import StaticIcon from "@/icons/StaticIcon";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  title: string;
  iconName?: ComponentProps<typeof StaticIcon>["iconName"];
  onClick?: () => void;
  onDoubleClick?: () => void;
  coverUrl?: string;
};

export function AlbumCover({ title, iconName, onClick, coverUrl, onDoubleClick }: Props) {
  return (
    <div className="group flex size-[8.5rem] flex-col gap-1">
      {coverUrl ? (
        <div
          className="relative flex w-full flex-1 items-center justify-center rounded-lg opacity-90 group-hover:opacity-100"
          style={coverUrl ? { backgroundImage: `url(${coverUrl})`, backgroundSize: "cover" } : {}}
          onClick={onClick}
          onDoubleClick={onDoubleClick}
        >
          <div className="flex w-full items-center justify-center">
            {iconName && (
              <StaticIcon
                iconName={iconName}
                className="size-1/4 transition-all duration-300 group-hover:scale-125"
                color="white"
              />
            )}
          </div>
        </div>
      ) : (
        <div
          className={twMerge(
            "relative flex w-full flex-1 items-center justify-center rounded-lg bg-slate-500",
          )}
          onClick={onClick}
          onDoubleClick={onDoubleClick}
        >
          <div className="flex w-full items-center justify-center">
            {iconName && (
              <StaticIcon
                iconName={iconName}
                className="size-1/4 transition-all duration-300 group-hover:scale-125"
                color="white"
              />
            )}
          </div>
        </div>
      )}

      <div className="truncate text-center text-sm" title={title}>
        {title}
      </div>
    </div>
  );
}
