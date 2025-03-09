import { getDefaultStore } from "jotai";
import hotkeys from "hotkeys-js";
import { shortcutKeys, type ShortcutKeys } from "@shared/config/type";
import { appConfigAtom } from "@/atom";
import { localEventEmitter } from "@shared/plugin/eventEmitter";

const bindKeymap = new Map<string, string[]>();
const trackedShortcuts = new Map<string, (event: KeyboardEvent) => void>();
const store = getDefaultStore();

export function setupHotkeyFilter() {
  const originalFilter = hotkeys.filter;
  hotkeys.filter = (event) => {
    const tagName = (event.target as HTMLElement).tagName;
    const isHotkeyFilter = tagName === "INPUT" || tagName == "SELECT" || tagName === "TEXTAREA";
    if (isHotkeyFilter && (event.key === "ArrowUp" || event.key === "ArrowDown")) {
      return true;
    }
    return originalFilter(event);
  };
}

// 사용자 설정에 따른 초기 로컬 단축키 설정
export function setupLocalShortcut() {
  const appConfig = store.get(appConfigAtom);
  const keymap = appConfig.shortcut?.keymap;
  if (!keymap) return;

  shortcutKeys.forEach((it) => {
    const handler = bindShortcutHandler.bind(null, it, false);
    trackedShortcuts.set(it, handler);
  });

  shortcutKeys.forEach((it) => {
    if (keymap[it] && keymap[it].local.length) {
      bindShortcut(it, keymap[it].local);
    }
  });
}

// 해당 하는 이벤트 키와 대응하는 이벤트 핸들러 등록
function bindShortcutHandler(keyType: ShortcutKeys, global: boolean, event: KeyboardEvent) {
  event.preventDefault();
  const appConfig = store.get(appConfigAtom);
  const enableLocal = appConfig.shortcut?.enableLocal ?? true;

  if (!global && enableLocal) {
    localEventEmitter.emit(keyType);
  }
}

// 실질적인 숏컷을 등록하는 단계
export function bindShortcut(keyType: ShortcutKeys, keymap: string[], global = false) {
  unbindShortcut(keyType, global);

  if (global) {
    // 메인 프로세스에서 등록
  } else {
    hotkeys(keymap.join("+"), "all", trackedShortcuts.get(keyType)!);
  }
  bindKeymap.set(keyType, keymap);
}

export function unbindShortcut(keyType: ShortcutKeys, global = false) {
  const keymap = bindKeymap.get(keyType);
  if (keymap) {
    if (global) {
      // 메인 프로세스에서 해제
    } else {
      hotkeys.unbind(keymap.join("+"), "all", trackedShortcuts.get(keyType)!);
    }
  }
}

/*

초기에 config 설정에있는 값을 동기화하고
이후에 config가 바뀌면 -> table-input의 onchagne에서 수정되면
궁극적으로 다시 bindShortcut의 global 분기에서 처리됨

*/

// 여기선 메인에서 숏컷을 감지할때 이벤트를 보내주고 그걸 받는 리스너를 등록
export function setupGlobalShortcut() {
  window.shortcut.onGlobal((keyType) => {
    console.log(keyType);
  });
}
