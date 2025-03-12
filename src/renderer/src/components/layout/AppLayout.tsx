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
    <section className={twMerge("flex w-full h-full relative top-[3.5rem]", className)} {...props}>
      {children}
    </section>
  );
};

export const ContentsLayout = ({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div">) => {
  return (
    <div className={twMerge("px-5 pt-5 flex-1", className)} {...props} tabIndex={-1}>
      {children}
    </div>
  );
};
