import { QuickRecommend, RecentPlayList } from "@/components/Recommed";

export const DiscoverPage = () => {
  return (
    <section className="flex size-full max-h-[calc(100%-8rem)] flex-col gap-4 overflow-auto scrollbar-hide">
      <RecentPlayList />
      <QuickRecommend />
    </section>
  );
};
