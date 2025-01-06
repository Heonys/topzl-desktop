import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
import { useLocation, useNavigate } from "react-router-dom";
import StaticIcon from "@/icons/StaticIcon";
import { IconButton } from "@/common/IconButton";
import logo from "@resources/logo.png";

type OptionTypes = {
  iconName: ComponentPropsWithoutRef<typeof StaticIcon>["iconName"];
  title: string;
  route: string;
};
const options: OptionTypes[] = [
  {
    iconName: "chart",
    title: "chart",
    route: "chart",
  },
  {
    iconName: "search",
    title: "search",
    route: "search",
  },
  {
    iconName: "playlist",
    title: "playlist",
    route: "playlist",
  },
  {
    iconName: "library-music",
    title: "library",
    route: "library",
  },
  {
    iconName: "forder-open",
    title: "local",
    route: "local",
  },
  {
    iconName: "cog-8-tooth",
    title: "setting",
    route: "setting",
  },
];

export const SideFrame = ({ className, ...props }: ComponentPropsWithoutRef<"aside">) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside
      className={twMerge(
        "w-20 bg-[#efefef] h-[100vh] overflow-auto draggable flex items-center",
        className,
      )}
      {...props}
    >
      <div className="region-none mx-auto flex w-16 -translate-y-12 flex-col gap-2.5 rounded-lg py-5">
        <div
          className="mx-2 flex  items-center justify-center rounded-md bg-white py-1 opacity-80 shadow-xl transition-transform hover:scale-110 hover:opacity-100"
          onClick={() => navigate("/")}
        >
          <img className="size-8 object-cover" src={logo} alt="logo" />
        </div>
        {options.map(({ iconName, title, route }) => {
          return (
            <IconButton
              key={route}
              iconName={iconName}
              title={title}
              size={26}
              className={twMerge(
                "mx-2 rounded-md bg-white py-2.5 shadow-xl",
                location.pathname.startsWith(`/${route}`) &&
                  "opacity-100 scale-110 bg-slate-300/20",
              )}
              onClick={() => {
                navigate(`/${route}`);
              }}
            />
          );
        })}
      </div>
    </aside>
  );
};
