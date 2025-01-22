import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import routers from "@/components/Setting/router";

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
    <section className="flex size-full flex-col gap-2 font-sans font-bold">
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
            <div id={`setting-${id}`} key={id} className="mx-auto flex max-w-[750px] flex-col">
              <h1 className="text-xl font-bold text-black">{title}</h1>
              <Component />
              <div className="my-2 h-[2px] w-full bg-black/5"></div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
