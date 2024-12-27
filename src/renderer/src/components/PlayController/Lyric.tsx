import { useAtomValue } from "jotai";
import { lyricAtomLodable } from "@/atom";
import { Loading } from "@/common/Loading";

export const Lyric = () => {
  const lyricState = useAtomValue(lyricAtomLodable);

  return (
    <div className="flex h-[65%] w-2/5 flex-col gap-1">
      {lyricState.state === "loading" && (
        <div className="flex size-full items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <p className="font-dh text-xl text-gray-300">가사를 찾고 있습니다</p>
            <Loading />
          </div>
        </div>
      )}
      {lyricState.state === "hasData" && (
        <div className="size-full overflow-auto bg-transparent text-white/40 scrollbar-hide">
          <pre className="size-full flex-1 text-center align-middle font-barlow font-normal">
            {lyricState.data}
          </pre>
        </div>
      )}
    </div>
  );
};
