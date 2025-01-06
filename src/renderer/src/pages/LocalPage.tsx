import { PlayListTable } from "@/components";
import { useCurrentMusic } from "@/hooks";
import StaticIcon from "@/icons/StaticIcon";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

export const LocalPage = () => {
  const { playlist, setPlaylist, removePlaylist } = useCurrentMusic();

  return (
    <section>
      <TabGroup>
        <TabList className="flex gap-4 font-sans text-lg font-semibold">
          <Tab
            className={({ selected }) => {
              return twMerge(
                "flex items-center gap-2 border-b-4 transition-all",
                selected && "border-blue-300",
              );
            }}
          >
            <StaticIcon iconName="forder-open" />
            <div>로컬음악 관리</div>
          </Tab>
          <Tab
            className={({ selected }) => {
              return twMerge(
                "flex items-center gap-2 border-b-4 transition-all",
                selected && "border-blue-300",
              );
            }}
          >
            <StaticIcon iconName="download" />
            <div>다운로드 목록</div>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <div className="mt-8 flex w-full justify-between">
              <button className="flex items-center gap-2 rounded-lg bg-[#E0E0E0]  p-2 px-4 font-sans text-sm font-semibold opacity-85 hover:opacity-100">
                <StaticIcon iconName="forder-open" />
                파일 자동스캔
              </button>
              <div className="flex items-center gap-1 rounded-md bg-black/10 px-2">
                <StaticIcon iconName="search" size={18} className="opacity-70" />
                <input
                  className="rounded-md bg-transparent px-2 outline-none"
                  type="text"
                  placeholder="search local music"
                />
              </div>
            </div>

            <div className="relative my-4 w-full">
              <PlayListTable
                playlist={playlist}
                setPlaylist={setPlaylist}
                removePlaylist={removePlaylist}
              />
            </div>
          </TabPanel>
          <TabPanel>
            <div className="relative my-4 w-full">
              <PlayListTable
                playlist={playlist}
                setPlaylist={setPlaylist}
                removePlaylist={removePlaylist}
              />
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </section>
  );
};
