import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
import { useLocation, useNavigate } from "react-router-dom";
import StaticIcon from "@/icons/StaticIcon";

type OptionTypes =
  | {
      type: "icon";
      iconName: ComponentPropsWithoutRef<typeof StaticIcon>["iconName"];
      title: string;
      route: string;
    }
  | {
      type: "divider";
      title: string;
    };
const options: OptionTypes[] = [
  {
    type: "divider",
    title: "Menu",
  },
  {
    type: "icon",
    iconName: "home",
    title: "Home",
    route: "home",
  },
  {
    type: "icon",
    iconName: "search",
    title: "Search",
    route: "search",
  },
  {
    type: "icon",
    iconName: "playlist",
    title: "Playlist",
    route: "playlist",
  },
  {
    type: "divider",
    title: "Library",
  },
  {
    type: "icon",
    iconName: "library-music",
    title: "My Library",
    route: "library",
  },
  {
    type: "icon",
    iconName: "forder-open",
    title: "Local",
    route: "local",
  },
  {
    type: "icon",
    iconName: "download",
    title: "Download",
    route: "download",
  },
  {
    type: "divider",
    title: "General",
  },
  {
    type: "icon",
    iconName: "cog-8-tooth",
    title: "Setting",
    route: "setting",
  },
  {
    type: "icon",
    iconName: "privacy",
    title: "Guideline",
    route: "guideline",
  },
];

export const SideFrame = ({ className, ...props }: ComponentPropsWithoutRef<"aside">) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside
      className={twMerge(
        "min-w-48 h-[100vh] overflow-auto draggable flex items-center border-r-2 border-black/10",
        className,
      )}
      {...props}
    >
      <div className="region-none ml-5 flex w-32 -translate-y-12 flex-col gap-2.5 rounded-lg py-5 font-barlow font-bold">
        <div className="mx-2 flex w-full flex-col justify-center gap-3 rounded-md">
          {options.map((option) => {
            if (option.type === "divider") {
              return (
                <div key={option.title} className="text-sm text-slate-500 opacity-70">
                  {option.title}
                </div>
              );
            }
            const { iconName, route, title } = option;
            return (
              <div
                key={route}
                className={twMerge(
                  "flex w-full items-center justify-start gap-5 py-1 opacity-60 hover:opacity-100 hover:scale-110 transition-all pl-3 rounded-l-lg",
                  location.pathname.startsWith(`/${route}`) &&
                    "opacity-100 scale-110 bg-black/10 border-r-4 border-black/60",
                )}
                onClick={() => {
                  navigate(`/${route}`);
                }}
              >
                <StaticIcon iconName={iconName} title={title} size={20} />
                <div className="text-sm">{title}</div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
