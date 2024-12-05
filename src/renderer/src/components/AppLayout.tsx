import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

export const RootLayout = ({ className, children, ...props }: ComponentPropsWithoutRef<"main">) => {
  return (
    <main className={twMerge("flex h-screen", className)} {...props}>
      {children}
    </main>
  );
};

export const SideBar = ({ className, children, ...props }: ComponentPropsWithoutRef<"aside">) => {
  <aside className={twMerge(className)} {...props}>
    {children}
  </aside>;
};
