import { useSearchHistory } from "@/hooks";
import StaticIcon from "@/icons/StaticIcon";
import { MdHistory } from "react-icons/md";

type Props = {
  onClick: (query: string) => void;
  onFocus: () => void;
  onBlur: () => void;
};

export const SearchHistory = ({ onFocus, onBlur }: Props) => {
  const { history, removeHistory } = useSearchHistory();

  return (
    <div
      className="absolute left-0 top-[calc(100%+4px)] z-50 h-60 w-full rounded-md bg-white p-3 shadow-xl"
      tabIndex={-1}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <div className="flex flex-col gap-1">
        {history.map((qeury) => {
          return (
            <div
              key={qeury}
              className="flex w-full items-center gap-2 rounded-md p-1 hover:bg-black/10"
            >
              <div className="flex w-full flex-1 items-center gap-2">
                <MdHistory size={17} />
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
