import Backup from "./backup";
import Download from "./download";
import General from "./general";
import Lyric from "./lyric";
import Playback from "./playback";
import Shortcut from "./shortcut";
import About from "./about";
// import Update from "./update";

export default [
  { id: "general", title: "General", component: General },
  { id: "playback", title: "Playback", component: Playback },
  { id: "shortcut", title: "Shortcut", component: Shortcut },
  { id: "lyric", title: "Lyric", component: Lyric },
  { id: "download", title: "Download", component: Download },
  // { id: "update", title: "Update", component: Update },
  { id: "backup", title: "Backup & Restore", component: Backup },
  { id: "about", title: "About", component: About },
];
