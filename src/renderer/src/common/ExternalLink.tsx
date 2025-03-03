import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

export const ExternalLink = (props: ComponentPropsWithoutRef<"a">) => {
  return (
    <a
      {...props}
      className={twMerge("text-blue-500 underline", props.className)}
      onClick={(event) => {
        event.preventDefault();
        if (props.href) window.open(props.href);
        props?.onClick?.(event);
      }}
    ></a>
  );
};
