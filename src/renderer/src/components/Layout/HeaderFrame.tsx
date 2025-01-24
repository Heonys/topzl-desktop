import { ComponentPropsWithoutRef, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";
import { HeaderNavigator } from "@/components";
import { SearchHistory } from "@/components/Search";
import StaticIcon from "@/icons/StaticIcon";
import { Condition, IconButton } from "@/common";
import { useSearchHistory } from "@/hooks";
import logo from "@resources/logo.png";

export const HeaderFrame = ({ className, ...props }: ComponentPropsWithoutRef<"aside">) => {
  const navigate = useNavigate();
  const { history, addHistory } = useSearchHistory();
  const inputRef = useRef<HTMLInputElement>(null);
  const [showHistory, setShowHistory] = useState(false);
  const isFocusedRef = useRef(false);

  const handleSearch = async () => {
    const inputValue = inputRef.current?.value;
    if (inputValue) {
      inputRef.current.value = "";
      search(inputValue);
    }
  };

  const search = (qeury: string) => {
    navigate(`/search/${encodeURIComponent(qeury)}`);
    addHistory(qeury);
    setShowHistory(false);
    inputRef.current?.blur();
  };

  return (
    <header
      className={twMerge(
        "absolute left-0 top-0 draggable w-full pl-5 h-14 flex items-center box-border justify-between bg-[#efefef]",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-center gap-3">
        <div className="mr-2 flex w-40 items-center gap-1">
          <div
            className="mx-2 flex w-10 items-center justify-start gap-1 rounded-lg bg-white px-2 py-1 shadow-xl"
            onClick={() => navigate("/")}
          >
            <img className="size-6 object-cover" src={logo} alt="logo" />
          </div>
          <div className="font-barlow font-bold">Topzl</div>
        </div>
        <HeaderNavigator />
        <div className="relative w-80">
          <div className="region-none flex h-7 items-center gap-2 rounded-lg bg-black/10 p-4 px-5">
            <StaticIcon iconName={"search"} color="black" size={18} opacity={0.6} />
            <input
              ref={inputRef}
              spellCheck={false}
              className="flex-1 bg-transparent font-sans text-sm font-semibold leading-5 outline-none placeholder:text-black/50"
              type="text"
              maxLength={40}
              placeholder="음악, 앨범, 아티스트 검색"
              onFocus={() => {
                setShowHistory(true);
              }}
              onBlur={() => {
                setTimeout(() => {
                  if (!isFocusedRef.current) {
                    setShowHistory(false);
                  }
                });
              }}
              onKeyDown={({ key }) => {
                if (key === "Enter") handleSearch();
                if (key === "Escape") setShowHistory(false);
              }}
            />
          </div>
          <Condition condition={history.length > 0 && showHistory}>
            <SearchHistory
              onClick={(query) => {
                search(query);
              }}
              onFocus={() => {
                isFocusedRef.current = true;
                setShowHistory(true);
              }}
              onBlur={() => {
                isFocusedRef.current = false;
                setShowHistory(false);
              }}
            />
          </Condition>
        </div>
      </div>
      <div className="region-none flex h-full items-center pr-4 text-2xl">
        {/* <div className="flex gap-3 rounded-xl border bg-white p-1 px-2">
          <IconButton iconName="sparkles" title="sparkles" />
          <IconButton iconName="language" title="language" />
          <IconButton iconName="t-shirt" title="t-shirt" />
          <IconButton iconName="dark-mode" title="dark-mode" />
          <IconButton iconName="push-pin" title="push-pin" />
        </div>
        <div className="flex w-5 justify-center opacity-20">
          <StaticIcon iconName={"divider-vertical"} color="black" />
        </div> */}
        <div className="flex gap-3 rounded-xl border bg-white p-1 px-2">
          <IconButton iconName="picture-in-picture" title="pip" />
          <IconButton
            iconName="minimize"
            title="minimize"
            onClick={() => window.common.sendFrameAction("MINIMIZE")}
          />
          <IconButton
            iconName="x-mark"
            title="close"
            onClick={() => window.common.sendFrameAction("CLOSE")}
          />
        </div>
      </div>
    </header>
  );
};
