import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
import { useLocation, useNavigate } from "react-router-dom";
import StaticIcon from "@/icons/StaticIcon";
import logo from "@resources/logo.png";

type OptionTypes = {
  iconName: ComponentPropsWithoutRef<typeof StaticIcon>["iconName"];
  title: string;
  divider?: boolean;
  route: string;
};
const options: OptionTypes[] = [
  {
    iconName: "search",
    title: "Menu",
    divider: true,
    route: "Menu",
  },
  {
    iconName: "search",
    title: "Search",
    route: "search",
  },
  {
    iconName: "discover",
    title: "Discover",
    route: "discover",
  },
  {
    iconName: "search",
    title: "Playlist",
    divider: true,
    route: "Menu",
  },
  {
    iconName: "playlist",
    title: "Current",
    route: "playlist",
  },
  {
    iconName: "clock",
    title: "Recent",
    route: "recent",
  },
  {
    iconName: "search",
    title: "Library",
    divider: true,
    route: "Menu",
  },
  {
    iconName: "library-music",
    title: "My Library",
    route: "library",
  },
  {
    iconName: "forder-open",
    title: "Local",
    route: "local",
  },
  {
    iconName: "download",
    title: "Download",
    route: "download",
  },
  {
    iconName: "search",
    title: "General",
    divider: true,
    route: "Menu",
  },
  {
    iconName: "cog-8-tooth",
    title: "Setting",
    route: "setting",
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
      <div className="region-none mx-auto flex w-32 -translate-y-12 flex-col gap-2.5 rounded-lg py-5 font-barlow font-bold">
        <div
          className="mx-2 flex w-full items-center justify-start gap-5 rounded-md  py-1 opacity-80 transition-transform hover:scale-110 hover:opacity-100"
          onClick={() => navigate("/")}
        >
          <img className="size-7 object-cover" src={logo} alt="logo" />
          <div className="text-xl">Topzl</div>
        </div>
        <div className="mx-2 flex w-full flex-col justify-center gap-3 rounded-md">
          {options.map(({ iconName, title, route, divider }) => {
            if (divider) {
              return (
                <div key={title} className="text-sm text-slate-500 opacity-70">
                  {title}
                </div>
              );
            }
            return (
              <div
                key={route}
                className={twMerge(
                  "flex w-full items-center justify-start gap-5 py-1 opacity-60 hover:opacity-100 hover:scale-110 transition-all",
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
