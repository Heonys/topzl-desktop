import { FormEvent, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { useLibrary } from "@/hooks";
import Backdrop, { Contents, Header } from "./Layout";
import { useModal } from "./useModal";

type Props = {
  title: string;
  callback: (...args: any[]) => void;
};

const RenamePlaylist = ({ title, callback }: Props) => {
  const { hideModal } = useModal();
  const { renamePlaylist } = useLibrary();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    renamePlaylist(title, inputRef.current?.value || title);
    callback(inputRef.current?.value || title);
    hideModal();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Backdrop ref={containerRef}>
      <motion.div
        drag
        dragConstraints={containerRef}
        dragElastic={0}
        dragMomentum={false}
        className="flex h-[30vh] w-[50vw] flex-col rounded-lg bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <Header>
          <div className="font-sans text-xl font-semibold">
            {t("playlist.rename_playlist_title")}
          </div>
        </Header>
        <Contents>
          <form className="mx-3 flex h-full flex-col" onSubmit={handleSubmit}>
            <div className="flex flex-1 flex-col gap-6 font-sans font-bold">
              <label className="w-full space-y-1">
                <div className="flex text-sm text-black/50">
                  {t("playlist.new_playlist_title")}
                  <span className="self-end text-red-400">*</span>
                </div>
                <input
                  ref={inputRef}
                  className="w-full border-b-[3px] p-1 px-2 outline-none focus:border-blue-300"
                  name="title"
                  type="text"
                  defaultValue={title}
                  spellCheck={false}
                  required
                />
              </label>
            </div>
            <div className="flex justify-end">
              <button className="rounded-lg bg-[#E0E0E0] p-2 px-4 font-sans text-sm font-semibold">
                {t("common.confirm_btn")}
              </button>
            </div>
          </form>
        </Contents>
      </motion.div>
    </Backdrop>
  );
};

export default RenamePlaylist;
