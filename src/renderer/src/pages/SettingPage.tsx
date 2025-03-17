import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import routers from "@/components/setting/router";
import { Condition } from "@/common";
import { useTranslation } from "react-i18next";
import { useLanguageFont } from "@/hooks";

export const SettingPage = () => {
  const [selected, setSelected] = useState(routers[0].id);
  const contentsRef = useRef<HTMLDivElement>(null);
  const intersectionObserverRef = useRef<IntersectionObserver>();
  const intersectionRatioRef = useRef<Map<string, number>>(new Map());
  const { fontClass } = useLanguageFont();

  const { t } = useTranslation();

  useEffect(() => {
    const ratioMap = intersectionRatioRef.current;

    intersectionObserverRef.current = new IntersectionObserver(
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
        threshold: [0, 0.25, 0.75, 1],
      },
    );

    for (const router of routers) {
      const target = document.getElementById(`setting-${router.id}`);
      if (target) {
        intersectionObserverRef.current.observe(target);
      }
    }

    return () => {
      intersectionObserverRef.current?.disconnect();
      intersectionObserverRef.current = undefined;
      ratioMap.clear();
    };
  }, []);

  return (
    <section className={twMerge("flex size-full flex-col gap-2 font-bold", fontClass)}>
      <h1 className="text-2xl">{t("settings.page_name")}</h1>
      <div className="relative mt-2 flex w-full items-start gap-4 pb-4 text-sm">
        {routers.map(({ id }) => {
          return (
            <div
              key={id}
              className={twMerge(
                "opacity-75 hover:opacity-100 border-b-4 py-1 cursor-pointer",
                selected === id && "border-black/80 opacity-100",
              )}
              onClick={() => {
                const target = document.getElementById(`setting-${id}`);
                if (target && contentsRef.current) {
                  contentsRef.current.scrollTo({ top: target.offsetTop, behavior: "smooth" });
                }
              }}
            >
              <div>{t(`settings.section.${id}`)}</div>
            </div>
          );
        })}
      </div>
      <div className="relative h-[calc(100%-14.5rem)] overflow-auto" ref={contentsRef}>
        {routers.map((router, index) => {
          const { id } = router;
          const Component = router.component;
          return (
            <div id={`setting-${id}`} key={id} className="mx-auto flex max-w-[770px] flex-col">
              <h1 className="text-xl font-bold text-black">{t(`settings.section.${id}`)}</h1>
              <Component />
              <Condition condition={index !== routers.length - 1}>
                <div className="my-2 h-[2px] w-full bg-black/5"></div>
              </Condition>
            </div>
          );
        })}
      </div>
    </section>
  );
};
