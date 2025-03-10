import { useAtomValue } from "jotai";
import { lyricAtomLodable } from "@/atom";
import { LoadingSpinner } from "@/common";
import { useTranslation } from "react-i18next";

export const Lyric = () => {
  const lyricState = useAtomValue(lyricAtomLodable);
  const { t } = useTranslation();

  return (
    <div className="flex h-[65%] w-2/5 flex-col gap-1">
      {lyricState.state === "loading" && (
        <div className="flex size-full items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <p className="font-dh text-xl text-gray-300">{t("common.search_lyric_message")}</p>
            <LoadingSpinner classname="bg-gray-300" />
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
