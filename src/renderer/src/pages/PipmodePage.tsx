import { getDefaultImage } from "@/utils";
import { IconButton } from "@/common";
import { useEffect, useState } from "react";

export const PipmodePage = () => {
  const [currentMusic, setCurrentMusic] = useState<MusicItem | null>(null);

  useEffect(() => {
    const data = (window as any).messagePort.syncCurrentMusic();
    setCurrentMusic(data.track);

    window.messagePort.on((data) => {
      setCurrentMusic(data);
    });
  }, []);

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
        <div className="w-full p-2 text-center font-sans text-xs font-medium text-white opacity-90">
          {currentMusic && `${currentMusic.artist} - ${currentMusic.title}`}
        </div>
        <div className="flex flex-1 items-center  justify-center gap-5">
          <IconButton className="region-none" iconName="repeat" color="white" size={14} />
          <IconButton className="region-none" iconName="skip-previous" color="white" />
          <IconButton className="region-none" iconName="play" color="white" />
          <IconButton className="region-none" iconName="skip-next" color="white" />
          <IconButton className="region-none" iconName="shuffle" color="white" size={14} />
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
