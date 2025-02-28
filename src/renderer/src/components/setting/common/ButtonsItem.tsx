import StaticIcon, { IconNames } from "@/icons/StaticIcon";

type Props = {
  label: string;
  description: string;
  iconName: IconNames;
};

export const ButtonsItem = ({ label, description, iconName }: Props) => {
  return (
    <div className="my-2 flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <StaticIcon iconName={iconName} size={17} />
          <div className="text-sm font-bold text-black">{label}</div>
        </div>
        <div className="whitespace-pre text-sm text-black/50">{description}</div>
      </div>

      <div></div>
    </div>
  );
};
