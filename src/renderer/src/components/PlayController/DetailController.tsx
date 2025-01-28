import { Case, IconButton, Switch } from "@/common";
import { usePlayer } from "@/hooks";
import { formatTime, getDefaultImage, setFallbackImage } from "@/utils";
import trackPlayer from "@shared/plugin/trackPlayer";
import { MusicItem, PlayerState, RepeatMode } from "@shared/plugin/type";
import Slider from "rc-slider";
import { useRef } from "react";

const GRAY = "#EAE6E5";

type Props = {
  currentItem: MusicItem;
};

export const DetailController = ({ currentItem }: Props) => {
  const {
    playerState,
    currentProgress: { currentTime, duration },
    volume,
    repeatMode,
    toggleRepeatMode,
    shuffleMode,
    toggleShuffleMode,
  } = usePlayer();
  const lastVolumeRef = useRef<number>();

  return (
    <div className="flex h-4/5 w-2/5 flex-col items-center justify-center gap-4 text-white">
      <img
        className="size-[50vh] rounded-2xl object-cover"
        alt="artwork"
        src={getDefaultImage(currentItem.artwork)}
        onError={setFallbackImage}
      />
      <div className="flex w-full flex-col gap-4 px-14">
        <div className="flex w-full gap-3">
          <div className="flex w-3/5 flex-col">
            <div className="truncate text-xl">{currentItem.title}</div>
            <div className="truncate text-sm text-gray-300">{currentItem.artist}</div>
          </div>
          <div className="flex flex-1 items-center justify-center gap-1">
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
              color="white"
              iconName={volume === 0 ? "mute" : "volume"}
              size={13}
              opacity
            />
            <Slider
              min={0}
              max={1}
              step={0.01}
              value={volume}
              className="cursor-pointer"
              onChange={(volume) => {
                trackPlayer.setVolume(volume as number);
              }}
              styles={{
                track: { background: "#EAE6E5" },
                handle: { visibility: "hidden" },
                rail: { background: "#888888" },
              }}
            />
          </div>
        </div>
        <div className="flex w-full items-center gap-3">
          <div className="p-1 text-xs text-gray-300">{formatTime(currentTime)}</div>
          <Slider
            min={0}
            max={duration}
            step={duration / 100}
            value={currentTime}
            className="cursor-pointer"
            onChange={(position) => {
              trackPlayer.seekTo(position as number);
            }}
            styles={{
              track: { background: "#EAE6E5" },
              handle: { visibility: "hidden" },
              rail: { background: "#888888" },
            }}
          />
          <div className="p-1 text-xs text-gray-300">{formatTime(duration)}</div>
        </div>
        <div className="flex items-center justify-center gap-6">
          <div onClick={toggleRepeatMode}>
            <Switch switch={repeatMode}>
              <Case case={RepeatMode.None}>
                <IconButton iconName="repeat" size={15} color={GRAY} />
              </Case>
              <Case case={RepeatMode.Queue}>
                <IconButton iconName="repeat" size={15} color="white" opacity />
              </Case>
              <Case case={RepeatMode.Loop}>
                <IconButton iconName="repeat-1" size={15} color="white" opacity />
              </Case>
            </Switch>
          </div>
          <IconButton
            iconName="skip-previous"
            size={25}
            opacity
            color={GRAY}
            onClick={() => {
              trackPlayer.skipToPrev();
            }}
          />
          <IconButton
            opacity
            color={GRAY}
            iconName={playerState === PlayerState.Playing ? "pause" : "play"}
            size={25}
            onClick={() => {
              if (playerState === PlayerState.Playing) trackPlayer.pause();
              else trackPlayer.play();
            }}
          />
          <IconButton
            iconName="skip-next"
            size={25}
            opacity
            color={GRAY}
            onClick={() => {
              trackPlayer.skipToNext();
            }}
          />
          <div onClick={toggleShuffleMode}>
            {shuffleMode ? (
              <IconButton iconName="shuffle" size={15} color="white" opacity />
            ) : (
              <IconButton iconName="shuffle" size={15} color={GRAY} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
