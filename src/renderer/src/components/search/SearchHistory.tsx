import { useState, useEffect } from "react";
import hotkeys from "hotkeys-js";
import { useSearchHistory } from "@/hooks";
import StaticIcon from "@/icons/StaticIcon";
import { cn } from "@/utils";

type Props = {
  onClick: (query: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  syncInput: (history: string) => void;
};

export const SearchHistory = ({ onClick, onFocus, onBlur, syncInput }: Props) => {
  const { history, removeHistory } = useSearchHistory();
  const [focusedIndex, setFocusedIndex] = useState(-1);

  useEffect(() => {
    hotkeys("up, down", "history", (e) => {
      e.preventDefault();
      setFocusedIndex((prevFocusedIndex) => {
        switch (e.key) {
          case "ArrowUp":
            return Math.max(-1, prevFocusedIndex - 1);
          case "ArrowDown":
            return Math.min(history.length - 1, prevFocusedIndex + 1);
          default:
            return prevFocusedIndex;
        }
      });
    });
    return () => {
      hotkeys.setScope("all");
      hotkeys.unbind("up, down", "history");
    };
  }, [history.length]);

  useEffect(() => {
    syncInput(history[focusedIndex]);
  }, [history, focusedIndex, syncInput]);

  return (
    <div
      className="absolute left-0 top-[calc(100%+4px)] z-50 w-full rounded-md bg-white p-3 shadow-xl"
      tabIndex={-1}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={({ key }) => {
        if (key === "Escape") onBlur();
      }}
    >
      <div className="flex flex-col gap-1">
        {history.map((qeury, index) => {
          return (
            <div
              key={qeury}
              className={cn(
                "flex w-full items-center gap-2 rounded-md p-1 hover:bg-black/10",
                focusedIndex === index ? "ring-2 ring-blue-400" : "",
              )}
            >
              <div className="flex w-full flex-1 items-center gap-2" onClick={() => onClick(qeury)}>
                <StaticIcon iconName="history" size={17} />
                <span className="max-w-56 truncate font-sans text-sm font-semibold" title={qeury}>
                  {qeury}
                </span>
              </div>
              <StaticIcon
                className="cursor-pointer"
                iconName="x-mark"
                onClick={() => removeHistory(qeury)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
