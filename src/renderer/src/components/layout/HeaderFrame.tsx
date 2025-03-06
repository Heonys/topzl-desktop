import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";
import hotkeys from "hotkeys-js";
import { HeaderNavigator } from "@/components";
import { SearchHistory } from "@/components/search";
import StaticIcon from "@/icons/StaticIcon";
import { Condition, IconButton } from "@/common";
import { useCurrentMusic, usePlayer, useSearchHistory } from "@/hooks";
import logo from "@resources/logo.png";

export const HeaderFrame = ({ className, ...props }: ComponentPropsWithoutRef<"aside">) => {
  const navigate = useNavigate();
  const { currentItem } = useCurrentMusic();
  const { playerState } = usePlayer();
  const { history, addHistory } = useSearchHistory();
  const inputRef = useRef<HTMLInputElement>(null);
  const [showHistory, _setShowHistory] = useState(false);
  const isFocusedRef = useRef(false);

  const handleSearch = async () => {
    const inputValue = inputRef.current?.value;
    if (inputValue) {
      inputRef.current.value = "";
      search(inputValue);
    }
  };

  const openHistory = () => {
    _setShowHistory(true);
    hotkeys.setScope("history");
  };
  const closeHistory = () => {
    _setShowHistory(false);
    hotkeys.setScope("all");
  };

  const search = (qeury: string) => {
    navigate(`/search/${encodeURIComponent(qeury)}`);
    addHistory(qeury);
    closeHistory();
    inputRef.current?.blur();
  };

  useEffect(() => {
    hotkeys("ctrl+k", (event) => {
      event.preventDefault();
      inputRef.current?.focus();
    });
    return () => hotkeys.unbind("ctrl+k");
  }, []);

  if (!showHistory) {
    isFocusedRef.current = false;
  }

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
          <div className="text-xl text-black">Topzl</div>
        </div>
        <HeaderNavigator />
        <div className="relative w-80">
          <div className="region-none flex h-7 w-full items-center gap-2 rounded-lg bg-black/10 p-4 pr-3">
            <StaticIcon iconName={"search"} color="black" size={18} opacity={0.6} />
            <input
              tabIndex={-1}
              ref={inputRef}
              spellCheck={false}
              className="w-40 flex-1 bg-transparent font-sans text-sm font-semibold leading-5 outline-none placeholder:text-black/50"
              type="text"
              maxLength={40}
              placeholder="음악, 앨범, 아티스트 검색"
              onFocus={() => {
                openHistory();
              }}
              onBlur={() => {
                setTimeout(() => {
                  if (!isFocusedRef.current) {
                    closeHistory();
                  }
                });
              }}
              onKeyDown={({ key }) => {
                if (key === "Enter") handleSearch();
                if (key === "Escape") closeHistory();
              }}
            />
            <div
              className="cursor-pointer rounded-md px-2 py-0.5 font-sans text-xs shadow-md ring-1 ring-black/20"
              onClick={handleSearch}
            >
              Enter
            </div>
          </div>
          <Condition condition={history.length > 0 && showHistory}>
            <SearchHistory
              onClick={(query) => {
                search(query);
              }}
              onFocus={() => {
                isFocusedRef.current = true;
              }}
              onBlur={() => {
                isFocusedRef.current = false;
                closeHistory();
              }}
              syncInput={(history) => {
                if (history) {
                  inputRef.current!.value = history;
                } else {
                  inputRef.current!.value = "";
                }
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
          <IconButton
            iconName="picture-in-picture"
            title="pip"
            onClick={() => {
              window.common.setPipMode(currentItem, playerState);
              window.common.sendFrameAction("HIDE");
            }}
          />
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
