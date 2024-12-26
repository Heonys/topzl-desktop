import { PropsWithChildren } from "react";
import { useModal } from "./useModal";
import StaticIcon from "@/icons/StaticIcon";

export const Backdrop = ({ children }: PropsWithChildren) => {
  const { hideModal } = useModal();
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={hideModal}
    >
      {children}
    </div>
  );
};

export const Header = ({ children }: PropsWithChildren) => {
  const { hideModal } = useModal();
  return (
    <header className="box-border flex h-12 w-full items-center border-b px-4">
      <div className="flex-1">{children}</div>
      <div className="cursor-pointer opacity-70 hover:opacity-100" onClick={hideModal}>
        <StaticIcon iconName="x-mark" size={20} />
      </div>
    </header>
  );
};
