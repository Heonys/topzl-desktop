import StaticIcon from "@/icons/StaticIcon";
import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
import { HeaderIconButton } from "./HeaderIconButton";

export const HeaderFrame = ({ className, ...props }: ComponentPropsWithoutRef<"aside">) => {
  return (
    <header
      className={twMerge(
        "draggable w-full pl-16 h-12 flex items-center box-border justify-between z-50 py-2 mt-1 bg-[#efefef]",
        className,
      )}
      {...props}
    >
      <div className="region-none flex items-center justify-center gap-2 rounded-xl bg-white p-1 px-2 text-black">
        <StaticIcon iconName={"search"} color="black" size={20} opacity={0.5} />
        <input className="text-base outline-none" type="text" placeholder="Quick search..." />
      </div>
      <div className="region-none flex h-full items-center pr-4 text-2xl">
        <div className="flex gap-3 rounded-xl border bg-white p-1 px-2">
          <HeaderIconButton iconName="sparkles" title="sparkles" />
          <HeaderIconButton iconName="language" title="language" />
          <HeaderIconButton iconName="t-shirt" title="t-shirt" />
          <HeaderIconButton iconName="dark-mode" title="dark-mode" />
          <HeaderIconButton iconName="cog-8-tooth" title="cog-8-tooth" />
          <HeaderIconButton iconName="push-pin" title="push-pin" />
        </div>
        <div className="flex w-5 justify-center opacity-30">
          <StaticIcon iconName={"divider-vertical"} color="black" />
        </div>
        <div className="flex gap-3 rounded-xl border bg-white p-1 px-2">
          <HeaderIconButton iconName="picture-in-picture" title="pip" />
          <HeaderIconButton
            iconName="minimize"
            title="minimize"
            onclick={() => window.action.sendFrameAction("MINIMIZE")}
          />
          <HeaderIconButton
            iconName="x-mark"
            title="close"
            onclick={() => window.action.sendFrameAction("CLOSE")}
          />
        </div>
      </div>
    </header>
  );
};
