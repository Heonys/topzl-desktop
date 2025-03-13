import { Switch } from "@headlessui/react";
import { useAppConfig } from "@/hooks";
import StaticIcon, { IconNames } from "@/icons/StaticIcon";
import { AppConfigKeyPath, AppConfigKeyPathValue, defaultAppConfig } from "@shared/config/type";
import { Condition, Kbd } from "@/common";

type Props<T extends AppConfigKeyPath> = {
  keyPath: T;
  label: string;
  description: string;
  iconName: IconNames;
  value?: AppConfigKeyPathValue<T>;
  kbd?: string[];
};

export const SwitchOption = <T extends AppConfigKeyPath>({
  keyPath,
  label,
  description,
  iconName,
  value = defaultAppConfig[keyPath] as AppConfigKeyPathValue<T>,
  kbd = [],
}: Props<T>) => {
  const { setAppConfig } = useAppConfig();
  return (
    <div className="my-2 flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <StaticIcon iconName={iconName} size={17} />
          <div className="flex items-center gap-3 text-sm font-bold text-black">
            {label}
            <Condition condition={kbd}>
              <div className="flex items-center gap-1.5">
                {kbd.map((key, index) => (
                  <span key={index} className="flex items-center gap-1">
                    <Kbd>{key}</Kbd>
                    {index < kbd.length - 1 && <span>+</span>}
                  </span>
                ))}
              </div>
            </Condition>
          </div>
        </div>
        <div className="whitespace-pre text-sm text-black/50">{description}</div>
      </div>

      <Switch
        checked={!!value}
        onChange={(value) => {
          setAppConfig({ keyPath, value });
        }}
        className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-500"
      >
        <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
      </Switch>
    </div>
  );
};
