import { Backdrop, Header } from "./Layout";
import { twMerge } from "tailwind-merge";

type Props = {
  title: string;
};

export const LyricsSearch = ({ title }: Props) => {
  return (
    <Backdrop>
      <div
        className="flex h-[50vh] w-[50vw] flex-col rounded-lg bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <Header>
          <input
            className={twMerge(
              "w-full bg-gray-300 outline-none",
              "rounded-lg py-1.5 px-3 text-sm/6 font-barlow font-bold",
              "opacity-50",
            )}
            disabled
            value={title}
            type="text"
          />
        </Header>
      </div>
    </Backdrop>
  );
};
