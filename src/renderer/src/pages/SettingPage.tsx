import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

function Component() {
  return <div className="h-96 w-full"></div>;
}

const routers = [
  { id: "general", title: "General", component: Component },
  { id: "shortcut", title: "Shortcut", component: Component },
  { id: "playback", title: "Playback", component: Component },
  { id: "lyric", title: "Lyric", component: Component },
  { id: "search", title: "Search", component: Component },
  { id: "download", title: "Download", component: Component },
  { id: "update", title: "Update", component: Component },
  { id: "network", title: "Network", component: Component },
  { id: "backup", title: "Backup & Restore", component: Component },
];

export const SettingPage = () => {
  const [selected, setSelected] = useState(routers[0].id);

  const contentsRef = useRef<HTMLDivElement>(null);
  const intersectoinObserverRef = useRef<IntersectionObserver>();
  const intersectionRatioRef = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const ratioMap = intersectionRatioRef.current;

    intersectoinObserverRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratioMap.set(entry.target.id, entry.intersectionRatio);
        });
        let maxRatio: number = 0;
        let maxId: string | undefined;
        for (const [id, ratio] of ratioMap.entries()) {
          if (ratio > maxRatio) {
            maxId = id;
            maxRatio = ratio;
          }
        }
        if (maxId) setSelected(maxId.replace("setting-", ""));
      },
      {
        root: contentsRef.current,
        threshold: [0, 0.2, 0.8, 1],
      },
    );

    for (const router of routers) {
      const target = document.getElementById(`setting-${router.id}`);
      if (target) {
        intersectoinObserverRef.current.observe(target);
      }
    }

    return () => {
      intersectoinObserverRef.current?.disconnect();
      intersectoinObserverRef.current = undefined;
      ratioMap.clear();
    };
  }, []);

  return (
    <div className="flex size-full flex-col gap-2 font-sans font-bold">
      <h1 className="text-2xl">설정</h1>
      <div className="relative mt-2 flex w-full items-start gap-4 pb-4 text-sm">
        {routers.map(({ title, id }) => {
          return (
            <div
              key={title}
              className={twMerge(
                "opacity-75 hover:opacity-100 border-b-4 py-1 cursor-pointer",
                selected === id && "border-black/80 opacity-100",
              )}
              onClick={() => {
                const element = document.getElementById(`setting-${id}`);
                if (element && contentsRef.current) {
                  const containerTop = contentsRef.current.offsetTop;
                  const elementTop = element.offsetTop;
                  const scrollOffset = elementTop - containerTop;
                  contentsRef.current.scrollTo({ top: scrollOffset, behavior: "smooth" });
                }
              }}
            >
              <div>{title}</div>
            </div>
          );
        })}
      </div>
      <div className="h-[calc(100%-14.5rem)] overflow-auto" ref={contentsRef}>
        {routers.map((router) => {
          const { id, title } = router;
          const Component = router.component;
          return (
            <div id={`setting-${id}`} key={id} className="flex flex-col">
              <h1 className="text-lg font-bold">{title}</h1>
              <Component />
            </div>
          );
        })}
      </div>
    </div>
  );
};
