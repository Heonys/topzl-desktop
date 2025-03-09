import { SwitchOption } from "@/components/setting/common";
import { useAppConfig } from "@/hooks";
import ShortcutTable from "./ShortcutTable";
import { Blockquote } from "@/common";

const Shortcut = () => {
  const {
    appConfig: { shortcut },
  } = useAppConfig();

  return (
    <div className="flex w-full flex-col gap-4 py-5 pt-4">
      {/* In-App Shortcut */}
      <SwitchOption
        keyPath="shortcut.enableLocal"
        label="In-App 단축키 활성화"
        description="어플리케이션이 포커스된 상태에서만 동작하는 단축키입니다."
        iconName="hot-key"
        value={shortcut?.enableLocal}
      />

      {/* Global Shortcut */}
      <SwitchOption
        keyPath="shortcut.enableGlobal"
        label="Global 단축키 활성화"
        description={`시스템 전체에서 동작하는 단축키입니다. 백그라운드에 있을때나 다른 어플리케이션을 사용중일때도 유효합니다. \n※ 다른 프로그램에서의 단축키와 충돌할 수 있습니다 설정을 변경할 때 주의해주세요`}
        iconName="global"
        value={shortcut?.enableGlobal}
      />
      <Blockquote title="단축키 생성 규칙" collapsible>
        <ul className="list-disc space-y-1 px-4">
          <li>[Win, Command]는 특수키로 단축키 등록에서 제외됩니다.</li>
          <li>조합키는 [Ctrl, Alt, Option, Shift]이며, 이 외의 키는 일반키로 분류됩니다.</li>
          <li>키 입력 순서는 상관없으나, [조합키 + 일반키] 순서를 권장합니다.</li>
          <li>조합키는 여러 개 사용이 가능하지만, 일반키는 1개만 허용됩니다.</li>
          <li>Global 단축키는 충돌방지를 위해 반드시 2개 이상의 조합키를 포함해야 합니다.</li>
        </ul>
      </Blockquote>
      <ShortcutTable
        enableLocal={shortcut?.enableLocal}
        enableGlobal={shortcut?.enableGlobal}
        keymaps={shortcut?.keymap}
      />
    </div>
  );
};

export default Shortcut;
