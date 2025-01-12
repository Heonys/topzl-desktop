import { Condition } from "@/common";
import { Backdrop, Header, Contents } from "./Layout";
import { useModal } from "./useModal";
import StaticIcon from "@/icons/StaticIcon";
import useLocal from "@/hooks/useLocal";

const ScanLocalMusic = () => {
  const { localDir, localSelectedDir, addDir, removeDir, check, uncheck } = useLocal();
  const { hideModal } = useModal();

  const addForder = async () => {
    const result = await window.common.showOpenDialog({
      title: "폴더 추가",
      properties: ["openDirectory"],
    });
    if (!result.canceled) {
      const selected = result.filePaths[0];
      if (!localDir.includes(selected)) {
        addDir(selected);
        check(selected);
      }
    }
  };

  return (
    <Backdrop>
      <div
        className="flex h-[50vh] w-[50vw] flex-col rounded-lg bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <Header>
          <div className="font-sans text-xl font-semibold">파일 자동스캔</div>
        </Header>
        <Contents>
          <div className="flex h-full flex-col gap-2 font-sans text-sm">
            <div className="flex gap-1 px-2">
              <div className="flex gap-2">
                <StaticIcon
                  iconName="forder-plus"
                  className="cursor-pointer"
                  size={20}
                  onClick={addForder}
                />
                <span className="cursor-pointer font-semibold" onClick={addForder}>
                  폴더 추가
                </span>
              </div>
              <div className="text-gray-500 ">
                {"(선택된 폴더의 파일 변경 사항과 실시간 동기화 됩니다.)"}
              </div>
            </div>

            <div className="mt-2 flex-1 rounded-lg border border-black/10">
              <Condition condition={localDir.length}>
                {localDir.map((dir) => {
                  const isChecked = localSelectedDir.includes(dir);
                  return (
                    <div key={dir} className="flex items-center gap-2 p-2">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          if (isChecked) uncheck(dir);
                          else check(dir);
                        }}
                      />
                      <div className="flex-1">{dir}</div>
                      <StaticIcon
                        className="cursor-pointer"
                        iconName="x-mark"
                        size={16}
                        onClick={() => removeDir(dir)}
                      />
                    </div>
                  );
                })}
              </Condition>
            </div>

            <div className="flex justify-end">
              <button
                className="rounded-lg bg-[#E0E0E0] p-2 px-4 font-sans text-sm font-semibold"
                onClick={hideModal}
              >
                확인
              </button>
            </div>
          </div>
        </Contents>
      </div>
    </Backdrop>
  );
};

export default ScanLocalMusic;
