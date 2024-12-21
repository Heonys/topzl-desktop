import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
import StaticIcon from "@/icons/StaticIcon";
import { IconButton } from "@/components/HeaderIconButton";
import logo from "@resources/logo.png";
import { useNavigate } from "react-router-dom";

type OptionTypes = {
  iconName: ComponentPropsWithoutRef<typeof StaticIcon>["iconName"];
  title: string;
  route: string;
};
const options: OptionTypes[] = [
  {
    iconName: "record",
    title: "record",
    route: "setting",
  },
  {
    iconName: "search",
    title: "search",
    route: "search/side",
  },
  {
    iconName: "forder-open",
    title: "local",
    route: "local",
  },
  {
    iconName: "chart",
    title: "chart",
    route: "chart",
  },

  {
    iconName: "download",
    title: "download",
    route: "download",
  },
];

export const SideFrame = ({ className, ...props }: ComponentPropsWithoutRef<"aside">) => {
  const navigate = useNavigate();
  return (
    <aside
      className={twMerge(
        "w-20 bg-[#efefef] h-[100vh] overflow-auto draggable flex items-center",
        className,
      )}
      {...props}
    >
      <div className="region-none mx-auto flex w-14 -translate-y-12 flex-col gap-4 rounded-lg bg-white py-5">
        <button
          className="mx-1 flex  items-center justify-center opacity-80 transition-transform hover:scale-110 hover:opacity-100"
          onClick={() => navigate("/")}
        >
          <img className="size-9 object-cover" src={logo} alt="logo" />
        </button>
        <div className="-my-4 flex justify-center opacity-10">
          <StaticIcon iconName={"divider-horizontal"} color="black" size={28} />
        </div>
        {options.map(({ iconName, title, route }) => {
          return (
            <IconButton
              key={route}
              iconName={iconName}
              title={title}
              size={28}
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
