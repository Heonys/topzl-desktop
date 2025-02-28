import { twMerge } from "tailwind-merge";
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import { AppConfigKeyPath, AppConfigKeyPathValue, defaultAppConfig } from "@shared/config/type";
import { useAppConfig } from "@/hooks";
import StaticIcon, { IconNames } from "@/icons/StaticIcon";

type Props<T extends AppConfigKeyPath> = {
  keyPath: T;
  label: string;
  description: string;
  iconName: IconNames;
  options: {
    image: string;
    title: AppConfigKeyPathValue<T>;
  }[];
  value?: AppConfigKeyPathValue<T>;
};

export const ImageRadioGroupOption = <T extends AppConfigKeyPath>({
  keyPath,
  label,
  description,
  iconName,
  options,
  value = defaultAppConfig[keyPath] as AppConfigKeyPathValue<T>,
}: Props<T>) => {
  const { setAppConfig } = useAppConfig();

  return (
    <div className="my-1 flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <StaticIcon iconName={iconName} size={17} />
          <div className="text-sm font-bold text-black">{label}</div>
        </div>
        <div className="text-sm text-black/50">{description}</div>
      </div>
      <RadioGroup
        value={value}
        onChange={(value) => {
          setAppConfig({ keyPath, value });
        }}
        className="mt-2 flex gap-2"
      >
        {options.map(({ title, image }) => {
          const isSelected = value === title;
          return (
            <Field
              key={String(title)}
              className={twMerge(
                "box-border border-2 border-transparent rounded-xl",
                isSelected ? "border-blue-300" : "",
              )}
            >
              <Label className="cursor-pointer">
                <div className="flex flex-col items-center rounded-xl shadow-xl">
                  <img
                    className="w-36 rounded-t-xl object-cover"
                    src={image}
                    alt="light"
                    draggable={false}
                  />
                  <div className="flex items-center gap-2 p-1.5">
                    <Radio
                      value={title}
                      className={twMerge(
                        "group flex size-4 items-center border-black/20 justify-center rounded-full border bg-white",
                        "data-[checked]:bg-blue-400 data-[checked]:border-white",
                      )}
                    >
                      <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
                    </Radio>
                    <div className="text-xs">{String(title)}</div>
                  </div>
                </div>
              </Label>
            </Field>
          );
        })}
      </RadioGroup>
    </div>
  );
};
