import { useEffect } from "react";
import { TabGroup, TabList, TabPanels, TabPanel } from "@headlessui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSearch } from "@/hooks";
import type { SupportMediaType } from "@shared/plugin/type";
import { Condition } from "@/common";
import { SearchResultRouter, SearchTab } from "@/components/Search";
import { LoadingSpinner } from "@/common/LoadingSpinner";

const tabs: SupportMediaType[] = ["music", "album", "artist", "playlist"];

export const SearchPage = () => {
  const { query } = useParams();
  const decodedQuery = decodeURIComponent(query || "");
  const { search, isLoading, searchResults, mediaType, onChangeType } = useSearch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (decodedQuery) {
      search(mediaType, decodedQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decodedQuery, mediaType]);

  return (
    <section className="box-border flex size-full select-text flex-col items-start">
      <div className="mb-2 flex items-center gap-2 text-3xl font-medium text-gray-500">
        <span className=" text-black">{`"${decodedQuery || searchResults[mediaType]?.query || ""}" `}</span>
        <span>에 대한 검색 결과</span>
      </div>

      <TabGroup
        defaultIndex={location.state?.tabIndex ?? 0}
        onChange={(index) => {
          onChangeType(tabs[index]);
          navigate("", { replace: true, state: { tabIndex: index } });
        }}
        className="flex size-full select-none flex-col"
      >
        <TabList className="flex gap-3">
          {tabs.map((name) => (
            <SearchTab key={name} name={name} />
          ))}
        </TabList>

        <TabPanels className="relative mt-3 flex h-[calc(100%-9rem-4rem)] w-full overflow-auto scrollbar-hide">
          {tabs.map((tab) => (
            <TabPanel key={tab} className="w-full">
              <Condition
                condition={!isLoading}
                fallback={
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <LoadingSpinner classname="bg-black/80 size-5" message="잠시만 기다려 주세요" />
                  </div>
                }
              >
                {searchResults[tab]?.data && (
                  <SearchResultRouter
                    searchResult={searchResults[tab].data}
                    type={searchResults[tab].type}
                  />
                )}
              </Condition>
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </section>
  );
};
