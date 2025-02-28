import { ComponentPropsWithoutRef } from "react";
import { Button } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import StaticIcon, { IconNames } from "@/icons/StaticIcon";

type Props = {
  label: string;
  description: string;
  iconName: IconNames;
  buttons: ComponentPropsWithoutRef<"button">[];
};

export const ButtonsOption = ({ label, description, iconName, buttons }: Props) => {
  return (
    <div className="my-2 flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <StaticIcon iconName={iconName} size={17} />
          <div className="text-sm font-bold text-black">{label}</div>
        </div>
        <div className="whitespace-pre text-sm text-black/50">{description}</div>
      </div>

      <div className="flex items-center gap-2">
        {buttons.map(({ children, className, ...btnProps }, index) => (
          <Button
            key={index}
            className={twMerge(
              "rounded-lg bg-[#E0E0E0] p-2 px-4 text-xs font-bold opacity-85 hover:opacity-100",
              className,
            )}
            {...btnProps}
          >
            {children}
          </Button>
        ))}
      </div>
    </div>
  );
};
