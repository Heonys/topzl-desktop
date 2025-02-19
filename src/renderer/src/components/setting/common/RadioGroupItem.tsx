import StaticIcon, { IconNames } from "@/icons/StaticIcon";
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
  onChange: (payload: AppConfigKeyPathValue<T>) => void;
};

export const RadioGroupItem = <T extends AppConfigKeyPath>({
  keyPath,
  label,
  description,
  iconName,
  options,
  value = defaultAppConfig[keyPath] as AppConfigKeyPathValue<T>,
  onChange,
}: Props<T>) => {
  return (
    <div className="my-2 flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <StaticIcon iconName={iconName} size={17} />
          <div className="text-sm font-bold text-black">{label}</div>
        </div>
        <div className="text-sm text-black/50">{description}</div>
      </div>

      <RadioGroup value={value} onChange={onChange} className="flex gap-2">
        {options.map((action) => {
          return (
            <Field key={action.title} className="flex items-center gap-2">
              <Radio
                value={action.value}
                className={twMerge(
                  "group flex size-4 items-center border-black/20 justify-center rounded-full border bg-white",
                  "data-[checked]:bg-blue-400 data-[checked]:border-white",
                )}
              >
                <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
              </Radio>
              <Label className="text-sm font-medium">{action.title ?? String(action.value)}</Label>
            </Field>
          );
        })}
      </RadioGroup>
    </div>
  );
};
