import { useEffect, useState } from "react";
import { Tab, TabGroup, TabList } from "@headlessui/react";
import { useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useCurrentMusic } from "@/hooks/useCurrentMusic";
import { useFavorite, useSearch } from "@/hooks";
import { formatTime, setFallbackImage } from "@/utils";
import { SupportMediaType } from "@shared/plugin/type";
import { IconButton, Condition } from "@/common";
import { useModal } from "@/components/Modal/useModal";

const tabs: SupportMediaType[] = ["music", "album", "artist", "sheet"];

export const SearchPage = () => {
  const { query } = useParams();
  const decodedQuery = decodeURIComponent(query || "");
  const { search, isLoading, searchResult } = useSearch();
  const { currentItem, playMusicWithAddPlaylist } = useCurrentMusic();
  const [mediaType, setMediaType] = useState<SupportMediaType>("music");
  const { isFavorite, favorite, unfavorite } = useFavorite();
  const { showModal } = useModal();

  useEffect(() => {
    if (!searchResult || searchResult.query !== decodedQuery) {
      if (decodedQuery) {
        search(decodedQuery, 1, mediaType);
      }
    }
  }, [decodedQuery, mediaType, search, searchResult]);

  return (
    <div className="box-border flex size-full select-text flex-col items-start font-bold">
      <div className="mb-2 text-3xl font-medium text-gray-500">
        Search Results for
        <span className=" text-black">{` "${decodedQuery || searchResult?.query}"`}</span>
      </div>

      <TabGroup
        onChange={(index) => {
          setMediaType(tabs[index]);
        }}
        className="flex size-full select-none flex-col"
      >
        <TabList className="flex gap-4">
          {tabs.map((name) => (
            <Tab
              key={name}
              className={({ selected }) => {
                return twMerge(
                  "cursor-pointer px-3 text-xl font-semibold opacity-50 hover:opacity-90 focus:outline-none border-b-4",
                  selected && "border-black/80 opacity-100",
                );
              }}
            >
              {name}
            </Tab>
          ))}
        </TabList>

        <div className="mt-3 h-[calc(100%-9rem-4rem)] overflow-auto scrollbar-hide">
          <Condition condition={!isLoading}>
            {searchResult &&
              searchResult.data.data.map((item) => {
                const { id, title, artist, artwork, duration } = item;
                return (
                  <div
                    key={id}
                    className="flex h-16 w-full cursor-pointer items-center gap-3 rounded-md px-3 py-1 text-base font-semibold"
                  >
                    <IconButton
                      iconName={isFavorite(item.id) ? "heart-fill" : "heart"}
                      size={18}
                      onClick={() => {
                        if (isFavorite(item.id)) unfavorite(item.id);
                        else favorite(item);
                      }}
                    />
                    <img
                      className="size-14 rounded-md object-cover"
                      src={artwork}
                      alt="thumnail"
                      onError={setFallbackImage}
                    />
                    <div
                      className={twMerge(
                        "flex flex-1 items-center justify-between h-full rounded-md px-3 opacity-70 focus:outline-none",
                        id === currentItem?.id
                          ? "bg-blue-100 opacity-100"
                          : " hover:bg-gray-100 hover:opacity-100",
                      )}
                      onDoubleClick={() => {
                        playMusicWithAddPlaylist(item);
                      }}
                    >
                      <div className="flex flex-col gap-0">
                        <div>{title}</div>
                        <div className="text-xs text-gray-600">{artist}</div>
                      </div>
                      <div className="text-sm">{formatTime(duration)}</div>
                    </div>
                    <IconButton
                      iconName="add-playlist"
                      size={20}
                      onClick={() => showModal("SelectPlaylist", { selectedItem: item })}
                    />
                  </div>
                );
              })}
          </Condition>
        </div>
      </TabGroup>
    </div>
  );
};
