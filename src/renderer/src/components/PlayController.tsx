import useCurrentMusic from "@/hooks/useCurrentMusic";
import trackPlayer from "@shared/plugin/trackPlayer";
import { setFallbackImage, getDefaultImage, formatTime } from "@/utils";
import { IconButton } from "./HeaderIconButton";
import { PlayerState } from "@shared/plugin/type";
import useDetail from "@/hooks/useDetail";

export const PlayController = () => {
  const {
    currentItem,
    playerState,
    currentProgress: { currentTime, duration },
  } = useCurrentMusic();
  const { onOpen } = useDetail();

  const handleProgressClick = (event: React.MouseEvent) => {
    if (isFinite(duration) && duration) {
      trackPlayer.seekTo((duration * event.clientX) / window.innerWidth);
    }
  };

  return (
    <div className="region-none absolute bottom-0 left-0 flex h-16 w-full items-center border-t bg-white ">
      <button
        className="group absolute -top-1.5 left-0 flex h-3 w-full items-center"
        onClick={handleProgressClick}
      >
        <div className="absolute h-0.5 w-full bg-[#d8d8d8] transition-all duration-75 ease-linear group-hover:h-1"></div>
        <div
          className="absolute -left-full h-0.5 w-full bg-blue-600 transition-all duration-75 ease-linear group-hover:h-1"
          style={{ transform: `translateX(${(currentTime / duration) * 100}%)` }}
        ></div>
      </button>
      <div className="box-border h-[48px] w-[360px] px-3">
        {currentItem && (
          <div className="flex items-center gap-3">
            <img
              className="size-10 rounded object-cover"
              crossOrigin="anonymous"
              alt="currentMusic"
              src={getDefaultImage(currentItem.artwork)}
              onError={setFallbackImage}
              onClick={onOpen}
            ></img>
            <div className="flex max-w-[calc(100%-50px)] flex-1 flex-col">
              <div className="truncate">{currentItem.title}</div>
              <div className="flex items-center justify-between">
                <div className="max-w-[200px] truncate text-sm opacity-80">
                  {currentItem.artist}
                </div>
                <div className="text-sm">{`${formatTime(currentTime)}/${formatTime(currentItem.duration)}`}</div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex h-full flex-1 items-center justify-center gap-5">
        <IconButton iconName="skip-previous" size={20} opacity />
        <IconButton
          opacity
          iconName={playerState === PlayerState.Playing ? "pause" : "play"}
          size={23}
          onClick={() => {
            if (playerState === PlayerState.Playing) trackPlayer.pause();
            else trackPlayer.play();
          }}
        />
        <IconButton iconName="skip-next" size={20} opacity />
      </div>
      <div className="flex h-full w-[360px] items-center justify-end gap-5 px-3 pr-5">
        <IconButton iconName="speed" size={22} opacity />
        <IconButton iconName="volume" size={22} opacity />
        <IconButton iconName="lyric" size={22} opacity />
        <IconButton iconName="repeat" size={22} opacity />
        <IconButton iconName="playlist" size={22} opacity />
      </div>
    </div>
  );
};
