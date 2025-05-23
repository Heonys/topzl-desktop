import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Condition } from "@/common";
import StaticIcon from "@/icons/StaticIcon";
import { useDirectoryManager } from "@/hooks";
import Backdrop, { Header, Contents } from "./Layout";
import { useModal } from "./useModal";
import { useTranslation } from "react-i18next";

const ScanLocalMusic = () => {
  const { paths, selectedPaths, addDir, removeDir, check, uncheck, syncWithWatcher } =
    useDirectoryManager();
  const { hideModal } = useModal();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const addForder = async () => {
    setIsOpenDialog(true);
    const result = await window.common.showOpenDialog({
      title: "폴더 추가",
      properties: ["openDirectory"],
    });
    setIsOpenDialog(false);
    if (!result.canceled) {
      const selected = result.filePaths[0];
      if (!paths.includes(selected)) {
        addDir(selected);
        check(selected);
      }
    }
  };

  const onClose = () => {
    syncWithWatcher();
    hideModal();
  };

  return (
    <Backdrop onClose={onClose} disabled={isOpenDialog} ref={containerRef}>
      <motion.div
        drag
        dragConstraints={containerRef}
        dragElastic={0}
        dragMomentum={false}
        className="flex h-[50vh] w-[50vw] flex-col rounded-lg bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <Header>
          <div className="font-sans text-xl font-semibold">
            {t("local_management.file_auto_scan_btn")}
          </div>
        </Header>
        <Contents>
          <div className="flex h-full flex-col gap-2 font-sans text-sm">
            <div className="flex gap-1 px-2">
              <div className="flex gap-2">
                <StaticIcon
                  iconName="forder-plus"
                  className="cursor-pointer"
                  size={20}
                  onClick={addForder}
                />
                <span className="cursor-pointer font-semibold" onClick={addForder}>
                  {t("local_management.add_folder_btn")}
                </span>
              </div>
              <div className="text-gray-500 ">
                {`(${t("local_management.add_folder_discription")})`}
              </div>
            </div>

            <div className="mt-2 flex-1 rounded-lg border border-black/10">
              <Condition condition={paths.length}>
                {paths.map((dir) => {
                  const isChecked = selectedPaths.includes(dir);
                  return (
                    <div key={dir} className="flex items-center gap-2 p-2">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          if (isChecked) uncheck(dir);
                          else check(dir);
                        }}
                      />
                      <div className="flex-1">{dir}</div>
                      <StaticIcon
                        className="cursor-pointer"
                        iconName="x-mark"
                        size={16}
                        onClick={() => removeDir(dir)}
                      />
                    </div>
                  );
                })}
              </Condition>
            </div>

            <div className="flex justify-end">
              <button
                className="rounded-lg bg-[#E0E0E0] p-2 px-4 font-sans text-sm font-semibold"
                onClick={onClose}
                disabled={isOpenDialog}
              >
                {t("common.confirm_btn")}
              </button>
            </div>
          </div>
        </Contents>
      </motion.div>
    </Backdrop>
  );
};

export default ScanLocalMusic;
