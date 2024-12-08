import { globalShortcut } from "electron";
import { shortcutKeys, type ShortcutKeys } from "@shared/config/type";
import { getAppConfigPath } from "@shared/config/main";
import { ipcMainSendMainWindow } from "@/ipc/main";

export async function setupGlobalShortcut() {
  await registerGlobalShortcut();
}

async function registerGlobalShortcut() {
  for (const key of shortcutKeys) {
    const shortcut = await getAppConfigPath(`shortcut.keymap.${key}.global`);
    registerShortcut(key, shortcut);
  }
}

function registerShortcut(key: ShortcutKeys, shortcut: string[] | null) {
  if (shortcut && shortcut.length > 0) {
    globalShortcut.register(shortcut.join("+"), () => {
      ipcMainSendMainWindow("navigate", `evt://${key}`);
      /*
        해당 하는 global shortcut에 대해서 렌더러 프로세스에게 프로토콜 기반의 메시지를 전달한다
        렌더러 프로세스는 URL 스킴으로 이를 요청하고 마찬가지로 해당하는 스킴을 받아서 처리할 수 있는 핸들러를 등록해야한다
      */
    });
  }
}
