import { atom } from "jotai";

export type ContextMenuItem =
  | {
      type: "menu";
      icon?: string;
      title?: string;
      onClick?: () => void;
    }
  | {
      type: "divider";
    };

export type ContextMenu = {
  musicInfo?: MusicItem;
  menuItems: ContextMenuItem[];
  x: number;
  y: number;
};

export const contextMenuAtom = atom<ContextMenu | null>(null);

export const musicDetailVisibleAtom = atom(false);

export const panelAtom = atom(false);
