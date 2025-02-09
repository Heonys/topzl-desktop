import { PropsWithChildren, forwardRef } from "react";
import { useModal } from "./useModal";
import StaticIcon from "@/icons/StaticIcon";
import { twMerge } from "tailwind-merge";

type BackdropProps = {
  onClose?: () => void;
  disabled?: boolean;
} & PropsWithChildren;

const Backdrop = forwardRef<HTMLDivElement, BackdropProps>(
  ({ onClose, disabled, children }: BackdropProps, ref) => {
    const { hideModal } = useModal();

    const handleClick = () => {
      if (!disabled) {
        if (onClose) onClose();
        else hideModal();
      }
    };

    return (
      <div
        ref={ref}
        className={twMerge("fixed inset-0 z-50 flex items-center justify-center bg-black/60")}
        onClick={handleClick}
      >
        {children}
      </div>
    );
  },
);
Backdrop.displayName = "backdrop";
export default Backdrop;

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
