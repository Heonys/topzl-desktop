import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  message: string;
} & ComponentProps<"div">;

export const Empty = ({ message, className }: Props) => {
  return (
    <div
      className={twMerge(
        "flex min-h-[280px] w-full items-center justify-center font-sans font-medium",
        className,
      )}
    >
      {message}
    </div>
  );
};
