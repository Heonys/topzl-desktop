import { useTranslation } from "react-i18next";
import { Condition, IconButton } from "@/common";
import { useModal } from "../modal/useModal";
import { useCurrentMusic, usePlayer } from "@/hooks";
import { cn, formatTime, setFallbackImage } from "@/utils";
import { Empty } from "@/common/Empty";
import { LoadMoreFooter } from "./LoadMoreFooter";
import { Equaliser } from "@/common/Equaliser";
import { PlayerState } from "@shared/plugin/type";

type Props = {
  musicItems: MusicItem[];
  isEnd: boolean;
  mediaType: SupportMediaType;
};

export const MusicResult = ({ musicItems, isEnd, mediaType }: Props) => {
  const { currentItem, playWithAddPlaylist } = useCurrentMusic();
  const { playerState } = usePlayer();
  const { showModal } = useModal();
  const { t } = useTranslation();

  return (
    <Condition
      condition={musicItems.length > 0}
      fallback={<Empty message={t("common.empty_message")} />}
    >
      {musicItems.map((item, index) => {
        const { id, title, artist, artwork, duration } = item;
        return (
          <div
            key={id}
            className={cn(
              "group flex h-16 w-full cursor-pointer items-center gap-2 rounded-md px-3 py-1 text-base font-semibold",
              id === currentItem?.id
                ? "bg-blue-100 opacity-100"
                : "hover:bg-gray-100 hover:opacity-100",
            )}
          >
            <div className="flex w-7 items-center justify-center font-lex text-sm font-semibold">
              {id === currentItem?.id && playerState === PlayerState.Playing ? (
                <Equaliser />
              ) : (
                `${index + 1}`.padStart(2, "0")
              )}
            </div>
            <img
              className="size-14 rounded-md object-cover"
              src={artwork}
              alt="thumnail"
              onError={setFallbackImage}
              loading="lazy"
            />
            <div
              className={cn(
                "flex flex-1 items-center justify-between h-full rounded-md px-3 opacity-70 focus:outline-none",
                "group-hover:opacity-100",
              )}
              onDoubleClick={() => {
                playWithAddPlaylist(item);
              }}
            >
              <div className="flex max-w-[550px] flex-1 flex-col">
                <div className="truncate">{title}</div>
                <div className="text-xs text-gray-600">{artist}</div>
              </div>
              {/* <div className="">
                <div className="block group-hover:hidden"></div>
                <div className="hidden flex-col group-hover:flex">
                  <IconButton
                    iconName={isFavorite(item.id) ? "heart-fill" : "heart"}
                    color={isFavorite(item.id) ? "red" : "black"}
                    size={18}
                    onClick={() => {
                      if (isFavorite(item.id)) unfavorite(item.id);
                      else favorite(item);
                    }}
                  />
                </div>
              </div> */}
              <div className="w-10 text-start font-barlow text-sm">{formatTime(duration)}</div>
            </div>
            <IconButton
              iconName="add-playlist"
              size={20}
              onClick={() => showModal("SelectPlaylist", { selectedItem: item })}
            />
          </div>
        );
      })}
      <LoadMoreFooter isEnd={isEnd} mediaType={mediaType} />
    </Condition>
  );
};
