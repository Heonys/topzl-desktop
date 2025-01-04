import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import throttle from "lodash.throttle";

interface VirtualListProps<T> {
  getScrollElement: () => HTMLElement;
  estimizeItemHeight: number;
  data: T[];
  renderCount?: number;
  offsetHeight?: number | (() => number);
}

interface VirtualItem<T> {
  top: number;
  rowIndex: number;
  dataItem: T;
}

export const useVirtualScroll = <T>(props: VirtualListProps<T>) => {
  const { estimizeItemHeight, data, renderCount = 40, getScrollElement, offsetHeight = 0 } = props;
  const dataRef = useRef(data);
  dataRef.current = data;

  const [virtualItems, setVirtualItems] = useState<VirtualItem<T>[]>([]);
  const [totalHeight, setTotalHeight] = useState<number>(data.length * estimizeItemHeight);

  const scrollElementRef: MutableRefObject<HTMLElement | null> = useRef(null);

  const scrollHandler = useCallback(
    throttle(
      () => {
        const scrollTop =
          (scrollElementRef.current?.scrollTop ?? 0) -
          (typeof offsetHeight === "number" ? offsetHeight : offsetHeight());
        const realData = dataRef.current;
        const estimizeStartIndex = Math.floor(scrollTop / estimizeItemHeight);
        const startIndex = Math.max(estimizeStartIndex - (estimizeStartIndex % 2 === 1 ? 3 : 2), 0);

        setVirtualItems(
          realData.slice(startIndex, startIndex + renderCount).map((item, index) => ({
            rowIndex: startIndex + index,
            dataItem: item,
            top: (startIndex + index) * estimizeItemHeight,
          })),
        );
      },
      32,
      {
        trailing: true,
        leading: true,
      },
    ),
    [],
  );

  useEffect(() => {
    setTotalHeight(data.length * estimizeItemHeight);
    scrollHandler();
  }, [data]);

  useEffect(() => {
    if (!scrollElementRef.current) {
      scrollElementRef.current = getScrollElement();
    }
    if (scrollElementRef.current) {
      scrollElementRef.current.addEventListener("scroll", scrollHandler);
    }

    return () => {
      scrollElementRef.current?.removeEventListener?.("scroll", scrollHandler);
      scrollElementRef.current = null;
    };
  }, []);

  return {
    virtualItems,
    totalHeight,
    startTop: virtualItems[0]?.top ?? 0,
  };
};
