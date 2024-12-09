import { globalShortcut } from "electron";
import { shortcutKeys, type ShortcutKeys } from "@shared/config/type";
import { getAppConfigPath, setAppConfigPath } from "@shared/config/main";
import { ipcMainSendMainWindow } from "@/ipc/main";

export async function setupGlobalShortcut() {
  await registerGlobalShortcut();
}

async function registerGlobalShortcut() {
  for (const key of shortcutKeys) {
    const shortcut = await getAppConfigPath(`shortcut.keymap.${key}.global`);
    registerShortcut(
      key,
      shortcut.filter((v) => v),
    );
  }
}

function registerShortcut(key: ShortcutKeys, shortcut: string[]) {
  try {
    if (shortcut.length > 0) {
      globalShortcut.register(shortcut.join("+"), () => {
        ipcMainSendMainWindow("global-shortcut-execute", key);
      });
    }
  } catch (error) {
    console.error(error);
  }
}

export async function unregisterShortcut(key: ShortcutKeys) {
  const shortcut = await getAppConfigPath(`shortcut.keymap.${key}.global`);
  if (shortcut.length > 0) {
    globalShortcut.unregister(shortcut.join("+"));
    setAppConfigPath(`shortcut.keymap.${key}.global`, []);
  }
}
