import { PropsWithChildren } from "react";

export const Kbd = ({ children }: PropsWithChildren) => {
  return (
    <div className="inline-block rounded-md border border-black/20 p-px px-1.5 font-misans text-sm font-semibold shadow-xl">
      {children}
    </div>
  );
};
