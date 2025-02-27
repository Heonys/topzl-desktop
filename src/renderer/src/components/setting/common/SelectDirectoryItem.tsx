import { useAppConfig } from "@/hooks";
import StaticIcon, { IconNames } from "@/icons/StaticIcon";
import { AppConfigKeyPathValue } from "@shared/config/type";

type Props<T extends AppConfigKeyPath> = {
  keyPath: T;
  label: string;
  description: string;
  iconName: IconNames;
  value?: AppConfigKeyPathValue<T>;
};

export const SelectDirectoryItem = <T extends AppConfigKeyPath>({
  keyPath,
  label,
  description,
  iconName,
  value,
}: Props<T>) => {
  const { setAppConfig } = useAppConfig();
  const defaultPath = String(value);

  const handleSelectPath = async () => {
    const result = await window.common.showOpenDialog({
      defaultPath: defaultPath,
      properties: ["openDirectory"],
    });
    if (!result.canceled) {
      const selected = result.filePaths[0];
      setAppConfig({ keyPath, value: selected });
    }
  };

  return (
    <div className="my-2 flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <StaticIcon iconName={iconName} size={17} />
          <div className="text-sm font-bold text-black">{label}</div>
        </div>
        <div className="whitespace-pre text-sm text-black/50">{description}</div>
      </div>
      <div
        className="flex cursor-pointer items-center gap-2 rounded-md border border-black/15 p-2 px-3 text-xs"
        onClick={handleSelectPath}
      >
        <StaticIcon iconName="forder-open" size={17} />
        <div className="max-w-64 truncate" title={defaultPath}>
          {defaultPath}
        </div>
      </div>
    </div>
  );
};
