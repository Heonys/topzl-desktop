import { Blockquote } from "@/common";
import { RadioGroupOption, SelectOption, SwitchOption } from "@/components/setting/common";
import { useAppConfig } from "@/hooks";

const General = () => {
  const { appConfig } = useAppConfig();

  return (
    <div className="flex w-full flex-col gap-4 py-5 pt-4">
      {/* Language */}
      <SelectOption
        keyPath="general.language"
        label="언어 설정"
        description="어플리케이션의 기본 언어를 설정 합니다."
        iconName="language"
        value={appConfig.general?.language}
        options={["Korean", "English"]}
        width="200px"
      />
      {/* Theme */}
      {/* <ImageRadioGroupOption
        keyPath="general.theme"
        label="테마 설정"
        description="어플리케이션의 테마를 선택합니다."
        iconName="sparkles"
        value={appConfig.general?.theme}
        options={[
          { title: "light", image: LightTheme },
          { title: "dark", image: DarkTheme },
        ]}
      /> */}
      {/* When close button */}
      <RadioGroupOption
        keyPath="general.closeBehavior"
        label="종료 버튼 클릭시"
        description="종료 버튼 클릭시 동작을 선택 합니다."
        iconName="box-close"
        value={appConfig.general?.closeBehavior}
        options={[
          { value: "exit", title: "어플리케이션 종료" },
          { value: "minimize", title: "트레이로 이동" },
        ]}
      />
      {/* Auto Start On Boot */}
      <SwitchOption
        keyPath="general.autoStartOnBoot"
        label="시작 시 자동 실행"
        description="시스템 시작 시 어플리케이션을 자동으로 실행할지 여부를 설정합니다."
        iconName="power"
        value={appConfig.general?.autoStartOnBoot}
      />
      {/* Notification */}
      <SwitchOption
        keyPath="general.notification"
        label="데스크탑 알림 사용"
        description="어플리케이션에서 데스크톱 알림을 표시하도록 설정합니다."
        iconName="notification"
        value={appConfig.general?.notification}
      />

      <Blockquote
        color="orange"
        disabled={!appConfig.general?.notification}
        onClick={() =>
          window.common.showNotification({ title: "테스트 제목", body: "테스트 메시지" })
        }
      >
        <div className="font-bold">데스크탑 알림 테스트</div>
      </Blockquote>

      {/* Maximum search history */}
      <RadioGroupOption
        keyPath="general.maxHistoryLength"
        label="최대 검색 기록 항목"
        description="검색 기록에 대한 최대 항목 수를 지정하세요."
        iconName="history"
        value={appConfig.general?.maxHistoryLength}
        options={[{ value: 7 }, { value: 10 }, { value: 15 }]}
      />
    </div>
  );
};
export default General;
