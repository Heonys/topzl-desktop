import { useEffect } from "react";
import trackPlayer from "@shared/plugin/trackPlayer";

const useAudioShortcuts = () => {
  useEffect(() => {
    const audioElement = trackPlayer.getAudioElement();

    const handler = (e: KeyboardEvent) => {
      const volumn = audioElement.volume;
      switch (e.key) {
        case " ": {
          e.preventDefault();
          if (trackPlayer.isPlaying()) {
            trackPlayer.pause();
          } else {
            trackPlayer.play();
          }
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          trackPlayer.setVolume(Math.min(volumn + 0.025, 1));
          break;
        }
        case "ArrowDown": {
          e.preventDefault();
          trackPlayer.setVolume(Math.max(volumn - 0.025, 0));
          break;
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return null;
};

export default useAudioShortcuts;
