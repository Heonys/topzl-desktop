import { twMerge } from "tailwind-merge";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { AppConfigKeyPath, AppConfigKeyPathValue, defaultAppConfig } from "@shared/config/type";
import StaticIcon, { IconNames } from "@/icons/StaticIcon";
import { useAppConfig } from "@/hooks";

type Props<T extends AppConfigKeyPath> = {
  keyPath: T;
  label: string;
  description: string;
  iconName: IconNames;
  options: AppConfigKeyPathValue<T>[];
  value?: AppConfigKeyPathValue<T>;
  width?: string;
  onChange?: (value: AppConfigKeyPathValue<T>) => void;
  convertToLabel?: (value: AppConfigKeyPathValue<T>) => string;
};

export const SelectOption = <T extends AppConfigKeyPath>({
  keyPath,
  label,
  description,
  iconName,
  options,
  value = defaultAppConfig[keyPath] as AppConfigKeyPathValue<T>,
  width,
  onChange,
  convertToLabel,
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
      <div className="rounded-lg text-black">
        <Listbox
          value={value}
          onChange={onChange ? onChange : (value) => setAppConfig({ keyPath, value })}
        >
          <ListboxButton
            style={{ width }}
            className={twMerge(
              "relative flex rounded-lg py-1.5 pl-3 pr-7 text-left text-sm/6 border-black/20 border items-center",
            )}
          >
            <div className="truncate font-sans text-xs font-semibold">
              {convertToLabel ? convertToLabel(value) : String(value)}
            </div>
            <StaticIcon
              iconName="chevron-down"
              className="group pointer-events-none absolute right-1 top-1.5 size-4 fill-black"
            />
          </ListboxButton>
          <ListboxOptions
            anchor="bottom"
            transition
            className={twMerge(
              "w-[var(--button-width)] rounded-xl border border-black/10 bg-white p-1",
              "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0",
            )}
          >
            {options.map((option, index) => (
              <ListboxOption
                key={index}
                value={option}
                className="group flex cursor-pointer select-none items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-black/5"
              >
                <StaticIcon
                  iconName="check"
                  className="invisible size-4 fill-white group-data-[selected]:visible"
                />
                <div className="truncate font-sans text-xs/6 font-semibold">
                  {convertToLabel ? convertToLabel(option) : String(option)}
                </div>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      </div>
    </div>
  );
};
