import { Tab, TabGroup, TabList, TabPanels } from "@headlessui/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type MediaType = "music" | "album" | "artist" | "playlist";

export const SearchPage = () => {
  const navigate = useNavigate();
  const { query } = useParams();

  const arr = ["music", "album", "artist", "playlist"] as const;

  const [mediaType, setMediaType] = useState<MediaType>("music");

  return (
    <div className="box-border flex size-full select-text flex-col items-center">
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
          <TabPanels className="mt-3">
            <div className="">{mediaType}</div>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
};
