import { IconButton } from "@/common";
import { useCurrentMusic, usePlayer } from "@/hooks";

export const HeaderButtons = () => {
  const { currentItem } = useCurrentMusic();
  const { playerState } = usePlayer();

  return (
    <div className="region-none flex h-full items-center pr-4 text-2xl">
      {/* <div className="flex gap-3 rounded-xl border bg-white p-1 px-2">
        <IconButton iconName="sparkles" title="sparkles" />
        <IconButton iconName="language" title="language" />
        <IconButton iconName="t-shirt" title="t-shirt" />
        <IconButton iconName="dark-mode" title="dark-mode" />
        <IconButton iconName="push-pin" title="push-pin" />
      </div>
      <div className="flex w-5 justify-center opacity-20">
        <StaticIcon iconName={"divider-vertical"} color="black" />
      </div> */}
      <div className="flex gap-3 rounded-xl border bg-white p-1 px-2">
        <IconButton
          iconName="picture-in-picture"
          title="pip"
          onClick={() => {
            window.common.setPipMode(currentItem, playerState);
            window.common.sendFrameAction("HIDE");
          }}
        />
        <IconButton
          iconName="minimize"
          title="minimize"
          onClick={() => window.common.sendFrameAction("MINIMIZE")}
        />
        <IconButton
          iconName="x-mark"
          title="close"
          onClick={() => window.common.sendFrameAction("CLOSE")}
        />
      </div>
    </div>
  );
};
