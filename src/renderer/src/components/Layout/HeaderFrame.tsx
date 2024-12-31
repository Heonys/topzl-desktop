import { ComponentPropsWithoutRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";
import { HeaderNavigator } from "@/components";
import StaticIcon from "@/icons/StaticIcon";
import { IconButton } from "@/common";

export const HeaderFrame = ({ className, ...props }: ComponentPropsWithoutRef<"aside">) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const handleSearch = async () => {
    navigate(`/search/${encodeURIComponent(inputValue)}`);
    setInputValue("");
  };

  return (
    <header
      className={twMerge(
        "absolute left-0 top-0 draggable w-full pl-5 h-14 flex items-center box-border justify-between bg-[#efefef]",
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
          <IconButton iconName="sparkles" title="sparkles" />
          <IconButton iconName="language" title="language" />
          <IconButton iconName="t-shirt" title="t-shirt" />
          <IconButton iconName="dark-mode" title="dark-mode" />
          {/* <IconButton iconName="push-pin" title="push-pin" /> */}
        </div>
        <div className="flex w-5 justify-center opacity-20">
          <StaticIcon iconName={"divider-vertical"} color="black" />
        </div>
        <div className="flex gap-3 rounded-xl border bg-white p-1 px-2">
          <IconButton iconName="picture-in-picture" title="pip" />
          <IconButton
            iconName="minimize"
            title="minimize"
            onClick={() => window.action.sendFrameAction("MINIMIZE")}
          />
          <IconButton
            iconName="x-mark"
            title="close"
            onClick={() => window.action.sendFrameAction("CLOSE")}
          />
        </div>
      </div>
    </header>
  );
};
