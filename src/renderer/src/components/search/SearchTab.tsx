import { Tab } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

const mapping: Record<string, string> = {
  music: "음악",
  album: "앨범",
  artist: "아티스트",
  playlist: "재생목록",
};

export const SearchTab = ({ name }: { name: string }) => {
  return (
    <Tab
      className={({ selected }) => {
        return twMerge(
          "cursor-pointer relative px-3 text-lg opacity-40 hover:opacity-90 focus:outline-none capitalize",
          "after:content-[''], after:w-[50%] after:h-1 after:absolute after:left-1/2 after:bottom-0 after:-translate-x-1/2",
          selected && "opacity-100 after:bg-blue-300",
        );
      }}
    >
      {mapping[name]}
    </Tab>
  );
};
