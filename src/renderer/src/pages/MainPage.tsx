import { QuickRecommend, RecentPlayList, BestPopularCard } from "@/components/recommed";

export const MainPage = () => {
  return (
    <section
      className="relative flex size-full max-h-[calc(100%-8rem)] flex-col gap-4 overflow-auto scrollbar-hide"
      tabIndex={-1}
    >
      <div className="grid grid-cols-2 gap-3">
        <BestPopularCard />
        <RecentPlayList />
      </div>
      <QuickRecommend />
    </section>
  );
};
