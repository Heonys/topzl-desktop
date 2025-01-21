import { useEffect } from "react";
import { TabGroup, TabList, TabPanels, TabPanel } from "@headlessui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSearch } from "@/hooks";
import type { SupportMediaType } from "@shared/plugin/type";
import { Condition } from "@/common";
import { SearchResult, SearchTab } from "@/components/Search";
import { LoadingSpinner } from "@/common/LoadingSpinner";

const tabs: SupportMediaType[] = ["music", "album", "artist"];

export const SearchPage = () => {
  const { query } = useParams();
  const decodedQuery = decodeURIComponent(query || "");
  const { search, isLoading, searchResult, mediaType, onChangeType } = useSearch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (decodedQuery) {
      search(decodedQuery, 1, mediaType);
    }
  }, [decodedQuery, mediaType, search]);

  return (
    <div className="box-border flex size-full select-text flex-col items-start">
      <div className="mb-2 flex items-center gap-2 text-3xl font-medium text-gray-500">
        <span className=" text-black">{`"${decodedQuery || searchResult?.query || ""}" `}</span>
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
                    <LoadingSpinner classname="bg-slate-500" />
                  </div>
                }
              >
                {searchResult && <SearchResult data={searchResult.data} type={tab} />}
              </Condition>
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  );
};
