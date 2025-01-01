import { FormEvent, useEffect, useRef } from "react";
import { Backdrop, Contents, Header } from "./Layout";
import { useModal } from "./useModal";
import { useLibrary } from "@/hooks";

type FormType = {
  title: string;
  description: string;
};

const CreatePlayList = () => {
  const { hideModal } = useModal();
  const { createPlaylist } = useLibrary();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const { title, description } = Object.fromEntries(data.entries()) as FormType;
    createPlaylist(title.trim(), description);
    hideModal();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Backdrop>
      <div
        className="flex h-[30vh] w-[50vw] flex-col rounded-lg bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <Header>
          <div className="font-sans text-xl font-semibold">새 재생목록</div>
        </Header>
        <Contents>
          <form className="mx-3 flex h-full flex-col" onSubmit={handleSubmit}>
            <div className="flex flex-1 flex-col gap-6">
              <input
                ref={inputRef}
                className="border-b-[3px] outline-none focus:border-blue-300"
                name="title"
                placeholder="제목"
                type="text"
                required
              />
              <input
                className="border-b-[3px] outline-none focus:border-blue-300"
                name="description"
                placeholder="설명"
                type="text"
              />
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
