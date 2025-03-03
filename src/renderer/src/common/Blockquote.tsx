import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Blockquote = ({ children }: Props) => {
  return (
    <blockquote className="border-l-[5px] border-[#c2d0ff] bg-gray-50 p-4 text-sm font-semibold italic text-gray-700">
      {children}
    </blockquote>
  );
};
