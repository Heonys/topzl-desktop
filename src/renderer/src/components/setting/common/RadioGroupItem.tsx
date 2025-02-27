import { useAppConfig } from "@/hooks";
import StaticIcon, { IconNames } from "@/icons/StaticIcon";
import { cn } from "@/utils";
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import { AppConfigKeyPath, AppConfigKeyPathValue, defaultAppConfig } from "@shared/config/type";
import { twMerge } from "tailwind-merge";

type Props<T extends AppConfigKeyPath> = {
  keyPath: T;
  label: string;
  description: string;
  iconName: IconNames;
  options: {
    title?: string;
    value: AppConfigKeyPathValue<T>;
  }[];
  value?: AppConfigKeyPathValue<T>;
  direction?: "horizonal" | "vertical";
};

export const RadioGroupItem = <T extends AppConfigKeyPath>({
  keyPath,
  label,
  description,
  iconName,
  options,
  value = defaultAppConfig[keyPath] as AppConfigKeyPathValue<T>,
  direction = "horizonal",
}: Props<T>) => {
  const { setAppConfig } = useAppConfig();

  return (
    <div className="my-2 flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <StaticIcon iconName={iconName} size={17} />
          <div className="text-sm font-bold text-black">{label}</div>
        </div>
        <div className="whitespace-pre text-sm text-black/50">{description}</div>
      </div>

      <RadioGroup
        className={cn("flex gap-2", direction === "horizonal" ? "flex-row" : "flex-col")}
        value={value}
        onChange={(value) => {
          setAppConfig({ keyPath, value });
        }}
      >
        {options.map((action, index) => {
          return (
            <Field key={index} className="flex items-center gap-2">
              <Radio
                value={action.value}
                className={twMerge(
                  "group flex size-4 items-center border-black/20 justify-center rounded-full border bg-white",
                  "data-[checked]:bg-blue-400 data-[checked]:border-white",
                )}
              >
                <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
              </Radio>
              <Label className="text-sm font-semibold">
                {action.title ?? String(action.value)}
              </Label>
            </Field>
          );
        })}
      </RadioGroup>
    </div>
  );
};
