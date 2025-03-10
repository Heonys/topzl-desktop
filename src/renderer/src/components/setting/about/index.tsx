import { LinksOption } from "@/components/setting/common";
import { useAppConfig } from "@/hooks";

const About = () => {
  const { getGlobalContext } = useAppConfig();
  return (
    <div className="flex h-56 w-full flex-col gap-4 py-5 pt-4">
      <LinksOption
        label={`Application Version - ${getGlobalContext().appVersion}`}
        iconName="windows"
      />
      <LinksOption
        label="Author"
        iconName="user-check"
        links={[{ label: "Github/Heonys", url: "https://github.com/Heonys" }]}
      />
      <LinksOption
        label="Source code"
        iconName="github"
        links={[{ label: "Heonys/topzl-desktop", url: "https://github.com/Heonys/topzl-desktop" }]}
      />
      <LinksOption
        label="Plugin"
        iconName="plugin"
        links={[
          { label: "猫头猫/MusicFreePlugins", url: "https://gitee.com/maotoumao/MusicFreePlugins" },
        ]}
      />
    </div>
  );
};

export default About;
