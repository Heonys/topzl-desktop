import { PropsWithChildren } from "react";
import { useModal } from "./useModal";
import StaticIcon from "@/icons/StaticIcon";

type BackdropProps = {
  onClose?: () => void;
} & PropsWithChildren;

export const Backdrop = ({ onClose, children }: BackdropProps) => {
  const { hideModal } = useModal();
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose ?? hideModal}
    >
      {children}
    </div>
  );
};

export const Header = ({ children }: PropsWithChildren) => {
  const { hideModal } = useModal();
  return (
    <header className="box-border flex h-14 w-full items-center justify-center gap-4 border-b px-4">
      <div className="flex-1">{children}</div>
      <div className="cursor-pointer opacity-70 hover:opacity-100" onClick={hideModal}>
        <StaticIcon iconName="x-mark" size={20} />
      </div>
    </header>
  );
};

export const Contents = ({ children }: PropsWithChildren) => {
  return <div className="size-full flex-1 overflow-y-auto p-3">{children}</div>;
};
