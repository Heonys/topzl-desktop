import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import { downloadedMusicAtom } from "@/atom";
import { PlayListTable } from "@/components";
import StaticIcon from "@/icons/StaticIcon";
import { useAppConfig, useLanguageFont } from "@/hooks";
import { clearDBKey } from "@/core/indexedDB";

export const DownloadPage = () => {
  const [downloadedList, setDownloadedList] = useAtom(downloadedMusicAtom);
  const { appConfig } = useAppConfig();
  const { fontClass } = useLanguageFont();
  const { t } = useTranslation();

  return (
    <section>
      <h1 className={twMerge("text-2xl font-bold", fontClass)}>{t("download.page_name")}</h1>
      <div className="mt-8 flex w-full gap-2">
        <button
          tabIndex={-1}
          className="flex items-center gap-2 rounded-lg bg-[#E0E0E0] p-2 px-4 font-sans text-sm font-semibold opacity-85 hover:opacity-100"
          onClick={() => {
            const context = window.common.getGlobalContext();
            window.fs.openFolder(appConfig.download?.path ?? context.appPath.downloads);
          }}
        >
          <StaticIcon iconName="forder-open" />
          {t("download.open_folder_btn")}
        </button>
        <button
          tabIndex={-1}
          className="flex items-center gap-2 rounded-lg bg-[#E0E0E0] p-2 px-4 font-sans text-sm font-semibold opacity-85 hover:opacity-100"
          onClick={() => clearDBKey("downloadedList")}
        >
          <StaticIcon iconName="trash" />
          {t("download.history_clear_btn")}
        </button>
      </div>

      <div className="relative my-4 w-full">
        <PlayListTable
          playlist={downloadedList}
          setPlaylist={setDownloadedList}
          maxheight="63vh"
          draggable
        />
      </div>
    </section>
  );
};
