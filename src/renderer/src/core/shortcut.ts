import hotkeys from "hotkeys-js";
import trackPlayer from "@shared/plugin/trackPlayer";

export function defaultShortcut() {
  const audioElement = trackPlayer.getAudioElement();

  hotkeys.setScope("playback");
  const originalFilter = hotkeys.filter;
  hotkeys.filter = (event) => {
    const target = event.target as HTMLElement;
    const isInputOrTextArea = target.tagName === "INPUT" || target.tagName === "TEXTAREA";
    if (isInputOrTextArea && (event.key === "ArrowUp" || event.key === "ArrowDown")) {
      return true;
    }
    return originalFilter(event);
  };

  hotkeys("space, up, down", "playback", (e) => {
    e.preventDefault();
    const volume = audioElement.volume;
    switch (e.key) {
      case " ":
        if (trackPlayer.isPlaying()) {
          trackPlayer.pause();
        } else {
          trackPlayer.play();
        }
        break;
      case "ArrowUp":
        trackPlayer.setVolume(Math.min(volume + 0.025, 1));
        break;
      case "ArrowDown":
        trackPlayer.setVolume(Math.max(volume - 0.025, 0));
        break;
    }
  });
}
