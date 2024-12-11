import { ComponentPropsWithoutRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";
import { HeaderNavigator, HeaderIconButton } from "@/components";
import StaticIcon from "@/icons/StaticIcon";

export const HeaderFrame = ({ className, ...props }: ComponentPropsWithoutRef<"aside">) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const handleSearch = async () => {
    navigate(`/search/${inputValue}`);
  };

  return (
    <header
      className={twMerge(
        "draggable w-full pl-5 h-12 flex items-center box-border justify-between z-50 py-2 mt-1 bg-[#efefef]",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-center gap-4">
        <HeaderNavigator />
        <div className="region-none flex h-7 items-center justify-center gap-2 rounded-xl bg-white p-1 px-2">
          <StaticIcon iconName={"search"} color="black" size={18} opacity={0.5} />
          <input
            className="border-0 text-base leading-5 outline-none"
            type="text"
            placeholder="Search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(key) => {
              if (key.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </div>
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
        <div className="flex w-5 justify-center opacity-20">
          <StaticIcon iconName={"divider-vertical"} color="black" />
        </div>
        <div className="flex gap-3 rounded-xl border bg-white p-1 px-2">
          <HeaderIconButton iconName="picture-in-picture" title="pip" />
          <HeaderIconButton
            iconName="minimize"
            title="minimize"
            onClick={() => window.action.sendFrameAction("MINIMIZE")}
          />
          <HeaderIconButton
            iconName="x-mark"
            title="close"
            onClick={() => window.action.sendFrameAction("CLOSE")}
          />
        </div>
      </div>
    </header>
  );
};
