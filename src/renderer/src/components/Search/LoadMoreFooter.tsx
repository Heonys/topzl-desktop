import { Condition } from "@/common";
import { useSearch } from "@/hooks";
// import StaticIcon from "@/icons/StaticIcon";

type Props = {
  isEnd: boolean;
  mediaType: SupportMediaType;
};

export const LoadMoreFooter = ({ isEnd, mediaType }: Props) => {
  const { search } = useSearch();

  return (
    <Condition condition={!isEnd}>
      <div className="flex h-16 items-center justify-center">
        <button
          className="rounded-md border-2 border-black/40 p-1 px-2 text-black/80"
          onClick={() => search(mediaType)}
        >
          더 불러오기
          {/* <StaticIcon iconName="more" size={20} /> */}
        </button>
      </div>
    </Condition>
  );
};
