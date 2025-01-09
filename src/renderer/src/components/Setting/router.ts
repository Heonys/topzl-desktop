import BackupAndRestore from "./BackupAndRestore";
import Download from "./Download";
import General from "./General";
import Lyric from "./Lyric";
import Playback from "./Playback";
import Search from "./Search";
import Shortcut from "./Shortcut";
import Update from "./Update";

export default [
  { id: "general", title: "General", component: General },
  { id: "shortcut", title: "Shortcut", component: Shortcut },
  { id: "playback", title: "Playback", component: Playback },
  { id: "lyric", title: "Lyric", component: Lyric },
  { id: "search", title: "Search", component: Search },
  { id: "download", title: "Download", component: Download },
  { id: "update", title: "Update", component: Update },
  { id: "backup", title: "Backup & Restore", component: BackupAndRestore },
];
