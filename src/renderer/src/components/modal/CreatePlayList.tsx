import { FormEvent, useEffect, useRef } from "react";
import { Backdrop, Contents, Header } from "./Layout";
import { useModal } from "./useModal";
import { useLibrary } from "@/hooks";

type FormType = { title: string; description: string };
type Props = {
  musicItems?: MusicItem[];
  overrideClose?: () => void;
} & Partial<FormType>;

const CreatePlayList = ({ title, description, musicItems, overrideClose }: Props) => {
  const { hideModal } = useModal();
  const { createPlaylist, setPlaylistByTitle } = useLibrary();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const { title, description } = Object.fromEntries(data.entries()) as FormType;
    createPlaylist(title.trim(), description);
    if (musicItems) {
      setPlaylistByTitle(title.trim(), musicItems);
    }
    if (overrideClose) {
      overrideClose();
    } else {
      hideModal();
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Backdrop>
      <div
        className="flex h-[38vh] w-[50vw] flex-col rounded-lg bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <Header>
          <div className="font-sans text-xl font-semibold">재생목록 추가</div>
        </Header>
        <Contents>
          <form className="mx-3 flex h-full flex-col" onSubmit={handleSubmit}>
            <div className="flex flex-1 flex-col gap-5 font-sans font-bold">
              <label className="w-full space-y-1">
                <div className="flex text-sm text-black/50">
                  재생목록 이름
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
              <label className="w-full space-y-1">
                <div className="text-sm text-black/50">재생목록 설명</div>
                <input
                  className="w-full border-b-[3px] p-1 px-2 outline-none focus:border-blue-300"
                  name="description"
                  defaultValue={description}
                  spellCheck={false}
                  type="text"
                />
              </label>
            </div>
            <div className="flex justify-end">
              <button className="rounded-lg bg-[#E0E0E0] p-2 px-4 font-sans text-sm font-semibold">
                생성
              </button>
            </div>
          </form>
        </Contents>
      </div>
    </Backdrop>
  );
};

export default CreatePlayList;
