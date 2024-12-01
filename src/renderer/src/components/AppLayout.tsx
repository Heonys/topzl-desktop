import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

export const RootLayout = ({ className, children, ...props }: ComponentPropsWithoutRef<"main">) => {
  return (
    <main className={twMerge("flex h-screen", className)} {...props}>
      {children}
    </main>
  );
};
