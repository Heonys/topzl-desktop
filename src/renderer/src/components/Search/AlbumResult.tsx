import { useNavigate } from "react-router-dom";
import { AlbumItem } from "@shared/plugin/type";

type Props = {
  searchResult: AlbumItem[];
  mediaType: SupportMediaType;
};

export const AlbumResult = ({ searchResult }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="grid w-full grid-cols-5 gap-3">
      {searchResult.map((item) => {
        return (
          <SearchAlbumCover
            key={item.id}
            data={item}
            onClick={() => {
              navigate("");
            }}
          />
        );
      })}
    </div>
  );
};

type CardProps = {
  data: AlbumItem;
  onClick: () => void;
};

const SearchAlbumCover = ({ data, onClick }: CardProps) => {
  return (
    <div className="group flex flex-col gap-2">
      <div
        className="relative aspect-square flex-1 overflow-hidden rounded-xl opacity-85 group-hover:opacity-100"
        onClick={onClick}
      >
        <div
          className="size-full bg-cover bg-center transition-transform duration-300 ease-out group-hover:scale-110"
          style={{ backgroundImage: `url(${data.artwork})` }}
        />
      </div>
      <div className="flex w-full flex-col items-start">
        <div className="w-full truncate text-sm" title={data.title}>
          {data.title}
        </div>
        <div className="w-full truncate text-xs text-gray-600">{data.artist}</div>
      </div>
    </div>
  );
};
