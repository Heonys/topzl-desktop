import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { AlbumItem } from "@shared/plugin/type";
import { Empty } from "@/common/Empty";
import { Condition } from "@/common";
import { LoadMoreFooter } from "./LoadMoreFooter";

type Props = {
  searchResult: AlbumItem[];
  isEnd: boolean;
  mediaType: SupportMediaType;
};

export const AlbumResult = ({ searchResult, isEnd, mediaType }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Condition
      condition={searchResult.length > 0}
      fallback={<Empty message={t("common.empty_message")} />}
    >
      <div className="grid w-full grid-cols-5 gap-3">
        {searchResult.map((item) => (
          <div className="group flex flex-col gap-2" key={item.id}>
            <div
              className="relative aspect-square flex-1 overflow-hidden rounded-xl opacity-90 group-hover:opacity-100"
              onClick={() => {
                navigate(`/searchView/${mediaType}/${item.id}`, { state: { item } });
              }}
            >
              <div
                className="size-full bg-cover bg-center transition-transform duration-300 ease-out group-hover:scale-110"
                style={{ backgroundImage: `url(${item.artwork})` }}
              />
            </div>
            <div className="flex w-full flex-col items-start">
              <div className="w-full truncate text-sm" title={item.title}>
                {item.title}
              </div>
              <div className="w-full truncate text-xs text-gray-600">{item.artist}</div>
            </div>
          </div>
        ))}
      </div>
      <LoadMoreFooter isEnd={isEnd} mediaType={mediaType} />
    </Condition>
  );
};
