import { PropsWithChildren } from "react";

type Props = {
  onClick?: () => void;
} & PropsWithChildren;

export const Kbd = ({ children, onClick }: Props) => {
  return (
    <div
      className="rounded-[4px] border-[0.8px] border-b-2 border-b-[color(srgb_0.093811_0.0938339_0.105878/_0.2)] bg-[oklch(98%_0_0)] px-2 py-0.5 font-sans text-xs font-semibold text-[oklch(0.21_0.006_285.885)]"
      onClick={onClick}
    >
      {children}
    </div>
  );
};
