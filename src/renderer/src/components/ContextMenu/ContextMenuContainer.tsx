import { useEffect, useRef } from "react";
import { useContextMenu } from "@/hooks";

const MENU_ITEM_WIDTH = 240;
const MENU_ITEM_HEIGHT = 32;
const MENU_CONTAINER_MAX_HEIGHT = MENU_ITEM_HEIGHT * 5;
const OFFSET = 5;

export function ContextMenuContainer() {
  const { contextMenu, hideContextMenu } = useContextMenu();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickHandler = () => {
      if (contextMenu) hideContextMenu();
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextMenu]);

  if (!contextMenu) return null;
  const [computedX, computedY] = computedPosition(contextMenu.x, contextMenu.y);

  return (
    <div
      className="fixed z-[9999] rounded-md bg-white py-2 shadow-xl"
      ref={containerRef}
      style={{
        top: computedY,
        left: computedX,
        width: MENU_ITEM_WIDTH,
        height: MENU_CONTAINER_MAX_HEIGHT,
      }}
    >
      {contextMenu.menuItems.map((item) => {
        return (
          <div key={item.title} className="box-border flex w-full items-center gap-2">
            <div>{item?.icon}</div>
            <div className="truncate">{item.title}</div>
          </div>
        );
      })}
    </div>
  );
}

function computedPosition(x: number, y: number) {
  const isLeft = x < window.innerWidth / 2 ? 0 : 1;
  const isTop = y < window.innerHeight / 2 ? 0 : 2;
  switch (isLeft + isTop) {
    case 0: // 2사분면
      return [x + OFFSET, y + OFFSET];
    case 1: // 1사분면
      return [x - MENU_ITEM_WIDTH - OFFSET, y + OFFSET];
    case 2: // 3사분면
      return [x + OFFSET, y - MENU_CONTAINER_MAX_HEIGHT - OFFSET];
    case 3: // 4사분면
      return [x - MENU_ITEM_WIDTH - OFFSET, y - MENU_CONTAINER_MAX_HEIGHT - OFFSET];
    default:
      return [x + OFFSET, y + OFFSET];
  }
}
