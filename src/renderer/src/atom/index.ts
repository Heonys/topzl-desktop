import { MusicItem } from "@shared/plugin/type";
import { atom } from "jotai";
import { loadable } from "jotai/utils";
import trackPlayer from "@shared/plugin/trackPlayer";

export const currentMusicAtom = atom<MusicItem>({
  id: 43413580,
  artwork:
    "https://assets.audiomack.com/adya8788/ca77d40b91cb38efd1eebdde6a90ddd74e2f5d6943c8652de65eadf9c000e540.jpeg",
  duration: 163,
  title: "APT.",
  artist: "ROSE (BLACKPINK) & Bruno Mars",
  album: "APT. (ROSÉ & Bruno Mars)",
  url_slug: "apt",
});

const mediaSourceAtomAsync = atom(async (get) => {
  const currentMusic = get(currentMusicAtom);
  const result = await window.plugin.getMediaSource(currentMusic.id);
  trackPlayer.setTrackSource({ url: result.url }, currentMusic);
  return result;
});

export const mediaSourceAtom = loadable(mediaSourceAtomAsync);

export const isPlayingAtom = atom(false);

export const searchResultAtom = atom({});
