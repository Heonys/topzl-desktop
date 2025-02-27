import { useAppConfig } from "@/hooks";
import { RadioGroupItem } from "../common";

const Lyric = () => {
  const { appConfig } = useAppConfig();

  return (
    <div className="flex w-full flex-col gap-4 py-5 pt-4">
      {/* Enable Lyrics */}
      <RadioGroupItem
        keyPath="lyric.enable"
        label="가사 활성화 여부"
        description="Genius API 기반의 가사 검색이며, 항상 정확한 가사를 보장하지는 않습니다."
        iconName="lyric"
        value={appConfig.lyric?.enable}
        options={[
          { value: true, title: "활성화" },
          { value: false, title: "비활성화" },
        ]}
      />
      {/* Lyrics Search Method */}
      <RadioGroupItem
        keyPath="lyric.searchMethod"
        label="가사 검색 방식"
        description={`기본 검색: 일부 곡에서 원곡 언어가 아닌 번역된 표기로 제공될 수 있습니다. \n정밀 검색: 보다 정확한 가사를 제공할 가능성이 높지만, 기본검색보다 다소 느릴 수 있습니다.`}
        iconName="test"
        value={appConfig.lyric?.searchMethod}
        options={[
          { value: "basic", title: "기본 검색" },
          { value: "advanced", title: "정밀 검색" },
        ]}
      />
    </div>
  );
};

export default Lyric;
