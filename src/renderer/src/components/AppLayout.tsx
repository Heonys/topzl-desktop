import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
import StaticIcon from "../icons/StaticIcon";
import { HeaderIconButton } from "./HeaderIconButton";
import logo from "@resources/logo.png";

export const RootLayout = ({ className, children, ...props }: ComponentPropsWithoutRef<"main">) => {
  return (
    <main className={twMerge("flex h-screen", className)} {...props}>
      {children}
    </main>
  );
};

export const SideBar = ({ className, ...props }: ComponentPropsWithoutRef<"aside">) => {
  return (
    <aside
      className={twMerge(
        "w-16 bg-[#efefef] h-[100vh] overflow-auto draggable flex items-start",
        className,
      )}
      {...props}
    >
      <div className="region-none mx-auto flex w-11 flex-col gap-3 rounded-lg bg-white py-5">
        {/* <HeaderIconButton iconName="github" title="github" size={25} /> */}
        <div className="mx-1 flex  items-center justify-center opacity-80 transition-transform hover:scale-110 hover:opacity-100">
          <img className="size-8 object-cover" src={logo} alt="logo" />
        </div>
        <div className="-my-4 flex justify-center opacity-10">
          <StaticIcon iconName={"divider-horizontal"} color="black" size={25} />
        </div>
        <HeaderIconButton iconName="record" title="record" size={25} />
        <HeaderIconButton iconName="search" title="search" size={25} />
        <HeaderIconButton iconName="chart" title="github" size={25} />
        <HeaderIconButton iconName="download" title="github" size={25} />
        <HeaderIconButton iconName="github" title="github" size={25} />
      </div>
    </aside>
  );
};
