import trackPlayer from "@shared/plugin/trackPlayer";

export function defaultShortcut() {
  const audioElement = trackPlayer.getAudioElement();

  const handler = (e: KeyboardEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

    const volume = audioElement.volume;
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
        trackPlayer.setVolume(Math.min(volume + 0.025, 1));
        break;
      }
      case "ArrowDown": {
        e.preventDefault();
        trackPlayer.setVolume(Math.max(volume - 0.025, 0));
        break;
      }
    }
  };

  window.addEventListener("keydown", handler);
}
