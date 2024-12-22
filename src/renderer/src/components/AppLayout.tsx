import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

export const RootLayout = ({ className, children, ...props }: ComponentPropsWithoutRef<"main">) => {
  return (
    <main className={twMerge("flex flex-col w-screen h-screen relative", className)} {...props}>
      {children}
    </main>
  );
};

export const MainLayout = ({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"section">) => {
  return (
    <section className={twMerge("flex w-full h-full", className)} {...props}>
      {children}
    </section>
  );
};
