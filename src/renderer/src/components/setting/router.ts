import Backup from "./backup";
import Download from "./download";
import General from "./general";
import Lyric from "./lyric";
import Playback from "./playback";
import Shortcut from "./shortcut";
import About from "./about";

export default [
  { id: "general", component: General },
  { id: "playback", component: Playback },
  { id: "shortcut", component: Shortcut },
  { id: "lyric", component: Lyric },
  { id: "download", component: Download },
  { id: "backup", component: Backup },
  { id: "about", component: About },
];
