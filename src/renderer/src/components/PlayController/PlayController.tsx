import { useRef, useState } from "react";
import Slider from "rc-slider";
import usePlayer from "@/hooks/useCurrentMusic";
import useDetail from "@/hooks/useDetail";
import trackPlayer from "@shared/plugin/trackPlayer";
import { setFallbackImage, getDefaultImage, formatTime } from "@/utils";
import { Switch, Case, IconButton } from "@/common";
import { PlayerState, RepeatMode } from "@shared/plugin/type";
import usePanel from "@/hooks/usePanel";

export const PlayController = () => {
  const {
    currentItem,
    playerState,
    currentProgress: { currentTime, duration },
    volume,
    speed,
    repeatMode,
    toggleRepeatMode,
  } = usePlayer();
  const { onOpen } = useDetail();
  const { onToggle } = usePanel();
  const lastVolumeRef = useRef<number>();
  const [showBubble, setShowBubble] = useState(false);

  const handleProgressClick = (event: React.MouseEvent) => {
    if (isFinite(duration) && duration) {
      trackPlayer.seekTo((duration * event.clientX) / window.innerWidth);
    }
  };

  return (
    <div className="region-none absolute bottom-0 left-0 flex h-16 w-full items-center border-t bg-white">
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
        <IconButton iconName="skip-previous" size={23} opacity />
        <IconButton
          opacity
          iconName={playerState === PlayerState.Playing ? "pause" : "play"}
          size={25}
          onClick={() => {
            if (playerState === PlayerState.Playing) trackPlayer.pause();
            else trackPlayer.play();
          }}
        />
        <IconButton iconName="skip-next" size={23} opacity />
      </div>

      <div className="flex h-full w-[360px] items-center justify-end gap-4 px-3 pr-5">
        <div
          className="relative"
          onMouseOver={() => setShowBubble(true)}
          onMouseOut={() => setShowBubble(false)}
        >
          <IconButton iconName="speed" size={18} opacity />
          {showBubble && (
            <div className="absolute bottom-full left-1/2 flex h-32 w-12 -translate-x-1/2  flex-col items-center justify-center gap-2 bg-white shadow-xl">
              <Slider
                vertical
                min={0.25}
                max={2}
                step={0.05}
                value={speed}
                onChange={(speed) => {
                  trackPlayer.setSpeed(speed as number);
                }}
                className="h-20 cursor-pointer"
                styles={{
                  track: { background: "black" },
                  handle: { visibility: "hidden" },
                  rail: { background: "#d8d8d8" },
                }}
              />
              <div className="text-sm">{`${speed.toFixed(2)}x`}</div>
            </div>
          )}
        </div>
        <div onClick={toggleRepeatMode}>
          <Switch switch={repeatMode}>
            <Case case={RepeatMode.Queue}>
              <IconButton iconName="repeat" size={18} opacity />
            </Case>
            <Case case={RepeatMode.Loop}>
              <IconButton iconName="repeat-1" size={18} opacity />
            </Case>
            <Case case={RepeatMode.Shuffle}>
              <IconButton iconName="shuffle" size={18} opacity />
            </Case>
          </Switch>
        </div>
        <div className="flex items-center gap-1">
          <IconButton
            onClick={() => {
              lastVolumeRef.current = lastVolumeRef.current || 0;
              if (volume === 0) {
                trackPlayer.setVolume(lastVolumeRef.current);
              } else {
                lastVolumeRef.current = volume;
                trackPlayer.setVolume(0);
              }
            }}
            iconName={volume === 0 ? "mute" : "volume"}
            size={18}
            opacity
          />
          <Slider
            min={0}
            max={1}
            step={0.01}
            value={volume}
            className="w-20 cursor-pointer"
            onChange={(volume) => {
              trackPlayer.setVolume(volume as number);
            }}
            styles={{
              track: { background: "black" },
              handle: { visibility: "hidden" },
              rail: { background: "#d8d8d8" },
            }}
          />
        </div>
        <IconButton onClick={onToggle} iconName="playlist" size={18} opacity />
      </div>
    </div>
  );
};
