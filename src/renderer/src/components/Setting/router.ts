import BackupAndRestore from "./BackupAndRestore";
import Download from "./Download";
import General from "./General";
import Lyric from "./Lyric";
import Playback from "./Playback";
import Shortcut from "./Shortcut";
import Update from "./Update";

export default [
  { id: "general", title: "General", component: General },
  { id: "playback", title: "Playback", component: Playback },
  { id: "shortcut", title: "Shortcut", component: Shortcut },
  { id: "lyric", title: "Lyric", component: Lyric },
  { id: "download", title: "Download", component: Download },
  { id: "update", title: "Update", component: Update },
  { id: "backup", title: "Backup & Restore", component: BackupAndRestore },
];
