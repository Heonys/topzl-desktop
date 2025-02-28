import { SwitchBoxItem } from "@/components/setting/common";
import { useAppConfig } from "@/hooks";
import ShortcutTable from "./ShortcutTable";

const Shortcut = () => {
  const {
    appConfig: { shortcut },
  } = useAppConfig();

  return (
    <div className="flex w-full flex-col gap-4 py-5 pt-4">
      {/* In-App Shortcut */}
      <SwitchBoxItem
        keyPath="shortcut.enableLocal"
        label="In-App 단축키 활성화"
        description="어플리케이션이 포커스된 상태에서만 동작하는 단축키입니다."
        iconName="hot-key"
        value={shortcut?.enableLocal}
      />

      {/* Global Shortcut */}
      <SwitchBoxItem
        keyPath="shortcut.enableGlobal"
        label="Global 단축키 활성화"
        description={`시스템 전체에서 동작하는 단축키입니다. 백그라운드에 있을때나 다른 어플리케이션을 사용중일때도 유효합니다. \n※ 다른 프로그램에서의 단축키와 충돌할 수 있습니다 설정을 변경할 때 주의해주세요`}
        iconName="global"
        value={shortcut?.enableGlobal}
      />
      <ShortcutTable
        enableLocal={shortcut?.enableLocal}
        enableGlobal={shortcut?.enableGlobal}
        keymaps={shortcut?.keymap}
      />
    </div>
  );
};

export default Shortcut;
