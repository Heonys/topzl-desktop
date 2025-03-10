import { useEffect } from "react";
import { TabGroup, TabList, TabPanels, TabPanel } from "@headlessui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSearch } from "@/hooks";
import type { SupportMediaType } from "@shared/plugin/type";
import { Condition } from "@/common";
import { SearchResultRouter, SearchTab } from "@/components/search";
import { LoadingSpinner } from "@/common/LoadingSpinner";
import { Empty } from "@/common/Empty";

const tabs: SupportMediaType[] = ["music", "album", "artist", "playlist"];

export const SearchPage = () => {
  const { query } = useParams();
  const decodedQuery = decodeURIComponent(query || "");
  const { search, isLoading, searchResults, mediaType, onChangeType } = useSearch();
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const lang = i18n.language;
  const computedQuery = decodedQuery || searchResults[mediaType]?.query || "";

  useEffect(() => {
    if (decodedQuery) {
      search(mediaType, decodedQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decodedQuery, mediaType]);

  return (
    <section className="box-border flex size-full select-text flex-col items-start">
      <div className="mb-2 flex items-center gap-2 text-3xl font-medium text-gray-500">
        {lang === "ko-KR" ? (
          <div>
            <span className="text-black">{`"${computedQuery}" `}</span>
            <span>{t("search.search_result_message")}</span>
          </div>
        ) : (
          <div>
            <span>{t("search.search_result_message")}</span>
            <span className="text-black">{` "${computedQuery}"`}</span>
          </div>
        )}
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
            <TabPanel key={tab} className="w-full" tabIndex={-1}>
              <Condition
                condition={!isLoading}
                fallback={
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <LoadingSpinner
                      classname="bg-black/80 size-5"
                      message={t("common.loading_message")}
                    />
                  </div>
                }
              >
                {searchResults[tab]?.data ? (
                  <SearchResultRouter
                    searchResult={searchResults[tab].data}
                    type={searchResults[tab].type}
                  />
                ) : (
                  <Empty message={t("search.search_empty_message")} />
                )}
              </Condition>
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </section>
  );
};
