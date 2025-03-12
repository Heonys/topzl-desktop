import { twMerge } from "tailwind-merge";
import { useLanguageFont } from "@/hooks";
import StaticIcon from "@/icons/StaticIcon";
import { Kbd } from "@/common";

export const LabsPage = () => {
  const { fontClass } = useLanguageFont();

  return (
    <section className={twMerge("font-bold", fontClass)}>
      <h1 className="text-2xl">실험적 기능</h1>
      <div className="flex h-[75vh] w-full flex-col gap-4 overflow-y-auto py-5 pt-4">
        <div className="my-2 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <StaticIcon iconName="screen" size={17} />
              <div className="flex items-center gap-2 text-sm font-bold text-black">
                <div>스크린샷 캡처</div>
                <Kbd>Ctrl + F12</Kbd>
              </div>
            </div>
            <div className="whitespace-pre text-sm text-black/50">
              현재 어플리케이션 화면을 캡처하여 다운로드 경로에 저장합니다.
            </div>
          </div>
        </div>

        <div className="my-2 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <StaticIcon iconName="copy" size={17} />
              <div className="flex items-center gap-2 text-sm font-bold text-black">
                현재 곡 정보 복사
                {/* <Kbd>Ctrl + F11</Kbd> */}
              </div>
            </div>
            <div className="whitespace-pre text-sm text-black/50">
              현재 재생중인 곡의 정보를 클립보드로 복사합니다.
            </div>
          </div>
        </div>

        <div className="my-2 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <StaticIcon iconName="video" size={17} />
              <div className="text-sm font-bold text-black">동영상 스트리밍</div>
            </div>
            <div className="whitespace-pre text-sm text-black/50">
              뮤직비디오를 검색하고 감상할 수 있도록 동영상 스트리밍을 지원합니다.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
