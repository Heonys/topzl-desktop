import { useNavigate } from "react-router-dom";
import { AlbumItem } from "@shared/plugin/type";
import { Empty } from "@/common/Empty";
import { Condition } from "@/common";

type Props = {
  searchResult: AlbumItem[];
  mediaType: SupportMediaType;
};

export const AlbumResult = ({ searchResult, mediaType }: Props) => {
  const navigate = useNavigate();

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
    </Condition>
  );
};
