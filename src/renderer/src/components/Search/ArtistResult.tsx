// import { useNavigate } from "react-router-dom";
import { Condition } from "@/common";
import { Empty } from "@/common/Empty";
import { ArtistItem } from "@shared/plugin/type";
import { LoadMoreFooter } from "./LoadMoreFooter";

type Props = {
  searchResult: ArtistItem[];
  isEnd: boolean;
  mediaType: SupportMediaType;
};

export const ArtistResult = ({ searchResult, isEnd, mediaType }: Props) => {
  // const navigate = useNavigate();

  return (
    <Condition
      condition={searchResult.length > 0}
      fallback={<Empty message="일치하는 검색 결과가 없습니다" />}
    >
      <div className="grid w-full grid-cols-5 gap-3">
        {searchResult.map((item) => (
          <div className="group flex flex-col gap-2" key={item.id}>
            <div
              className="relative aspect-square flex-1 overflow-hidden rounded-xl opacity-85 group-hover:opacity-100"
              onClick={() => {
                // navigate(`/searchView/${mediaType}/${item.id}`, { state: { item } });
              }}
            >
              <div
                className="size-full bg-cover bg-center transition-transform duration-300 ease-out group-hover:scale-110"
                style={{ backgroundImage: `url(${item.avatar})` }}
              />
            </div>
            <div className="flex w-full flex-col items-start">
              <div className="w-full truncate text-sm" title={item.name}>
                {item.name}
              </div>
            </div>
          </div>
        ))}
      </div>
      <LoadMoreFooter isEnd={isEnd} mediaType={mediaType} />
    </Condition>
  );
};
