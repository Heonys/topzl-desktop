import { useEffect } from "react";
import { useContextMenu } from "@/hooks";
import StaticIcon, { IconNames } from "@/icons/StaticIcon";

const MENU_ITEM_WIDTH = 220;
const MENU_ITEM_HEIGHT = 36;
const MENU_PADDING_HEIGHT = 70;
const OFFSET = 5;

export function ContextMenuContainer() {
  const { contextMenu, hideContextMenu } = useContextMenu();

  useEffect(() => {
    const clickHandler = () => {
      if (contextMenu) hideContextMenu();
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextMenu]);

  if (!contextMenu) return null;
  const itemCount = contextMenu.menuItems.reduce(
    (acc, cur) => (cur.type === "divider" ? acc : acc + 1),
    0,
  );
  const [computedX, computedY] = computedPosition(contextMenu.x, contextMenu.y, itemCount);

  return (
    <div
      className="fixed z-[9999] flex flex-col rounded-lg bg-white p-2 shadow-2xl"
      style={{
        top: computedY,
        left: computedX,
        width: MENU_ITEM_WIDTH,
        height: itemCount * MENU_ITEM_HEIGHT + MENU_PADDING_HEIGHT,
      }}
    >
      {contextMenu.musicInfo && (
        <div>
          <div className="box-border flex items-center gap-3 p-2">
            <img
              className="size-10 rounded-md object-cover"
              src={contextMenu.musicInfo.artwork}
              alt="contextmenu image"
            />
            <div className="flex max-w-36 flex-col">
              <div className="truncate text-sm">{contextMenu.musicInfo.title}</div>
              <div className=" truncate text-xs text-black/50">{contextMenu.musicInfo.artist}</div>
            </div>
          </div>
          <div className="m-1 h-px bg-black/10"></div>
        </div>
      )}
      {contextMenu.menuItems.map((item, index) => {
        return item.type === "menu" ? (
          <div
            key={index}
            className="box-border flex w-full cursor-pointer items-center gap-2 rounded-lg p-1.5 hover:bg-black/10"
            onClick={item.onClick}
          >
            {item.icon && <StaticIcon iconName={item.icon as IconNames} size={18} />}
            <div className="truncate font-sans text-sm font-medium">{item.title}</div>
          </div>
        ) : (
          <div key={index} className="m-1 h-px bg-black/10"></div>
        );
      })}
    </div>
  );
}

function computedPosition(x: number, y: number, count: number) {
  const MENU_CONTAINER_MAX_HEIGHT = count * MENU_ITEM_HEIGHT + MENU_PADDING_HEIGHT;
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
