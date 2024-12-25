import { lyricAtom } from "@/atom";
import { useAtomValue } from "jotai";

export const Lyric = () => {
  const lyricState = useAtomValue(lyricAtom);

  return (
    <div className="flex h-[70%] w-2/5 flex-col gap-1" onClick={(e) => e.stopPropagation()}>
      <div className="py-2 text-center text-xl text-white/40 underline">가사 찾기</div>
      <div className="size-full overflow-auto bg-transparent text-white/40 scrollbar-hide ">
        {lyricState.state === "hasData" && (
          <pre className="size-full flex-1 text-center align-middle font-barlow font-normal">
            {lyricState.data}
          </pre>
        )}
      </div>
    </div>
  );
};
