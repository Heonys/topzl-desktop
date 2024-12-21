import useCurrentMusic from "@/hooks/useCurrentMusic";
import useSearch from "@/hooks/useSearch";
import { formatTime, setFallbackImage } from "@/utils";
import { Tab, TabGroup, TabList } from "@headlessui/react";
import { MusicItem, SupportMediaType } from "@shared/plugin/type";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const SearchPage = () => {
  const { query } = useParams();
  const { search } = useSearch();
  const [mediaType, setMediaType] = useState<SupportMediaType>("music");
  const { setCurrentItem } = useCurrentMusic();
  // 전역상태로 바꾸기
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<MusicItem[]>([]);

  const arr: SupportMediaType[] = ["music", "album", "artist", "sheet"];

  // 로딩 스피너 추가
  useEffect(() => {
    if (query) {
      setIsLoading(true);
      search(query, 1, mediaType).then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    }
  }, [query, mediaType, search]);

  return (
    <div className="box-border flex size-full select-text flex-col items-start px-10 font-bold">
      <div className="mb-2 mt-5 text-3xl font-medium text-gray-500">
        Search Results for
        <span className=" text-red-500">{` "${query}"`}</span>
      </div>

      <TabGroup
        onChange={(index) => {
          setMediaType(arr[index]);
        }}
        className="flex size-full select-none flex-col"
      >
        <TabList className="flex gap-4">
          {arr.map((name) => (
            <Tab
              key={name}
              className="cursor-pointer rounded-full px-3 py-1 text-lg font-semibold opacity-70 hover:opacity-90 focus:outline-none  "
            >
              {name}
            </Tab>
          ))}
        </TabList>

        <div className="h-[calc(100%-10rem-4rem)] overflow-auto scrollbar-hide">
          {!isLoading &&
            items.map((item) => {
              const { id, title, artist, artwork, duration } = item;
              return (
                <div
                  key={id}
                  className="flex h-16 w-full cursor-pointer gap-2 rounded-full px-3 py-1 text-base font-semibold "
                  onDoubleClick={() => {
                    // const res = await window.plugin.getMediaSource(id);
                    setCurrentItem(item);
                  }}
                >
                  {/* TODO: 이미지 가져오는거 찾아보기 */}
                  <img
                    className="w-14 rounded-md object-cover"
                    src={artwork}
                    alt="thumnail"
                    onError={setFallbackImage}
                  />
                  <div className="flex flex-1  items-center  justify-between px-3 opacity-70 hover:opacity-100 focus:outline-none  ">
                    <div className="flex flex-col gap-0">
                      <div>{title}</div>
                      <div className="text-xs text-gray-600">{artist}</div>
                    </div>
                    <div className="text-sm">{formatTime(duration)}</div>
                  </div>
                </div>
              );
            })}
        </div>
      </TabGroup>
    </div>
  );
};
