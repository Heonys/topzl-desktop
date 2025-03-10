import { Tab } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

export const SearchTab = ({ name }: { name: string }) => {
  const { t } = useTranslation();

  const mapping: Record<string, string> = {
    music: t("search.music"),
    album: t("search.album"),
    artist: t("search.artist"),
    playlist: t("search.playlist"),
  };

  return (
    <Tab
      className={({ selected }) => {
        return twMerge(
          "cursor-pointer relative px-3 text-lg opacity-40 hover:opacity-90 focus:outline-none",
          "after:content-[''], after:w-[50%] after:h-1 after:absolute after:left-1/2 after:bottom-0 after:-translate-x-1/2",
          selected && "opacity-100 after:bg-blue-300",
        );
      }}
    >
      {mapping[name]}
    </Tab>
  );
};
