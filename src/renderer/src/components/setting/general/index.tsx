import { useState } from "react";
import DarkTheme from "@/assets/images/dark.png";
import LightTheme from "@/assets/images/light.png";
import { ImageRadioGroup, RadioGroupItem, SelectBoxItem } from "@/components/setting/common";

const General = () => {
  const [selectedTheme, setSelectedTheme] = useState<"light" | "dark">("light");
  const [selectedLang, setSelectedLang] = useState("Korean");
  const [selectedAction, setselectedAction] = useState<"exit" | "minimize">("exit");
  const [selectedPermition, setSelectedPermition] = useState<"granted" | "denied">("denied");
  const [selectedHistory, setSelectedHistory] = useState(7);

  return (
    <div className="flex w-full flex-col gap-4 py-5 pt-4">
      {/* Language */}
      <SelectBoxItem
        keyPath="general.language"
        label="언어 설정"
        description="어플리케이션의 기본 언어를 설정 합니다."
        iconName="language"
        options={["Korean", "English"]}
        value={selectedLang}
        width="200px"
        onChange={setSelectedLang}
      />

      {/* Theme */}
      <ImageRadioGroup
        keyPath="general.theme"
        label="테마 설정"
        description="어플리케이션의 테마를 선택합니다."
        iconName="sparkles"
        options={[
          { title: "light", image: LightTheme },
          { title: "dark", image: DarkTheme },
        ]}
        value={selectedTheme}
        onChange={setSelectedTheme}
      />

      {/* When close button */}
      <RadioGroupItem
        keyPath="general.closeBehavior"
        label="종료 버튼 클릭시"
        description="종료 버튼 클릭시 동작을 선택 합니다."
        iconName="box-close"
        value={selectedAction}
        onChange={setselectedAction}
        options={[
          { value: "exit", title: "어플리케이션 종료" },
          { value: "minimize", title: "트레이로 이동" },
        ]}
      />
      {/* Notification */}
      <RadioGroupItem
        keyPath="general.notification"
        label="데스크톱 알림 사용여부"
        description="어플리케이션에서 데스크톱 알림을 표시하도록 설정합니다."
        iconName="notification"
        value={selectedPermition}
        onChange={setSelectedPermition}
        options={[
          { value: "granted", title: "사용" },
          { value: "denied", title: "사용 안 함" },
        ]}
      />
      {/* Maximum search history */}
      <RadioGroupItem
        keyPath="general.maxHistoryLength"
        label="최대 검색 기록 항목"
        description="검색 기록에 대한 최대 항목 수를 지정하세요."
        iconName="history"
        value={selectedHistory}
        onChange={setSelectedHistory}
        options={[{ value: 7 }, { value: 10 }, { value: 15 }]}
      />
    </div>
  );
};
export default General;
