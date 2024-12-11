import useSearch from "@/hooks/useSearch";
import { Tab, TabGroup, TabList, TabPanels } from "@headlessui/react";
import { MusicItem } from "@shared/plugin/type";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type MediaType = "music" | "album" | "artist" | "playlist";

export const SearchPage = () => {
  const { query } = useParams();
  const { search } = useSearch();
  const [mediaType, setMediaType] = useState<MediaType>("music");
  // 전역상태로 바꾸기
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<MusicItem[]>([]);

  const arr = ["music", "album", "artist", "playlist"] as const;

  // 로딩 스피너 추가
  useEffect(() => {
    if (query) {
      setIsLoading(true);
      search(query, 1).then((res) => {
        setData(res.data);
        setIsLoading(false);
      });
    }
  }, [query, search]);

  return (
    <div className="box-border flex size-full select-text flex-col items-center overflow-auto">
      <div className="text-lg font-semibold">
        Search Result
        <span className="text-red-400">「{query}」</span>
      </div>
      <div className="flex h-screen w-full justify-center pt-10">
        <TabGroup
          onChange={(index) => {
            setMediaType(arr[index]);
          }}
        >
          <TabList className="flex gap-4">
            {arr.map((name) => (
              <Tab
                key={name}
                className="cursor-pointer rounded-full px-3 py-1 text-sm/6 font-semibold opacity-70 hover:opacity-90 focus:outline-none  "
              >
                {name}
              </Tab>
            ))}
          </TabList>

          <div>
            {!isLoading &&
              data.map(({ id, title, artist }) => (
                <div
                  key={id}
                  className="cursor-pointer rounded-full px-3 py-1 text-sm/6 font-semibold opacity-70 hover:opacity-90 focus:outline-none  "
                >
                  <div className="flex flex-col gap-2 border-2">
                    <div>title : {title}</div>
                    <div>artist : {artist}</div>
                  </div>
                </div>
              ))}
          </div>
        </TabGroup>
      </div>
    </div>
  );
};
