import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

export const ExternalLink = (props: ComponentPropsWithoutRef<"a">) => {
  return (
    <a
      {...props}
      href={"javascript:void(0);"}
      className={twMerge("text-blue-500 underline", props.className)}
      onClick={(...args) => {
        if (props.href) window.open(props.href);
        props?.onClick?.(...args);
      }}
    ></a>
  );
};
