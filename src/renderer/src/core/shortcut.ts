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

function bindShortcutHandler(keyType: ShortcutKeys, global: boolean, event: KeyboardEvent) {
  event.preventDefault();
  const appConfig = store.get(appConfigAtom);
  const enableLocal = appConfig.shortcut?.enableLocal ?? true;

  if (!global && enableLocal) {
    localEventEmitter.emit(keyType);
  }
}

export function bindShortcut(keyType: ShortcutKeys, keymap: string[], global = false) {
  unbindShortcut(keyType, global);

  if (global) {
    window.shortcut.registerGlobal({ keyType, keymap });
  } else {
    hotkeys(keymap.join("+"), "all", trackedShortcuts.get(keyType)!);
  }
  bindKeymap.set(keyType, keymap);
}

export function unbindShortcut(keyType: ShortcutKeys, global = false) {
  const keymap = bindKeymap.get(keyType);
  if (keymap) {
    if (global) {
      window.shortcut.unregisterGlobal({ keyType });
    } else {
      hotkeys.unbind(keymap.join("+"), "all", trackedShortcuts.get(keyType)!);
    }
  }
}

export function setupGlobalShortcut() {
  window.shortcut.onGlobal((keyType) => {
    localEventEmitter.emit(keyType);
  });
}
