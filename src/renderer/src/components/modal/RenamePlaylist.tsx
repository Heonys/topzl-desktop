import { useLibrary } from "@/hooks";
import { Backdrop, Contents, Header } from "./Layout";
import { useModal } from "./useModal";
import { FormEvent, useRef } from "react";

type Props = {
  title: string;
  callback: (...args: any[]) => void;
};

const RenamePlaylist = ({ title, callback }: Props) => {
  const { hideModal } = useModal();
  const { renamePlaylist } = useLibrary();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    renamePlaylist(title, inputRef.current?.value || title);
    callback(inputRef.current?.value || title);
    hideModal();
  };

  return (
    <Backdrop>
      <div
        className="flex h-[30vh] w-[50vw] flex-col rounded-lg bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <Header>
          <div className="font-sans text-xl font-semibold">재생목록 이름 변경</div>
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
                defaultValue={title}
              />
            </div>
            <div className="flex justify-end">
              <button className="rounded-lg bg-[#E0E0E0] p-2 px-4 font-sans text-sm font-semibold">
                확인
              </button>
            </div>
          </form>
        </Contents>
      </div>
    </Backdrop>
  );
};

export default RenamePlaylist;
