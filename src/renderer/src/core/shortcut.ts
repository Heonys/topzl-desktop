import hotkeys from "hotkeys-js";

export function defaultShortcut() {
  const originalFilter = hotkeys.filter;
  hotkeys.filter = (event) => {
    const tagName = (event.target as HTMLElement).tagName;
    const isHotkeyFilter = tagName === "INPUT" || tagName == "SELECT" || tagName === "TEXTAREA";
    if (isHotkeyFilter && (event.key === "ArrowUp" || event.key === "ArrowDown")) {
      return true;
    }
    return originalFilter(event);
  };

  // hotkeys("space, up, down", "playback", (e) => {
  //   e.preventDefault();
  //   const volume = audioElement.volume;
  //   switch (e.key) {
  //     case " ":
  //       if (trackPlayer.isPlaying()) {
  //         trackPlayer.pause();
  //       } else {
  //         trackPlayer.play();
  //       }
  //       break;
  //     case "ArrowUp":
  //       trackPlayer.setVolume(Math.min(volume + 0.025, 1));
  //       break;
  //     case "ArrowDown":
  //       trackPlayer.setVolume(Math.max(volume - 0.025, 0));
  //       break;
  //   }
  // });
}
