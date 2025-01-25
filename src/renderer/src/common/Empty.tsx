import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  message: string;
} & ComponentProps<"div">;

export const Empty = ({ message, className }: Props) => {
  return (
    <div
      className={twMerge(
        "absolute left-1/2 top-1/2 flex -translate-x-1/2  -translate-y-1/2 font-sans font-semibold",
        className,
      )}
    >
      {message}
    </div>
  );
};
