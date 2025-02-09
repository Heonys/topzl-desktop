import { useEffect, useState } from "react";
import hotkeys from "hotkeys-js";
import { getDefaultImage } from "@/utils";
import { IconButton } from "@/common";
import { PlayerState } from "@shared/plugin/type";

export const PipmodePage = () => {
  const [currentMusic, setCurrentMusic] = useState<MusicItem | null>(null);
  const [playerState, setPlayerState] = useState<PlayerState>(PlayerState.None);

  useEffect(() => {
    const data = (window as any).messagePort.syncCurrentMusicAndState();
    setCurrentMusic(data.track);
    setPlayerState(data.state);

    window.messagePort.on((message) => {
      if (message.type === "data") {
        setCurrentMusic(message.data);
      } else {
        setPlayerState(message.data);
      }
    });

    hotkeys("space", () => {
      handleClickAction("TogglePlayAndPause");
    });

    return () => hotkeys.unbind("space");
  }, []);

  const handleClickAction = (command: Command) => {
    window.common.proxyCommand(command);
  };

  return (
    <div className="draggable relative flex size-full select-none items-center justify-center gap-2 px-3">
      <div className="absolute inset-0 -z-20 bg-black/70"></div>
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-60 blur-lg transition-all"
        style={{ backgroundImage: `url(${getDefaultImage(currentMusic?.artwork)})` }}
      ></div>

      <img
        className="size-[65px] rounded-md object-cover"
        src={getDefaultImage(currentMusic?.artwork)}
        alt="cover image"
        draggable={false}
      />

      <div className="flex h-[65px] flex-1 flex-col items-center justify-center">
        <div className="flex w-full max-w-[230px] flex-col items-center text-center font-sans font-medium opacity-90">
          <div className="w-full truncate px-1 text-[10px] text-white/70">
            {currentMusic && currentMusic.artist}
          </div>
          <div className="w-full truncate px-1 py-0.5 text-xs text-white">
            {currentMusic ? currentMusic.title : "재생중인 곡이 없습니다"}
          </div>
        </div>
        <div className="flex flex-1 items-center  justify-center gap-5">
          <IconButton
            className="region-none"
            iconName="skip-previous"
            color="white"
            size={19}
            onClick={() => handleClickAction("Skip-Previous")}
          />
          <IconButton
            className="region-none"
            iconName={playerState === PlayerState.Playing ? "pause" : "play"}
            color="white"
            size={19}
            onClick={() => handleClickAction("TogglePlayAndPause")}
          />
          <IconButton
            className="region-none"
            iconName="skip-next"
            color="white"
            size={19}
            onClick={() => handleClickAction("Skip-Next")}
          />
        </div>
      </div>

      <div className="absolute right-1 top-1">
        <IconButton
          className="region-none"
          iconName="x-mark"
          size={18}
          color="white"
          onClick={() => {
            window.common.sendFrameAction("CLOSE");
          }}
        />
      </div>
    </div>
  );
};
