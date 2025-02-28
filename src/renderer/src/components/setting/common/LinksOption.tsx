import { ExternalLink } from "@/common";
import StaticIcon, { IconNames } from "@/icons/StaticIcon";

type Props = {
  label: string;
  iconName: IconNames;
  links?: {
    label: string;
    url: string;
  }[];
};

export const LinksOption = ({ label, iconName, links = [] }: Props) => {
  return (
    <div className="my-1 flex gap-2">
      <div className="flex items-center gap-2">
        <StaticIcon iconName={iconName} size={17} />
        <div className="text-sm font-bold text-black">{label}</div>
      </div>
      {links.map(({ label, url }) => {
        return (
          <ExternalLink key={url} href={url} className="text-sm">
            {label}
          </ExternalLink>
        );
      })}
    </div>
  );
};
