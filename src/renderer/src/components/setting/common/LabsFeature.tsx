import { Condition, Kbd } from "@/common";
import StaticIcon, { IconNames } from "@/icons/StaticIcon";

type Props = {
  title: string;
  description: string;
  iconName: IconNames;
  kbd?: string[];
};

export function LabsFeature({ title, description, iconName, kbd = [] }: Props) {
  return (
    <div className="my-2 flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <StaticIcon iconName={iconName} size={17} />
          <div className="flex items-center gap-3 text-sm font-bold text-black">
            {title}
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
    </div>
  );
}
