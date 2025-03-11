import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import { PlayListTable } from "@/components";
import { useModal } from "@/components/modal/useModal";
import { useDirectoryManager, useLanguageFont } from "@/hooks";
import StaticIcon from "@/icons/StaticIcon";

export const LocalPage = () => {
  const { localMusic, setLocalMusic } = useDirectoryManager();
  const { showModal } = useModal();
  const { fontClass } = useLanguageFont();
  const { t } = useTranslation();

  return (
    <section>
      <h1 className={twMerge("text-2xl font-bold", fontClass)}>
        {t("local_management.page_name")}
      </h1>
      <div className="mt-8 flex w-full justify-between">
        <button
          tabIndex={-1}
          className="flex items-center gap-2 rounded-lg bg-[#E0E0E0] p-2 px-4 font-sans text-sm font-semibold opacity-85 hover:opacity-100"
          onClick={() => showModal("ScanLocalMusic")}
        >
          <StaticIcon iconName="forder-open" />
          {t("local_management.file_auto_scan_btn")}
        </button>
        {/* <div className="flex items-center gap-1 rounded-md bg-black/10 px-2">
          <StaticIcon iconName="search" size={18} className="opacity-70" />
          <input
            className="w-48 rounded-md bg-transparent px-2 outline-none"
            type="text"
            placeholder="search local music"
          />
        </div> */}
      </div>

      <div className="relative my-4 w-full">
        <PlayListTable
          playlist={localMusic}
          setPlaylist={setLocalMusic}
          maxheight="63vh"
          draggable
        />
      </div>
    </section>
  );
};
