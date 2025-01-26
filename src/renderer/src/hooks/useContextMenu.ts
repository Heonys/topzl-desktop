import { useAtom } from "jotai";
import { contextMenuAtom, ContextMenu } from "@/atom";

export const useContextMenu = () => {
  const [contextMenu, setContextMenu] = useAtom(contextMenuAtom);

  const showContextMenu = (ctxMenu: ContextMenu) => {
    setContextMenu(ctxMenu);
  };

  const hideContextMenu = () => {
    setContextMenu(null);
  };

  return { showContextMenu, hideContextMenu, contextMenu };
};
