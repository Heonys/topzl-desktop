import { Condition, IconButton } from "@/common";
import { useModal } from "../Modal/useModal";
import { useCurrentMusic, useFavorite, useSearch } from "@/hooks";
import { cn, formatTime, setFallbackImage } from "@/utils";
import { Empty } from "@/common/Empty";

type Props = {
  musicItems: MusicItem[];
  mediaType: SupportMediaType;
};

export const MusicResult = ({ musicItems, mediaType }: Props) => {
  const { currentItem, playMusicWithAddPlaylist } = useCurrentMusic();
  const { isFavorite, favorite, unfavorite } = useFavorite();
  const { showModal } = useModal();
  const { search } = useSearch();

  return (
    <>
      {musicItems.map((item) => {
        const { id, title, artist, artwork, duration } = item;
        return (
          <div
            key={id}
            className="flex h-16 w-full cursor-pointer items-center gap-3 rounded-md px-3 py-1 text-base font-semibold"
          >
            <IconButton
              iconName={isFavorite(item.id) ? "heart-fill" : "heart"}
              color={isFavorite(item.id) ? "red" : "black"}
              size={18}
              onClick={() => {
                if (isFavorite(item.id)) unfavorite(item.id);
                else favorite(item);
              }}
            />
            <img
              className="size-14 rounded-md object-cover"
              src={artwork}
              alt="thumnail"
              onError={setFallbackImage}
            />
            <div
              className={cn(
                "flex flex-1 items-center justify-between h-full rounded-md px-3 opacity-70 focus:outline-none",
                id === currentItem?.id
                  ? "bg-blue-100 opacity-100"
                  : " hover:bg-gray-100 hover:opacity-100",
              )}
              onDoubleClick={() => {
                playMusicWithAddPlaylist(item);
              }}
            >
              <div className="flex flex-col gap-0">
                <div>{title}</div>
                <div className="text-xs text-gray-600">{artist}</div>
              </div>
              <div className="text-sm">{formatTime(duration)}</div>
            </div>
            <IconButton
              iconName="add-playlist"
              size={20}
              onClick={() => showModal("SelectPlaylist", { selectedItem: item })}
            />
          </div>
        );
      })}
      <Condition
        condition={musicItems.length === 0}
        fallback={
          <div className="flex h-16 items-center justify-center">
            <button
              className="rounded-md border-2 border-black/40 p-1 px-2 text-black/80"
              onClick={() => {
                search(mediaType);
              }}
            >
              더 불러오기
            </button>
          </div>
        }
      >
        <Empty message="조건에 맞는 검색 결과가 없습니다" />
      </Condition>
    </>
  );
};
